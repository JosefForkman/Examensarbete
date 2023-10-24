// See https://kit.svelte.dev/docs/types#app

import type { Stripe } from "@stripe/stripe-js";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			stripeClient: Stripe | null
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
