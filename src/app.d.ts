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

import { SupabaseClient, Session } from '@supabase/supabase-js'
import { Database } from './supabase'

declare global {
  namespace App {
    interface Locals {
      supabase: SupabaseClient<Database>
      getSession(): Promise<Session | null>
    }
    interface PageData {
      session: Session | null
    }
    // interface Error {}
    // interface Platform {}
  }
}
export {};
declare module '@fortawesome/free-solid-svg-icons/index.es' {
	export * from '@fortawesome/free-solid-svg-icons';
}
