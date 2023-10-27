import type { PageServerLoad } from './$types';

export const load = async ({ locals: { supabase } }) => {
	const { data: Products, error } = await supabase.from('Products').select('*');

	return { Products };
};
