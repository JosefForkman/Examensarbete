import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase, getSession } }) => {
	const { data: orders } = await supabase
		.from('Orders')
		.select(
			'id, street, house_number, apartment_number, user_id, Order_items (id, product_id, quantity, Products (*))'
		);

	const session = await getSession();
	let userId = session?.user.id as string;

	const { data: profiles } = await supabase.from('Profiles').select('*');
	if (profiles?.length !== 0) {
		const { error } = await supabase.from('Profiles').insert({ id: userId });
	}

	if (orders?.length !== 0) {
		return { orders };
	}
};
