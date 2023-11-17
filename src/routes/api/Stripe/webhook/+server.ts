import { stripe } from '$lib/server/stripe';
import type { RequestHandler } from './$types';
import { SECRET_STRIPE_webhook_KEY } from '$env/static/private';
import { json } from '@sveltejs/kit';
import { z } from 'zod';
import type Stripe from 'stripe';

const addressSchema = z.object({
	city: z.coerce.string().optional(),
	line1: z.coerce.string().optional(),
	line2: z.coerce.string().optional(),
	postal_code: z.string().optional()
});

const shipping = z.object({
	name: z.string(),
	phone: z.string().nullable(),
	address: addressSchema.nullable(),
	carrier: z.string().nullable(),
	tracking_number: z.number().nullable()
});

const paymentIntentSchema = z.object({
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

export const POST: RequestHandler = async ({ request, locals: { supabase } }) => {
	const signature = request.headers.get('stripe-signature');
	const body = await request.text();

	async function updateOrderTableStatus(status: boolean, event: Stripe.Event) {
		try {
			const paymentIntent = paymentIntentSchema.safeParse(event.data.object);

			if (!paymentIntent.success) {
				console.log(paymentIntent.error.flatten());
				return json({ message: 'paymentIntent matchar inte' }, { status: 400 });
			}

			const { error: orderError } = await supabase
				.from('Orders')
				.update({ status })
				.eq('stripe_payment_intent_id', paymentIntent.data.id);

			if (orderError) {
				return json({ message: 'kunde inte ta bort order' }, { status: 404 });
			}

			if (!status) {
				await stripe.paymentIntents.cancel(paymentIntent.data.id);
			}
		} catch (cancelError) {
			return json({ message: 'kunde inte ta bort stripe order', cancelError }, { status: 500 });
		}

		return new Response();
	}
	if (SECRET_STRIPE_webhook_KEY && signature && body) {
		try {
			const event = stripe.webhooks.constructEvent(body, signature, SECRET_STRIPE_webhook_KEY);

			switch (event.type) {
				case 'payment_intent.succeeded':
					updateOrderTableStatus(true, event);
					// console.log(`PaymentIntent for ${paymentIntent} was successful!`);
					// console.log({ payment_intent: event.data.object });
					break;
				case 'payment_intent.canceled':
					updateOrderTableStatus(false, event);
					// console.log(`PaymentIntent for ${paymentIntent} was canceled!`);
					break;
				// case 'payment_intent.created':
				// 	// console.log(`PaymentIntent for ${paymentIntent} was created!`);
				// 	break;
				case 'charge.succeeded':
					// console.log(`charge for ${paymentIntent} has succeeded!`);
					// console.log({ charge: event.data.object });

					break;
				default:
					console.log(`ohanterad stripe event ${event.type}`);
					break;
			}

			return new Response();
		} catch (err) {
			console.log(`⚠️  Webhook signature verification failed.`, err);
			return json(null, { status: 400 });
		}
	}

	return json({ message: 'något hände i stripe webhooks' }, { status: 401 });
};
