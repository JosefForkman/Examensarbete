import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
import type { Database } from '../supabase';
import { loadStripe } from '@stripe/stripe-js';
import type { LayoutLoad } from './$types';
import { PUBLIC_STRIPE_KEY } from '$env/static/public';

export const load = async ({ fetch, data, depends }) => {
	depends('supabase:auth');

	const supabase = createSupabaseLoadClient<Database>({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event: { fetch },
		//@ts-ignore
		serverSession: data.session
	});

	const {
		data: { session }
	} = await supabase.auth.getSession();
	const stripeClient = await loadStripe(PUBLIC_STRIPE_KEY, { apiVersion: '2023-08-16' });

	return { supabase, session, stripeClient };
};
