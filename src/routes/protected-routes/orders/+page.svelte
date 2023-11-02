<script lang="ts">
	import { z } from 'zod';
	import type { PageData } from './$types';

	export let data: PageData;

	const orderSchema = z.object({
		id: z.number(),
		user_id: z.string(),
		street: z.string(),
		house_number: z.number(),
		apartment_number: z.number().nullish(),
		Order_items: z.array(
			z.object({
				id: z.number(),
				product_id: z.number(),
				quantity: z.number(),
				Products: z.object({
					id: z.number(),
					name: z.string(),
					price: z.number(),
					img_url: z.string().nullable(),
					description: z.string().nullish(),
					stripe_price_id: z.string()
				})
			})
		)
	});
	const orderArraySchema = z.array(orderSchema);
	let parsedOrders = orderArraySchema.parse(data.orders);

	let fullPrice: any = [];

	for (let i = 0; i < parsedOrders.length; i++) {
		let orderPrice = 0;
		parsedOrders[i].Order_items.forEach((orderItem) => {
			orderPrice += orderItem.Products.price * orderItem.quantity;
		});
		fullPrice.push(orderPrice);
	}
</script>

<main>
	<ul>
		{#each parsedOrders as order, orderIndex}
			<li>
				<div class="itemHead">
					<h2>{fullPrice[orderIndex]} Kr</h2>
					<div class="adressContainer">
						<p>{order.street} {order.house_number}</p>
						{#if order.apartment_number}
							<p>Lägenhet: {order.apartment_number}</p>
						{/if}
					</div>
				</div>
				{#each order.Order_items as orderItem}
					<div class="productContainer">
						<img src={orderItem.Products.img_url} alt="" />
						<p>{orderItem.Products.name}</p>
						<p>Mängd: {orderItem.quantity}</p>
					</div>
				{/each}
			</li>
		{/each}
	</ul>
</main>

<style>
	main {
		width: 90%;
		margin-inline: 18px;
	}
	li {
		border: solid 1px gray;
		list-style: none;
		overflow: hidden;
	}
	.itemHead {
		display: flex;
		gap: 18px;
		box-shadow: 0px 1px 6px grey;
		margin-bottom: 18px;
		justify-content: space-evenly;
	}
	img {
		aspect-ratio: 1 / 1;
		width: 10vw;
		height: 10vw;
		flex-shrink: 0;
		object-fit: cover;
	}
	.productContainer {
		display: flex;
		gap: 8px;
		margin-bottom: 8px;
	}
</style>
