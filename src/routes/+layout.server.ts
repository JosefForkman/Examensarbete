// src/routes/+layout.server.ts
export const load = async ({ locals: { getSession } }) => {
	return {
		session: await getSession()
	};
};

// export const actions = {
// 	default: async ({ locals: { supabase } }) => {
// 		const { error } = await supabase.auth.signOut();

// 		if (error) {
// 			throw fail(400)
// 		}
// 	}
// } satisfies Actions;

