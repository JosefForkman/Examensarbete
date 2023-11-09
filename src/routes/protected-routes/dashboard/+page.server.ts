import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const { data: profiles, error } = await supabase.from('Profiles').select('*');

	if (!profiles) {
		return;
	}

	const { data: orders, error: ordersError } = await supabase
		.from('Orders')
		.select(
			'id, delivery_date, stripe_payment_intent_id,stripe_customer_id, Order_items (id, product_id, quantity, Products (*))'
		)
		.eq('stripe_customer_id', profiles[0].stripe_customer_id);
	if (ordersError) {
		console.log(ordersError);
	}

	if (orders?.length !== 0) {
		return { orders };
	}
};
