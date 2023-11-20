<script lang="ts">
	import { cartStore } from '$lib/cartStore/cart';

	const { Get, Remove, UppdateQuantity } = cartStore();
	let cart = Get();

	let options: number[] = [];

	for (let i = 1; i <= 100; i++) {
		options.push(i);
	}


	function totalPrice() {
		if (!$cart) {
			return $cart;
		}
		let totalPrice = 0;
		for (let i = 0; i < $cart.length; i++) {
			totalPrice = totalPrice + $cart[i].price * $cart[i].quantity;
		}

		return totalPrice;
	}

	const priceFormat = new Intl.NumberFormat('SE', { style: 'currency', currency: 'sek' });

	let fullPrice = priceFormat.format(totalPrice() ?? 0);

	function removeItem(cartItemId: number) {
		Remove(cartItemId);
		fullPrice = priceFormat.format(totalPrice() ?? 0);
	}
	function uppdateItem(cartItemid: number, quantity: number) {
		const newquantity = quantity;
		UppdateQuantity(cartItemid, newquantity);
		fullPrice = priceFormat.format(totalPrice() ?? 0);
	}
</script>

<main>
	<h1>Kundvagn</h1>
	<h2>{fullPrice}</h2>
	<div>
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
							<!-- might go back to this solotion for updating the quantity -->
							<!-- <input
								type="number"
								name="quantity"
								min="0"
								max="100"
								step="1"
								bind:value={cartItem.quantity}
								on:change={() => uppdateItem(cartItem.id, cartItem.quantity)}
							/> -->
							<select
								name=""
								id=""
								bind:value={cartItem.quantity}
								on:change={() => uppdateItem(cartItem.id, cartItem.quantity)}
							>
								{#each options as option}
									<option value={option}>{option}</option>
								{/each}
							</select>
							<button type="submit" on:click={() => removeItem(cartItem.id)}>Remove</button>
						</div>
					</li>
				{/each}
			</ul>
			{#if $cart.length > 0}
				<a href="/StripeElements" class="btn">Gå till betalning</a>
			{:else}
				<a href="/Product" class="btn">Leta efter Godis</a>
			{/if}
		{/if}
	</div>
</main>

<style>
	main {
		min-height: 99vh;
		margin-inline: 18px;
		display: flex;
		flex-direction: column;
	}
	img {
		width: 80px;
		height: 80px;
	}
	ul {
		margin-bottom: 2.5rem;
	}
	li {
		width: 100%;
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
