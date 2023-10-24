<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { fail } from '@sveltejs/kit';
	import type { StripeElements } from '@stripe/stripe-js';

	export let data: PageData;
	const { stripeClient, client_secret } = data;

	let errorMessage: string | undefined;
	let elements: StripeElements;

	onMount(async () => {
		if (!stripeClient || !client_secret) {
			return;
		}

		elements = stripeClient.elements({
			clientSecret: client_secret,
			appearance: {
				theme: 'stripe',
				variables: {
					colorPrimary: 'hsl(274, 70%, 48%)',
					colorBackground: '#F8F2FD',
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
						border: '3px solid hsl(274, 70%, 48%)',
						boxShadow: 'none'
					},
					'.Input:hover': {
						boxShadow: 'none',
						border: '3px solid hsl(274, 70%, 48%)'
					},
					'.Input:focus': {
						boxShadow: 'none',
						border: '3px solid hsla(274, 70%, 48%, .50)'
					},
					'.Input--invalid': {
						boxShadow: 'none',
						border: '3px solid hsla(274, 70%, 48%)'
					}
				}
			}
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

	/* Handel submitt */
	const handelSubmit = async (
		e: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }
	) => {
		e.preventDefault();

		if (!stripeClient || !elements) {
			errorMessage = 'Stripe or element is not loaded';
			return;
		}

		const { error } = await stripeClient.confirmPayment({
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

		<input type="hidden" name="Element" value={JSON.stringify(elements)} />
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
