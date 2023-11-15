import { stripe } from '$lib/server/stripe';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { z } from 'zod';

const respond = z.array(
	z.object({
		id: z.number().min(1),
		productsId: z
			.string()
			.min(30, 'Produkt id för kort')
			.regex(new RegExp('price_[A-Za-z0-9]{8,30}$'), 'Formateringen av produkt id är fel'),
		quantity: z.number().min(1)
	})
);

export const POST: RequestHandler = async ({ request, locals: { supabase, getSession } }) => {
	const body = respond.safeParse(await request.json());
	const session = await getSession();

	/* Check for errors */
	if (!session) {
		return json({ message: 'Inte inloggad' }, { status: 401 });
	}

	if (!body.success) {
		return json(
			{
				message: 'Saknar värden i body',
				error: body.error.issues.map((val) => {
					return {
						message: val.message,
						object: val.path[1],
						objectIndex: val.path[0]
					};
				})
			},
			{ status: 400 }
		);
	}

	const { data: ProfileData } = await supabase
		.from('Profiles')
		.select('stripe_customer_id')
		.single();

	if (!ProfileData) {
		return json({ message: 'kunde inte hitta profile kund' }, { status: 500 });
	}

	/* Make paymentIntents to frontend */
	const { client_secret, id } = await stripe.paymentIntents.create({
		amount: await calculateOrderAmount(body.data),
		currency: 'sek',
		// payment_method_types: ['card'],
		automatic_payment_methods: { enabled: true },
		customer: ProfileData.stripe_customer_id,
		setup_future_usage: 'on_session',
		metadata: {
			integration_check: 'accept_a_payment'
		}
	});

	if (!client_secret) {
		return json({ message: 'kunde inte hitta stripe kund' }, { status: 500 });
	}

	/* Add order to orders tabell */
	const { error: OrdersError, data: orderData } = await supabase
		.from('Orders')
		.insert({
			stripe_customer_id: ProfileData.stripe_customer_id,
			stripe_payment_intent_id: id,
			user_id: session.user.id
		})
		.select('id')
		.single();

	if (!orderData) {
		return json({ message: 'Kunde inte skapa order' }, { status: 500 });
	}

	/* Add order to order items tabell */
	const { error } = await supabase.from('Order_items').insert(
		body.data.map((val) => {
			return {
				product_id: val.id,
				quantity: val.quantity,
				order_id: orderData.id
			};
		})
	);
	if (error) {
		return json({ message: 'kunde inte skapa data' }, { status: 500 });
	}

	return json({ client_secret }, { status: 201 });
};

async function calculateOrderAmount(body: z.infer<typeof respond>) {
	const { data: stripeProducts } = await stripe.prices.list();

	/* Get total cost */
	return body.reduce((previousValue, currentValue) => {
		const stripeProduct = stripeProducts.find(
			(stripeProduct) => stripeProduct.id === currentValue.productsId
		);

		/* Check for errors */
		if (!stripeProduct || !stripeProduct.unit_amount) {
			throw json({ message: 'Produkten finns inte' }, { status: 404 });
		}

		return (previousValue += stripeProduct.unit_amount * currentValue.quantity);
	}, 0);
}
