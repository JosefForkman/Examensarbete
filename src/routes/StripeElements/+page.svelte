<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { PUBLIC_STRIPE_KEY } from '$env/static/public';
	import { loadStripe, type Appearance, type Stripe, type StripeElements } from '@stripe/stripe-js';
	import { fail } from '@sveltejs/kit';

	export let data: PageData;
	const { client_secret } = data;

	let elements: StripeElements | undefined;
	let stripe: Stripe | null;
	let errorMessage: string | undefined;

	onMount(async () => {
		/* todo: move "loadStripe" to a place where it is run on every page lode   */
		stripe = await loadStripe(PUBLIC_STRIPE_KEY, { apiVersion: '2023-08-16' });
		const appearance: Appearance = {
			theme: 'stripe',
			variables: {
				colorPrimary: '#0570de',
				colorBackground: '#ffffff',
				colorText: '#30313d',
				colorDanger: '#df1b41',
				fontFamily: 'Roboto, sans-serif',
				spacingUnit: '4px',
				borderRadius: '4px',
				colorLogo: 'light',
				spacingGridRow: '16px'
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
		if (!stripe || !client_secret) {
			throw fail(500);
		}

		elements = stripe.elements({
			clientSecret: client_secret,
			appearance
		});
		const linkAuthElement = elements.create('linkAuthentication');
		const addressElement = elements.create('address', { mode: 'shipping' });
		const card = elements.create('payment', {
			layout: {
				type: 'accordion',
				defaultCollapsed: false
			}
		});

		linkAuthElement.mount('#link-auth-element');
		addressElement.mount('#address-element');
		card.mount('#card-element');
	});

	/* Handel submitt */
	const handelSubmit = async (
		e: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }
	) => {
		e.preventDefault();

		if (!stripe || !elements) {
			errorMessage = 'Stripe or element is not loaded';
			return;
		}

		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				// Make sure to change this to your payment completion page
				return_url: new URL('/checkout/success', window.location.origin).toString()
			}
		});

		if (error.type === 'card_error' || error.type === 'validation_error') {
			errorMessage = error.message;
		} else {
			errorMessage = 'An unexpected error occurred.';
		}
	};
</script>

<main>
	<h1>Stripe Elements</h1>

	<form id="payment-form" on:submit={handelSubmit}>
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
		{#if errorMessage}
			<div id="card-errors" role="alert">{errorMessage}</div>
		{/if}
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
