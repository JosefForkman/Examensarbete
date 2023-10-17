<script lang="ts">
	import { onMount } from 'svelte';
    import { Card, Elements } from "svelte-stripe";
	import type { PageData } from './$types';
	import { PUBLIC_STRIPE_KEY } from '$env/static/public';
	import { stripe } from '$lib/server/stripe';

	export let data: PageData;

	onMount(() => {
		const appearance = {
			theme: 'night',
			variables: {
				colorPrimary: '#0570de',
				colorBackground: '#ffffff',
				colorText: '#30313d',
				colorDanger: '#df1b41',
				fontFamily: 'Ideal Sans, system-ui, sans-serif',
				spacingUnit: '2px',
				borderRadius: '4px'
				// See all possible variables below
			}
		};

		const stripe = Stripe<typeof stripe>(PUBLIC_STRIPE_KEY);
		const elements = stripe.elements({clientSecret: data.client_secret, appearance});

		const style = {
			base: {
				color: '#32325d'
			}
		};
        

		const card = elements.create('payment');
		// card.mount('#card-element');
	});
</script>

<h1>Stripe Elements</h1>

<form id="payment-form">
	<div id="card-element">
		<!-- Elements will create input elements here -->
	</div>
    <Elements clientSecret={data.client_secret ?? undefined, stripe} > 
        <Card />
    </Elements>
	<!-- We'll put the error messages in this element -->
	<div id="card-errors" role="alert" />

	<button id="submit">Submit Payment</button>
</form>
