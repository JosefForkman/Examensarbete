<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { PUBLIC_STRIPE_KEY } from '$env/static/public';

	export let data: PageData;

	let element;

	onMount(() => {
		const appearance = {
			theme: 'stripe',
			variables: {
				colorPrimary: '#0570de',
				colorBackground: '#ffffff',
				colorText: '#30313d',
				colorDanger: '#df1b41',
				fontFamily: 'Roboto, sans-serif',
				spacingUnit: '4px',
				borderRadius: '4px',
				// spacingGridRow: "48px",
				// spacingGridColumn: "48px",
				gridRowSpacing: '16px',
				colorLogo: 'light'
				// See all possible variables below
			},
			rules: {
				'.Input': {
					border: '3px solid hsl(0, 0%, 55%)',
					boxShadow: 'none'
				},
				'.Input:hover': {
					boxShadow: 'none',
					border: '3px solid hsl(0, 0%, 35%)'
				},
				'.Input:focus': {
					boxShadow: 'none',
					border: '3px solid hsl(0, 0%, 35%)'
				},
				'.Input--invalid': {
					boxShadow: 'none',
					border: '3px solid yellow'
				}
			}
		};

		const style = {
			base: {
				color: '#32325d'
			}
		};
		const stripe = Stripe(PUBLIC_STRIPE_KEY);
		const elements = stripe.elements({
			clientSecret: data.client_secret,
			appearance
		});

		const linkAuthElement = elements.create('linkAuthentication');
		const addressElement = elements.create('address', { mode: 'shipping' });
		const card = elements.create('payment', {
			layout: {
				type: 'tabs',
				defaultCollapsed: false
			}
		});

		linkAuthElement.mount('#link-auth-element');
		addressElement.mount('#address-element');
		card.mount('#card-element');
	});
</script>

<main>
	<h1>Stripe Elements</h1>

	<form id="payment-form" method="post">
		<div id="address-element">
			<!-- Elements will create input elements here -->
		</div>
		<div id="card-element">
			<!-- Elements will create input elements here -->
		</div>
		<div id="link-auth-element">
			<!-- Elements will create input elements here -->
		</div>
		<!-- We'll put the error messages in this element -->
		<div id="card-errors" role="alert" />

		<button id="submit">Submit Payment</button>
	</form>
</main>

<style>
	main {
		margin-inline: 2rem;
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		max-width: 600px;
		margin-inline: auto;
	}

	form button {
		align-self: flex-start;
		font-family: Roboto;
		font-size: 1.25rem;
		color: #fff;
		background-color: hsl(274, 71%, 20%);
		padding: 0.87em 3em;
		border-radius: 100vw;
		border: transparent;
	}
</style>
