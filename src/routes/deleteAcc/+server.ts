import { error, redirect, type RequestHandler } from '@sveltejs/kit';
import { z } from 'zod';

export const POST: RequestHandler = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();
	const userId = session?.user.id;
	const userIdSchema = z.string();
	const parsedUserId = userIdSchema.parse(userId);

	const { data: orders, error: ordersError } = await supabase
		.from('Orders')
		.select('*')
		.eq('user_id', parsedUserId);

	if (ordersError) {
		throw error(500, 'fucked orderIds');
	}

	orders.forEach(async (order) => {
		const { error: orderError } = await supabase
			.from('Order_items')
			.delete()
			.eq('order_id', order.id);
		if (orderError) {
			throw error(500, 'fucked order items');
		}
	});

	const { error: ordersDeleteError } = await supabase
		.from('Orders')
		.delete()
		.eq('user_id', parsedUserId);

	if (ordersDeleteError) {
		console.log(ordersDeleteError);
		throw error(500, 'fucked delete orders');
	}

	const { error: profileDeletError } = await supabase
		.from('Profiles')
		.delete()
		.eq('id', parsedUserId);
	if (profileDeletError) {
		throw error(500, 'fucked delete profile');
	}

	const { error: signOutError } = await supabase.auth.signOut();

	if (signOutError) {
		throw error(500, 'Något hände när du loggade ut');
	}

	const { data: userDeleteData, error: userDeleteError } = await supabase.auth.admin.deleteUser(
		parsedUserId
	);
	if (userDeleteError) {
		console.log(userDeleteError);
		throw error(500, 'fucked user delete');
	}
	throw redirect(303, '/');
};
