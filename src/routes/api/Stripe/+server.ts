import { stripe } from '$lib/server/stripe';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { z } from 'zod';

const respond = z.array(
	z.object({
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

	/* Make paymentIntents to frontend */
	const {
		client_secret,
		shipping,
		canceled_at,
		transfer_data,
		id: stripeId
	} = await stripe.paymentIntents.create({
		amount: await calculateOrderAmount(body.data),
		currency: 'sek',
		// payment_method_types: ['card'],
		automatic_payment_methods: { enabled: true },
		metadata: {
			integration_check: 'accept_a_payment'
		}
	});

	const { error } = await supabase.from('Orders').insert({
		apartment_number: shipping?.address?.line2 as number | null | undefined,
		house_number: shipping?.address?.line1,
		street: shipping?.address?.postal_code,
		order_date: canceled_at,
		delivery_date: transfer_data,
		stripe_payment_intent_id: stripeId,
		user_id: session.user.id
	});
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
