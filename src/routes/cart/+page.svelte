<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	import { cartStore } from '$lib/cartStore/cart';
	import type { MouseEventHandler } from 'svelte/elements';
	
	const { Get, Post } = cartStore();
	const cart = Get();

	const addToCart = () => {
		Post({
			id: 1,
			price: 30,
			name: 'SvelteKit | persist state without a db | initialize state no db |localStorage hacky workaround',
			img_url: 'https://www.youtube.com/watch?v=HjnbMCYZLEA&t=322s&ab_channel=ConsultingNinja',
			description:
				'Came across a need at work to hack something together a way to store some data in between refreshes without a db.  Thought this solution might come in handy to others.  Check this out and let me know you thoughts.  I hope you find this helpful!',
			stripe_price_id: 123,
			quantity: 1
		});
	};
</script>

<main>
	<h1>Cart</h1>
	<div class="cartContainer">
		{#if $cart}
			<ul>
				{#each $cart as cartItem}
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
							/><button on:click={delite(cartItem.id)}>Reder</button>
						</div>
					</li>
				{/each}
			</ul>
		{/if}
	</div>

	<button on:click={addToCart}>add</button>
</main>

<!-- <style>
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
</style> -->
