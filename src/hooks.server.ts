import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import { type Handle, redirect, error } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/deleteAcc')) {
		// this is real scary stuff. the Service role lets us ignore ALL OF SUPABASE'S RLS
		event.locals.supabase = createSupabaseServerClient({
			supabaseUrl: PUBLIC_SUPABASE_URL,
			supabaseKey: SUPABASE_SERVICE_ROLE_KEY,
			event
		});
	} else {
		event.locals.supabase = createSupabaseServerClient({
			supabaseUrl: PUBLIC_SUPABASE_URL,
			supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
			event
		});
	}

	event.locals.getSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();
		return session;
	};

	// protect requests to all routes that start with /protected-routes
	if (event.url.pathname.startsWith('/protected-routes')) {
		const session = await event.locals.getSession();
		if (!session) {
			// the user is not signed in
			throw redirect(303, '/login&signUp');
		}
	}

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		}
	});
};
