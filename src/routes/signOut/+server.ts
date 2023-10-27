import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals: {supabase} }) => {
	const { error: err } = await supabase.auth.signOut()

	if (err) {
		throw error(500, 'Något hände när du loggade ut');
	}

	throw redirect(303, '/');
};
