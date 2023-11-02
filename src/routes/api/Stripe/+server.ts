import { stripe } from '$lib/server/stripe';
import { error, fail, json, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const data: { productsId: string; quantity: number }[] = await request.json();

	let price = 0;

	const { data: stripeProducts } = await stripe.prices.list();
    
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        
        const stripeProduct = stripeProducts.find(
            (stripeProduct) => stripeProduct.id === element.productsId
        );
		
		if (!stripeProduct || !stripeProduct.unit_amount) {
			throw error(404, "Produkten finns inte")
		}

        price += stripeProduct.unit_amount * element.quantity
    }
	
	if (price == 0) {
		throw error(400, "Priset får inte vara 0")
	}

	const { client_secret } = await stripe.paymentIntents.create({
		amount: price,
		currency: 'sek',
		// payment_method_types: ['card'],
		automatic_payment_methods: { enabled: true },
		metadata: {
			integration_check: 'accept_a_payment'
		}
	});

	// return new Response()

	return json({ client_secret }, { status: 201 });
};
