import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';
import { stripe } from '$lib/server/stripe';
import { produkts } from '$lib/types/Schema';



export const POST: RequestHandler = async ({ request, locals: { supabase, getSession } }) => {
	const session = await getSession()
	if (!session) {
		throw error(401)
	}
	
	const req = produkts.safeParse(await request.json());

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
