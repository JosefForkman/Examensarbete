import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals: { supabase } }) => {
	const { data: orders } = await supabase
		.from('Orders')
		.select(
			'id, street, house_number, apartment_number, user_id, order_date, delivery_date, Order_items (id, product_id, quantity, Products (*))'
		).match({id: params.slug});

	if (orders?.length !== 0) {
		return { orders };
	}
	throw error(404, 'Order no found');
};
