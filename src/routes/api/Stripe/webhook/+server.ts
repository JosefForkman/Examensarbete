import { stripe } from '$lib/server/stripe';
import type { RequestHandler } from './$types';
import { SECRET_STRIPE_webhook_KEY } from '$env/static/private';
import { json } from '@sveltejs/kit';
import type Stripe from 'stripe';

export const POST: RequestHandler = async ({ request, locals: { supabase } }) => {
	let event: Stripe.Event | null = null;

	const signature = request.headers.get('stripe-signature');
	const body = await request.text();

	if (SECRET_STRIPE_webhook_KEY && signature && body) {
		try {
			event = stripe.webhooks.constructEvent(body, signature, SECRET_STRIPE_webhook_KEY);
		} catch (err) {
			console.log(`⚠️  Webhook signature verification failed.`, err);
			return json(null, { status: 400 });
		}
	}
	if (!event) {
		return json({ message: 'Misslyckades att skapa stripe Event' }, { status: 500 });
	}
	console.log(event);

	const paymentIntent = event.data.object;
	switch (event.type) {
		case 'payment_intent.succeeded':
			console.log(`PaymentIntent for ${paymentIntent} was successful!`);
			break;
		case 'payment_intent.canceled':
			console.log(`PaymentIntent for ${paymentIntent} was canceled!`);
			break;
		case 'payment_intent.created':
			console.log(`PaymentIntent for ${paymentIntent} was created!`);
			break;
		case 'charge.succeeded':
			console.log(`charge for ${paymentIntent} has succeeded!`);
			break;
		default:
			console.log(`ohanterad stripe event ${event.type}`);
			break;
	}

	return new Response();
};
