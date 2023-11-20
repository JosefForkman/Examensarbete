import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const { data: profiles, error } = await supabase
		.from('Profiles')
		.select('stripe_customer_id')
		.single();

	if (!profiles) {
		return;
	}

	const { data: orders, error: ordersError } = await supabase
		.from('Orders')
		.select('id, Order_items (id, quantity, Products (*))')
		.eq('stripe_customer_id', profiles.stripe_customer_id);

	if (ordersError) {
		console.log(ordersError);
	}

	if (orders?.length !== 0) {
		return { orders };
	}
};
