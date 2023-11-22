import { error, redirect, type RequestHandler } from '@sveltejs/kit';
import { z } from 'zod';
import { stripe } from '$lib/server/stripe.js';

export const POST: RequestHandler = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();
	const userId = session?.user.id;
	const userIdSchema = z.string();
	const parsedUserId = userIdSchema.parse(userId);

	const { data: profile, error: profileError } = await supabase
		.from('Profiles')
		.select('*')
		.eq('id', parsedUserId);

	if (profileError) {
		throw error(500, 'There was an error removing your account');
	}

	console.log(profile);

	const { data: orders, error: ordersError } = await supabase
		.from('Orders')
		.select('*')
		.eq('stripe_customer_id', profile[0].stripe_customer_id);

	if (ordersError) {
		throw error(500, 'There was an error removing your account');
	}
	console.log(orders);

	const { error: ordersDeleteError } = await supabase
		.from('Orders')
		.delete()
		.eq('stripe_customer_id', profile[0].stripe_customer_id);

	if (ordersDeleteError) {
		console.log(ordersDeleteError);
		throw error(500, 'There was an error removing your account');
	}

	const { error: profileDeletError } = await supabase
		.from('Profiles')
		.delete()
		.eq('id', parsedUserId);
	if (profileDeletError) {
		throw error(500, 'There was an error removing your account');
	}

	const { error: signOutError } = await supabase.auth.signOut();

	if (signOutError) {
		throw error(500, 'There was an error removing your account');
	}

	const { data: userDeleteData, error: userDeleteError } = await supabase.auth.admin.deleteUser(
		parsedUserId
	);
	if (userDeleteError) {
		console.log(userDeleteError);
		throw error(500, 'There was an error removing your account');
	}

	const deletedUser = await stripe.customers.del(profile[0].stripe_customer_id);

	throw redirect(303, '/');
};
