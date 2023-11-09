import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import { stripe } from '$lib/server/stripe.js';

const formSchema = z.object({
	name: z.string().nullish(),
	phone: z.coerce.string().nullish(),
	city: z.string().nullish(),
	line1: z.string().nullish(),
	line2: z.string().nullish(),
	postal_code: z.string().nullish()
});

export const load = async ({ locals: { supabase } }) => {
	const { data: profiles, error } = await supabase.from('Profiles').select('*');

	if (!profiles) {
		return;
	}
	const customer = await stripe.customers.retrieve(profiles[0].stripe_customer_id);

	//@ts-ignore
	if (customer.address !== null) {
		const profileSchema = z.object({
			name: z.string().nullish(),
			phone: z.coerce.string().nullish(),
			address: z.object({
				city: z.string().nullish(),
				line1: z.string().nullish(),
				line2: z.string().nullish(),
				postal_code: z.string().nullish()
			})
		});

		const parsedCustomer = profileSchema.parse(customer);

		const formCustomer = {
			name: parsedCustomer.name,
			phone: parsedCustomer.phone,
			city: parsedCustomer.address.city,
			line1: parsedCustomer.address.line1,
			line2: parsedCustomer.address.line2,
			postal_code: parsedCustomer.address.postal_code
		};

		const form = await superValidate(formCustomer, formSchema);

		return { formCustomer, form };
	} else {
		const parsedCustomer = formSchema.parse(customer);
		console.log(parsedCustomer);

		const form = await superValidate(parsedCustomer, formSchema);

		return { parsedCustomer, form };
	}
};

function updateUser(customer: any, formData: any, customerId: any) {
	const stripeDataSchema = z.object({
		name: z.coerce.string().optional(),
		phone: z.coerce.string().optional(),
		city: z.coerce.string().optional(),
		line1: z.coerce.string().optional(),
		line2: z.coerce.string().optional(),
		postal_code: z.coerce.string().optional()
	});
	const newUserData = formData;
	const parsedUserData = stripeDataSchema.parse(newUserData);

	return stripe.customers.update(customerId, {
		name: parsedUserData.name,
		phone: parsedUserData.phone,
		address: {
			city: parsedUserData.city,
			line1: parsedUserData.line1,
			line2: parsedUserData.line2,
			postal_code: parsedUserData.postal_code
		}
	});
}

export const actions = {
	default: async ({ request, locals: { supabase } }) => {
		const { data: profiles, error } = await supabase.from('Profiles').select('*');

		if (!profiles) {
			return;
		}
		const customer = await stripe.customers.retrieve(profiles[0].stripe_customer_id);
		const form = await superValidate(request, formSchema);
		const { data: profile, error: profileError } = await supabase.from('Profiles').select('*');
		if (profileError) {
			return fail(400, { form, profileError });
		}

		if (!form.valid) {
			return fail(400, { form });
		}

		const updatedCustomer = updateUser(customer, form.data, profile[0].stripe_customer_id);

		throw redirect(303, '/protected-routes/settings');
	}
};
