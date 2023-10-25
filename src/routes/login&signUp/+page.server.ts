import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { getSession } }) => {
	const Session = await getSession();
	if (Session) {
		throw redirect(303, '/protected-routes/dashboard');
	}
};
