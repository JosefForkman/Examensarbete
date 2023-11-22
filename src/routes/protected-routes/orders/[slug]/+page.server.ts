import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { stripe } from '$lib/server/stripe';

export const load: PageServerLoad = async ({ params, locals: { supabase } }) => {
	const { data: orders } = await supabase
		.from('Orders')
		.select(
			'id, order_date, delivery_date, stripe_payment_intent_id,stripe_customer_id, Order_items (id, product_id, quantity, Products (*))'
		)
		.match({ id: params.slug });

	const { data: profiles } = await supabase.from('Profiles').select('stripe_customer_id').single();

	if (!profiles) {
		return;
	}
	if (!orders) {
		return;
	}

	const stripe_payment_intent = await stripe.paymentIntents.retrieve(
		orders[0].stripe_payment_intent_id
	);
	const address = stripe_payment_intent.shipping?.address;
	console.log(address);
	if (orders?.length !== 0) {
		if (orders[0].stripe_customer_id != profiles.stripe_customer_id) {
			throw error(403, 'forbiden');
		}

		return { orders, address };
	}

	throw error(404, 'Order no found');
};
