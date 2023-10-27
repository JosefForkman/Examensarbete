import { stripe } from '$lib/server/stripe';
import { redirect } from '@sveltejs/kit';


export const actions = {
	default: async ({ url }) => {
		const session = await stripe.checkout.sessions.create({
			line_items: [
				{
					price_data: {
						currency: 'sek',
						product_data: {
							name: 'Choklad'
						},
						unit_amount: 2000
					},
					quantity: 2,
				}
			],
			mode: 'payment',
			success_url: new URL('/checkout/success', url.origin).toString(),
			cancel_url: new URL('/checkout/cancel', url.origin).toString()
		});

		if (session.url) {			
			throw redirect(303, session.url)
		}
		
	}
};
