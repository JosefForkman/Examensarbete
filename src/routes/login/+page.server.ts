import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { AuthApiError } from '@supabase/supabase-js';

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8)
});

export const load = async () => {
	const loginForm = await superValidate(loginSchema);

	return { loginForm };
};

export const actions = {
	default: async ({ request, locals: { supabase } }) => {
		const form = await superValidate(request, loginSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		const {
			data: { email, password }
		} = form;

		const { error } = await supabase.auth.signInWithPassword({
			email,
			password
		});

		if (error) {
			if (error instanceof AuthApiError && error.status === 400) {
				return (
					fail(400, {
						error: 'Invalid credentials.',
						values: {
							email
						}
					}),
					{ form }
				);
			}
			return (
				fail(500, {
					error: 'Server error. Try again later.',
					values: {
						email
					}
				}),
				{ form }
			);
		}
		throw redirect(303, '/dashboard');
	}
};
