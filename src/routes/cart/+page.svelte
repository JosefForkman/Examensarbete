<script lang="ts">
	//@ts-ignore
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { z } from 'zod';
	export let data: PageData;

	const itemSchema = z.strictObject({
		id: z.number(),
		name: z.string(),
		price: z.number(),
		img_url: z.string().nullable(),
		description: z.string().nullish(),
		stripe_price_id: z.coerce.number(),
		quantity: z.number()
	});
	const itemArraySchema = z.array(itemSchema);
	type itemArray = z.infer<typeof itemArraySchema>;
	let loadedCart: itemArray;
	onMount(() => {
		const cartData = localStorage.getItem('cart');
		if (cartData) {
			loadedCart = itemArraySchema.parse(JSON.parse(cartData));
		}
	});
</script>

<main>
	<h1>Cart</h1>
	<div class="cartContainer">
		{#if loadedCart}
			<ul>
				{#each loadedCart as cartItem}
					<li>
						<div class="wrapper">
							<img src={cartItem.img_url} alt="" />
							<div class="textContainer">
								<p class="bold">{cartItem.name}</p>
								<p>{cartItem.price}</p>
							</div>
						</div>
						<div class="buttonContainer">
							<input
								type="number"
								name="quantity"
								min="0"
								max="100"
								step="1"
								value={cartItem.quantity}
							/><button />
						</div>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</main>

<style>
	main {
		width: -webkit-fill-available;
		min-height: 99vh;
		margin-inline: 18px;
		display: flex;
		flex-direction: column;
	}
	img {
		width: 80px;
		height: 80px;
	}
	li {
		width: -webkit-fill-available;
		display: flex;
		justify-content: space-between;
		border-bottom: solid 2px black;
		padding-bottom: 8px;
	}
	button {
		width: 55px;
		height: 55px;
		background-color: azure;
	}
	.buttonContainer {
		display: flex;
		gap: 18px;
		align-items: center;
	}
	input {
		width: 46px;
		height: 28px;
	}
	.textContainer {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.bold {
		font-weight: bold;
		margin-top: 8px;
	}
	.wrapper {
		display: flex;
		gap: 8px;
	}
</style>
