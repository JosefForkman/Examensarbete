export const load = async ({ locals: { supabase } }) => {
	const { data: Products, error } = await supabase.from('Products').select('*');

	console.log(error);
	

	return { Products };
};