import { stripe } from '$lib/server/stripe';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	// const { client_secret } = await stripe.paymentIntents.create({
	// 	amount: 1099,
	// 	currency: 'sek',
	// 	payment_method_types: ['card'],
	// 	// automatic_payment_methods: {enabled: true},
	// 	metadata: {
	// 		integration_check: 'accept_a_payment'
	// 	}
	// });

	// return { client_secret };
}) satisfies PageServerLoad;
