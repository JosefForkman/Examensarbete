<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main>
	{#if data.Product}
		<div class="content">
			<img src={data.Product[0].img_url} alt="" />
			<div class="contentHeader">
				<h1>{data.Product[0].name}</h1>
				<h2>{data.Product[0].price} Kr</h2>
			</div>
			<button>Add to Cart</button> <!-- this does nothing right now. its going to add the product to the cart -->
			<p>{data.Product[0].description}</p>
		</div>
	{/if}
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
