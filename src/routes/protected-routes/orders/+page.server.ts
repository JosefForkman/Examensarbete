import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const { data: profiles, error: profilesError } = await supabase
		.from('Profiles')
		.select('*')
		.single();

	if (profilesError) {
		console.log(profilesError);
	}

	if (!profiles) {
		return;
	}

	const { data: orders, error: ordersError } = await supabase
		.from('Orders')
		.select(
			'id, order_date, delivery_date, stripe_payment_intent_id,stripe_customer_id, Order_items (id, product_id, quantity, Products (*))'
		)
		.eq('stripe_customer_id', profiles.stripe_customer_id);

	if (ordersError) {
		console.log(ordersError);
	}

	if (orders?.length !== 0) {
		return { orders };
	}
};
