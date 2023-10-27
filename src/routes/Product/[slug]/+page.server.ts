import { error } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ params, locals: { supabase } }) => {
	//@ts-ignore
	const { data: Product } = await supabase.from('Products').select('*').eq('name', params.slug);
	console.log(Product);

	if (Product?.length !== 0) {
		return { Product };
	}
  throw error(404, 'Product not found')
};
