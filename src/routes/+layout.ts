import { loadStripe } from '@stripe/stripe-js';
import type { LayoutLoad } from './$types';
import { PUBLIC_STRIPE_KEY } from '$env/static/public';

export const load = (async () => {
	const stripeClient = await loadStripe(PUBLIC_STRIPE_KEY, { apiVersion: '2023-08-16' });
	return { stripeClient };
}) satisfies LayoutLoad;
