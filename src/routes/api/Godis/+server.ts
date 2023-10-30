import { z } from 'zod';
import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';
import { stripe } from '$lib/server/stripe';

const shema = z.array(
	z.object({
		name: z.string(),
		price: z.number(),
		description: z.string().nullable(),
		img_url: z.string().url().nullable()
	})
);

export const POST: RequestHandler = async ({ request, locals: { supabase, getSession } }) => {
	const session = await getSession()
	if (!session) {
		throw error(401)
	}
	
	const req = shema.safeParse(await request.json());

	if (!req.success) {
		throw error(400, "body matchar inte");
	}
	
	
	req.data.forEach(async (value) => {
		const { name, price } = value;

		const { id } = await stripe.prices.create({
			product_data: { name },
			currency: 'sek',
			unit_amount: Number.parseInt((price * 100).toFixed(0)), // Parse the price to stripe
		});

		const { error: productsError } = await supabase
			.from('Products')
			.insert({ ...value, stripe_price_id: id });

		if (productsError) {
			throw error(400, productsError);
		}
	});

	return new Response(null, {status: 201});
};
