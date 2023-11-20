import { z } from 'zod';

/* Order */
export const OrderItem = z.object({
	id: z.number().min(1),
	products_id: z.number().nullish(),
	quantity: z.number().min(1)
});

export const OrderItems = z.array(OrderItem);

export type OrderItemsType = z.infer<typeof OrderItems>;

/* Produkt */
export const produkt = z.object({
	description: z.string().nullable(),
	id: z.number(),
	img_url: z.string().url().nullable(),
	name: z.string(),
	price: z.number(),
	stripe_price_id: z
		.string()
		.min(30, 'Produkt id för kort')
		.regex(new RegExp('price_[A-Za-z0-9]{8,30}$'), 'Formateringen av produkt id är fel')
});
export const produkts = z.array(produkt);

export type produktType = z.infer<typeof produkt>

/* Stripe */
export const addressSchema = z.object({
	city: z.coerce.string().optional(),
	line1: z.coerce.string().optional(),
	line2: z.coerce.string().optional(),
	postal_code: z.string().optional()
});
export const shipping = z.object({
	name: z.string(),
	phone: z.string().nullable(),
	address: addressSchema.nullable(),
	carrier: z.string().nullable(),
	tracking_number: z.number().nullable()
});
export const paymentIntentSchema = z.object({
	object: z.enum(['payment_intent', 'charge']).nullable(),
	id: z.string(),
	amount: z.number().min(30),
	client_secret: z
		.string()
		.min(27, 'client secret för kort')
		.regex(
			new RegExp('pi_[A-Za-z0-9]{0,24}_secret_[A-Za-z0-9]{0,25}$'),
			'Formateringen av client secret är fel'
		),
	shipping: shipping.nullable()
});

export const StripeOrderItem = OrderItem.merge(produkt.pick({ stripe_price_id: true }));

export const StripeOrdersItem = z.array(StripeOrderItem);

export type StripeOrderItemsType = z.infer<typeof StripeOrdersItem>;

/* Cart */
export const cartSchema = produkt.merge(OrderItem.pick({ quantity: true }));

export const cartsSchema = z.array(cartSchema);

export type cartType = z.infer<typeof cartSchema>;
export type cartsType = z.infer<typeof cartsSchema>;

/* Supabase join table */
