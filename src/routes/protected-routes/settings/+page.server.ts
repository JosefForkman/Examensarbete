import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import { stripe } from '$lib/server/stripe.js';
import { addressSchema } from '$lib/types/Schema.js';

const formSchema = z.object({
	name: z.string().optional(),
	phone: z.string().optional(),
	address: addressSchema.nullable()
});

type formSchemaType = z.infer<typeof formSchema>;

export const load = async ({ locals: { supabase } }) => {
	const { data: profiles, error } = await supabase.from('Profiles').select('*').single();

	if (!profiles) {
		const form = await superValidate(formSchema);
		throw fail(400, );
	}
	const parsedCustomer = formSchema.safeParse(
		await stripe.customers.retrieve(profiles.stripe_customer_id)
	);

	if (!parsedCustomer.success) {
		const form = await superValidate(formSchema);
		throw fail(400, { form });
	}

	if (!parsedCustomer.data.address) {
		const formdata: formSchemaType = {
			...parsedCustomer.data,
			address: {
				city: undefined,
				line1: undefined,
				line2: undefined,
				postal_code: undefined
			}
		};
		const form = await superValidate(formdata, formSchema);

		return { form };
	}

	const form = await superValidate(parsedCustomer.data, formSchema);

	return { form };
};

function updateUser(formData: formSchemaType, customerId: string) {
	const parsedCustomer = formSchema.parse(formData);

	if (!parsedCustomer.address) {
		return stripe.customers.update(customerId, {
			...parsedCustomer,
			address: null
		});
	}
	return stripe.customers.update(customerId, {
		name: parsedCustomer.name,
		phone: parsedCustomer.phone,
		address: { ...parsedCustomer.address }
	});
}

export const actions = {
	default: async ({ request, locals: { supabase } }) => {
		const form = await superValidate(request, formSchema);
		if (!form.valid) {
			return fail(400, { form });
		}

		const { data: profile } = await supabase.from('Profiles').select('*').single();

		if (!profile) {
			return fail(400, form);
		}

		updateUser(form.data, profile.stripe_customer_id);

		throw redirect(303, '/protected-routes/settings');
	}
};
