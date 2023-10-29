import { date, z } from 'zod';
import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';
import { stripe } from '$lib/server/stripe';

const shema = z.object({
	name: z.string().nullable(),
	price: z.number().nullable(),
	description: z.string().nullable(),
	img_url: z.string().url()
});

export const POST: RequestHandler = async ({ request, locals: { supabase } }) => {
	const req = shema.safeParse(await request.json());

	if (!req.success) {
		throw error(404, 'shema  wow');
	}

	const { name, price } = req.data;

	if (!name || !price) {
		throw error(404, 'Något värde är tomt');
	}

	const { id } = await stripe.prices.create({
		product_data: { name },
		currency: 'sek',
		unit_amount: price * 100
	});

	const { error: productsError } = await supabase
		.from('Products')
		.insert({ ...req.data, stripe_price_id: id });

	if (productsError) {
		throw error(400, productsError.message);
	}

	return new Response();
};
