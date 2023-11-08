import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const { data: orders } = await supabase
		.from('Orders')
		.select(
			'id, street, house_number, apartment_number, user_id, order_date, delivery_date, Order_items (id, product_id, quantity, Products (*))'
		);

	if (orders?.length !== 0) {
		return { orders };
	}
};
