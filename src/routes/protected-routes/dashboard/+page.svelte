<script lang="ts">
	import { z } from 'zod';
	import type { PageData } from './$types';
	import { OrderItem, produkt } from '$lib/types/Schema';
	import { error } from '@sveltejs/kit';

	export let data: PageData;

	const orderSchema = z.object({
		id: z.number(),
		Order_items: z.array(
			OrderItem.extend({
				Products: produkt
			})
		)
	});
	const orderArraySchema = z.array(orderSchema).nullish();
	let parsedOrders = orderArraySchema.safeParse(data.orders);
	if (!parsedOrders.success) {
		throw error(500, 'Något gick fel');
	}
	if (!parsedOrders.data) {
		throw error(404, 'Något gick fel');
	}
	let lastOrder: z.infer<typeof orderSchema>;

	
		let sortedOrders = parsedOrders.data.sort((a, b) => a.id - b.id);

		lastOrder = sortedOrders[sortedOrders.length - 1];
</script>

<main>
	<ul>
		{#if lastOrder}
			<li>
				<div class="itemHead">
					<h2>Senaste Beställning</h2>
				</div>
				{#each lastOrder.Order_items as orderItem}
					<div class="productContainer">
						<img src={orderItem.Products.img_url} alt="" />
						<p>{orderItem.Products.name}</p>
					</div>
				{/each}
				<a class="details" href={'/protected-routes/orders/' + lastOrder.id}>Mer Info ></a>
			</li>
		{/if}
		<li>
			<a href="/protected-routes/orders" class="menuItem">
				<p>Alla Beställningar</p>
				<p>></p>
			</a>
			<a href="/" class="menuItem">
				<p>Retunera</p>
				<p>></p>
			</a>
		</li>
		<li>
			<a href="/protected-routes/settings" class="menuItem">
				<p>Hantera dina Upgifter</p>
				<p>></p>
			</a>
			<a href="/" class="menuItem">
				<p>Vanliga Frågor</p>
				<p>></p>
			</a>
			<a href="/" class="menuItem">
				<p>Kontakta oss</p>
				<p>></p>
			</a>
		</li>
		<li>
			<form action="/signOut" method="post">
				<button class="btn">Logga ut</button>
			</form>
		</li>
	</ul>
</main>

<style>
	main {
		width: 90%;
		margin-inline: 18px;
	}
	h2 {
		font-size: 1.8rem;
	}
	ul {
		display: flex;
		flex-direction: column;
		gap: 26px;
	}
	li {
		display: flex;
		flex-direction: column;
		align-items: center;
		list-style: none;
		overflow: hidden;
		background-color: white;
		box-shadow: 0px 3px 6px lightgray;
		padding-top: 8px;
	}
	.itemHead {
		width: fit-content;
		display: flex;
		gap: 18px;
		margin-bottom: 9px;
		padding-bottom: 9px;
		border-bottom: solid grey 1px;
		justify-content: center;
	}
	img {
		aspect-ratio: 1 / 1;
		width: 10vw;
		height: 10vw;
		flex-shrink: 0;
		object-fit: cover;
	}
	.productContainer {
		width: 75%;
		display: flex;
		gap: 8px;
		margin-bottom: 8px;
		padding-inline: 18px;
	}
	.details {
		color: lightgrey;
	}
	a {
		width: 75%;
		margin-bottom: 8px;
		color: black;
	}
	.menuItem {
		width: 75%;
		display: flex;
		justify-content: space-between;
	}
	form {
		width: 75%;
		display: flex;
		justify-content: space-between;
		margin-bottom: 8px;
	}
	.btn {
		background-color: transparent;
		color: black;
		padding: 0;
		text-align: start;
		width: 100%;
		display: flex;
		justify-content: space-between;
		font-size: 16px;
	}
</style>
