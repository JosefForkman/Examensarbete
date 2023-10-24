// src/routes/login/+page.server.ts
import { fail } from '@sveltejs/kit';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';

const loginSchema = z
	.object({
		email: z.string().email(),
		password: z.string().min(8),
		confirmPassword: z.string().min(8)
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords does not match'
	});

export const load = async () => {
	const loginForm = await superValidate(loginSchema);

	return {loginForm};
};

export const actions = {
	// @ts-ignore
	default: async ({ request, url, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		const { error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${url.origin}/auth/callback`
			}
		});

		if (error) {
			return fail(500, { message: 'Server error. Try again later.', success: false, email });
		}

		return {
			message: 'Please check your email for a magic link to log into the website.',
			success: true
		};
	}
};
