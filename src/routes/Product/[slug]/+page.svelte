<script lang="ts">
	import { z } from 'zod';
	import type { PageData } from './$types';

	export let data: PageData;

	const itemSchema = z.strictObject({
		id: z.number(),
		name: z.string(),
		price: z.number(),
		img_url: z.string().nullable(),
		description: z.string().nullish(),
		stripe_price_id: z.coerce.number()
	});
	const itemArraySchema = z.array(itemSchema);
	let parsedProduct = itemArraySchema.parse(data.Product);
	let product = parsedProduct[0];

	const extendedItemSchema = itemSchema.extend({ quantity: z.number() });
	const extendedItemArraySchema = z.array(extendedItemSchema);
	type CartItems = z.infer<typeof extendedItemArraySchema>;

	let newItem = {
		id: product.id,
		name: product.name,
		price: product.price,
		img_url: product.img_url,
		stripe_price_id: product.stripe_price_id,
		quantity: 1
	};

	function addItemToCart() {
		let cartItems: CartItems = JSON.parse(localStorage.getItem('cart') as string);
		if (!cartItems) {
			console.log('no items');
			cartItems = [];
		}
		cartItems.push(newItem);
		localStorage.setItem('cart', JSON.stringify(cartItems));
		console.log(localStorage.getItem('cart'));
	}
</script>

<main>
	<div class="content">
		<img src={product.img_url} alt="" />
		<div class="contentHeader">
			<h1>{product.name}</h1>
			<h2>{product.price} Kr</h2>
		</div>
		<button on:click={() => addItemToCart()}>Add to Cart</button>
		<p>{product.description}</p>
	</div>
</main>

<style>
	main {
		width: 100%;
	}
	h1 {
		font-size: 40px;
	}
	h2 {
		font-size: 34px;
		height: fit-content;
	}
	img {
		width: 100%;
		height: 100vw;
		object-fit: cover;
	}
	.content {
		max-width: 100%;
		padding-inline: 18px;
		display: flex;
		flex-direction: column;
	}
	button {
		padding: 17px 60px;
		border: none;
		border-radius: 25px;
		background-color: var(--Primary);
		color: white;
		font-size: 20px;
		margin-bottom: 25px;
	}
	.contentHeader {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 25px;
	}
</style>
