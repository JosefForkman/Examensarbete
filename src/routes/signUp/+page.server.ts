import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { stripe } from '$lib/server/stripe.js';

const signUpSchema = z
	.object({
		email: z.string().email(),
		password: z.string().min(8),
		confirmPassword: z.string().min(8)
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords does not match',
		path: ['confirmPassword']
	});

export const load = async ({ locals: { getSession } }) => {
	const signUpForm = await superValidate(signUpSchema);
	const Session = await getSession();
	if (Session) {
		throw redirect(303, '/protected-routes/dashboard');
	}

	const signUpForm = await superValidate(signUpSchema);

	return { signUpForm };
	return { signUpForm };
};

export const actions = {
	default: async ({ request, url, locals: { supabase } }) => {
		const form = await superValidate(request, signUpSchema);

		if (!form.valid) {
			console.log('form not valid');
			return fail(400, { form });
		}

		const {
			data: { email, password }
		} = form;

		const {
			error: signUpError,
			data: { user }
		} = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${url.origin}/auth/callback`
			}
		});

		if (signUpError || !user) {
			return fail(500, { message: 'Server error. Try again later.', success: false, email, form });
		}

		const { id } = await stripe.customers.create({ email });

		const { error: errorProfil } = await supabase
			.from('Profiles')
			.insert({ stripe_customer_id: id, id: user.id });

		console.log(errorProfil);
		if (errorProfil || !user) {
			return fail(500, { message: 'Server error. Try again later.', success: false, email, form });
		}
		return {
			message: 'Please check your email for a magic link to log into the website.',
			success: true,
			form
		};
	}
};
