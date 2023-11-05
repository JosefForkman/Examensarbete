import { stripe } from '$lib/server/stripe';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { z } from 'zod';

const respond = z.array(
	z.object({
		productsId: z
			.string()
			.min(30, 'Produkt id för kort')
			.regex(new RegExp('price_[A-Za-z0-9]{8,}$'), 'Formateringen av produkt id är fel'),
		quantity: z.number().min(1)
	})
);
export const POST: RequestHandler = async ({ request }) => {
	const body = respond.safeParse(request);

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

	const { client_secret } = await stripe.paymentIntents.create({
		amount: await calculateOrderAmount(body.data),
		currency: 'sek',
		// payment_method_types: ['card'],
		automatic_payment_methods: { enabled: true },
		metadata: {
			integration_check: 'accept_a_payment'
		}
	});

	return json({ client_secret }, { status: 201 });
};

async function calculateOrderAmount(body: z.infer<typeof respond>) {
	let price = 0;

	const { data: stripeProducts } = await stripe.prices.list();

	/* Get total cost */
	for (let i = 0; i < body.length; i++) {
		const element = body[i];

		const stripeProduct = stripeProducts.find(
			(stripeProduct) => stripeProduct.id === element.productsId
		);

		if (!stripeProduct || !stripeProduct.unit_amount) {
			throw json({ message: 'Produkten finns inte' }, { status: 404 });
		}

		price += stripeProduct.unit_amount * element.quantity;
	}
	return price;
}
