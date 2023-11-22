<script lang="ts">
	import { z } from 'zod';
	import type { PageData } from './$types';
	import { OrderItem, produkt } from '$lib/types/Schema';

	export let data: PageData;

	const orderSchema = z.object({
		id: z.number(),
		order_date: z.string().nullable(),
		Order_items: z.array(
			OrderItem.extend({
				Products: produkt
			})
		)
	});

	const orderArraySchema = z.array(orderSchema);
	let parsedOrders = orderArraySchema.parse(data.orders);
	parsedOrders = parsedOrders.sort((a, b) => b.id - a.id);

	let orderDates: string[] = [];

	for (let i = 0; i < parsedOrders.length; i++) {
		const date = new Date(parsedOrders[i].order_date as string).toLocaleString('default', {
			day: '2-digit',
			month: 'long',
			year: 'numeric'
		});
		orderDates.push(date);
	}
</script>

<main>
	<ul>
		{#each parsedOrders as order, orderIndex}
			<li>
				<div class="itemHead">
					<h2>Beställd: {orderDates[orderIndex]}</h2>
				</div>
				{#each order.Order_items as orderItem}
					<div class="productContainer">
						<img src={orderItem.Products.img_url} alt="" />
						<div>
							<p>{orderItem.Products.name}</p>
						</div>
					</div>
				{/each}
				<a class="details" href={'/protected-routes/orders/' + order.id}>Mer Info ></a>
			</li>
		{/each}
	</ul>
</main>

<style>
	main {
		width: 90%;
		margin-inline: 18px;
	}
	h2 {
		font-size: 1.5rem;
		font-weight: bold;
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
</style>
