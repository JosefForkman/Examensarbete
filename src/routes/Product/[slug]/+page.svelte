<script lang="ts">
	import type { PageData } from './$types';
	import { cartStore } from '$lib/cartStore/cart';
	import { produkt, type cartType } from '$lib/types/Schema';

	const { Post } = cartStore();

	export let data: PageData;

	const product = produkt.parse(data.Product);

	const newItem: cartType = {
		...product,
		quantity: 1
	};
</script>

<main>
	<div class="content">
		<img src={product.img_url} alt="" />
		<div class="contentHeader">
			<h1>{product.name}</h1>
			<h2>{product.price} Kr</h2>
		</div>
		<button on:click={() => Post(newItem)}>Add to Cart</button>
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
		grid-row: 1 / 3;
		width: 100%;
		/* height: 600px;  */
		aspect-ratio: 16 / 9;
		object-fit: cover;
	}
	.content {
		display: grid;
		grid-template-columns: 1fr 2fr;
		gap: 2rem;
		justify-items: start;
		/* max-width: 100%; */
		padding-inline: 18px;
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

	@media (width <= 1400px) {
		.content {
			grid-template-columns: 1fr;
		}
		img {
			grid-row: 1 / 1;
		}
	}
</style>
