import { fail, json, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import { stripe } from '$lib/server/stripe.js';

/* Todo: move zode schema and types to lib folder */
const addressSchema = z.object({
	city: z.coerce.string().optional(),
	line1: z.coerce.string().optional(),
	line2: z.coerce.string().optional(),
	postal_code: z.string().optional()
});

type addressSchemaType = z.infer<typeof addressSchema>;

const profileSchema = z.object({
	name: z.string().optional(),
	phone: z.string().optional(),
	address: addressSchema.nullable()
});

type profileSchemaType = z.infer<typeof profileSchema>;


export const load = async ({ locals: { supabase } }) => {
	const formCustomer: profileSchemaType = {
		name: undefined,
		phone: undefined,
		address: {
			city: undefined,
			line1: undefined,
			line2: undefined,
			postal_code: undefined
		}
	};
	
	const address: addressSchemaType | null = {
		city: undefined,
		line1: undefined,
		line2: undefined,
		postal_code: undefined
	};
	const { data: profiles } = await supabase.from('Profiles').select('*').single();

	/* Check if profiles exist */
	if (!profiles) {
		const form = await superValidate(formCustomer, profileSchema);
		return { form };
	}

	/* Check if stripe customer is a valid object and format */
	const customer = profileSchema.safeParse(
		await stripe.customers.retrieve(profiles.stripe_customer_id)
	);

	if (!customer.success) {
		const form = await superValidate(formCustomer, profileSchema);
		return { form };
	}

	/* Add adress object if adress == null */
	if (!customer.data.address) {
		const form = await superValidate(
			{
				...customer.data,
				address
			},
			profileSchema
		);

		return { form };
	}

	const form = await superValidate(customer.data, profileSchema);
	return { form };
};

function updateUser(formData: profileSchemaType, customerId: string) {
	/* If adress is not enter make adress == null */
	if (formData.address) {
		const { city, line1, line2, postal_code } = formData.address;

		if (!city && !line1 && !line2 && !postal_code) {
			return stripe.customers.update(customerId, { ...formData, address: null });
		}
	}

	const parsedStripeCustomerData = profileSchema.parse(formData);
	return stripe.customers.update(customerId, parsedStripeCustomerData);
}

export const actions = {
	default: async ({ request, locals: { supabase } }) => {
		const form = await superValidate(request, profileSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		const { data: profile, error: profileError } = await supabase
			.from('Profiles')
			.select('stripe_customer_id')
			.single();

		if (!profile) {
			return json('Kunde inte hitta profile', { status: 404 });
		}

		if (profileError) {
			return fail(400, { form, profileError });
		}

		const customer = await stripe.customers.retrieve(profile.stripe_customer_id);
		updateUser(form.data, customer.id);

		throw redirect(303, '/protected-routes/settings');
	}
};
