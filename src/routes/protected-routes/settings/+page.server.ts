import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const profileSchema = z.object({
	id: z.string(),
	first_name: z.string().nullish(),
	last_name: z.string().nullish(),
	street: z.string().nullish(),
	house_number: z.number().nullish(),
	apartment_number: z.number().nullish()
});

export const load = async ({ locals: { supabase } }) => {
	const { data: profiles, error } = await supabase.from('Profiles').select('*');
	if (!profiles) {
		return;
	}
	const form = await superValidate(profiles[0], profileSchema);

	return { profiles, form };
};

export const actions = {
	default: async ({ request, locals: { supabase, getSession } }) => {
		const session = await getSession();
		const userId = session?.user.id;
		const form = await superValidate(request, profileSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		const newProfile = form.data;

		const { error } = await supabase
			.from('Profiles')
			.update({
				first_name: newProfile.first_name,
				last_name: newProfile.last_name,
				street: newProfile.street,
				house_number: newProfile.house_number,
				apartment_number: newProfile.apartment_number
			})
			.match({ id: userId });

		if (error) {
			return fail(500, { error: 'server error. tyr again later' }), { form };
		} else {
			throw redirect(303, '/protected-routes/settings');
		}
	}
};
