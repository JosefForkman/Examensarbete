import { error } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ params, locals: { supabase } }) => {
	const { data: Product } = await supabase
		.from('Products')
		.select('*')
		//@ts-ignore
		.eq('name', params.slug)
		.single();

	if (!Product) {
		throw error(404, 'Product not found');
	}
	return { Product };
};
