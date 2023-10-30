<script lang="ts">
	import { cartStore } from '$lib/cartStore/cart';
	import { redirect } from '@sveltejs/kit';

	const { Get, Post, Remove } = cartStore();
	const cart = Get();

	function removeItem(cartItemId: number) {
		Remove(cartItemId);
	}
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
							/>
							<form action="">
								<button type="submit" on:click={() => removeItem(cartItem.id)}>Remove</button>
							</form>
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
