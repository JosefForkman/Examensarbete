<script lang="ts">
	import { z } from 'zod';
	import type { PageData } from './$types';

	export let data: PageData;

	const orderSchema = z.object({
		id: z.number(),
		order_date: z.string().nullish(),
		delivery_date: z.string().nullish(),
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
	let address = data.address;

	let fullPrice: any = [];

	for (let i = 0; i < parsedOrders.length; i++) {
		let orderPrice = 0;
		parsedOrders[i].Order_items.forEach((orderItem) => {
			orderPrice += orderItem.Products.price * orderItem.quantity;
		});
		fullPrice.push(orderPrice);
	}

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
				{#each order.Order_items as orderItem, itemIndex}
					<div class="productContainer">
						<img src={orderItem.Products.img_url} alt="" />
						<div class="itemDetails">
							<h3>{orderItem.Products.name}</h3>
							<p>Mängd: {orderItem.quantity}</p>
							<div class="priceItem">
								<p>Summa</p>
								<p>{(orderItem.quantity * orderItem.Products.price).toFixed(2)} Kr</p>
							</div>
						</div>
					</div>
					{#if itemIndex !== order.Order_items.length - 1}
						<div class="seperator" />
					{/if}
				{/each}
				<div class="orderDetails">
					<h2 class="seperatorh2">Beställnings Information</h2>
					<div class="adressContainer">
						<h3>Adress</h3>
						<p>
							{address?.line1}
							{address?.line2}
						</p>
						<p>{address?.city} {address?.postal_code}</p>
					</div>
					<div class="totalPrice">
						<h3>Total kostnad</h3>
						<div class="priceItem">
							<p>Delsumma</p>
							<p>{fullPrice[orderIndex].toFixed(2)} Kr</p>
						</div>
						<div class="priceItem">
							<p>Frakt</p>
							<p>0 Kr</p>
						</div>
						<div class="priceItem">
							<h3>ordersumma</h3>
							<h3 class="totalCost">{fullPrice[0].toFixed(2)} Kr</h3>
						</div>
					</div>
				</div>
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
		padding-block: 18px;
		margin-bottom: 40px;
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
		width: 20vw;
		height: 20vw;
		flex-shrink: 0;
		object-fit: cover;
	}
	.productContainer {
		width: 85%;
		display: flex;
		gap: 8px;
		margin-bottom: 8px;
	}
	p {
		color: gray;
	}
	.seperator {
		padding-bottom: 9px;
		margin-bottom: 9px;
		border-bottom: solid grey 1px;
		min-height: 1px;
		width: 90%;
	}
	.adressContainer {
		display: flex;
		flex-direction: column;
	}
	.priceItem {
		display: flex;
		width: 100%;
		justify-content: space-between;
	}
	.itemDetails {
		width: 100%;
	}
	.seperatorh2 {
		padding-bottom: 9px;
		margin-bottom: 9px;
		border-bottom: solid grey 1px;
	}
</style>
