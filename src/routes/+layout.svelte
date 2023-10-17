<header>
	<nav>
		<ul>
			<li><a href="/">Home</a></li>
			<li><a href="/checkout">Checkout</a></li>
			<li><a href="/StripeElements">Stripe Elements</a></li>
		</ul>
	</nav>
</header>

<svelte:head>
	<title>Checkout</title>
	<script src="https://js.stripe.com/v3/"></script>
</svelte:head>

<slot />

<style>
	ul {
		display: flex;
		gap: 2rem
	}

	li {
		list-style: none;
	}
	a {
		font-family: sans-serif;
		font-size: 1.2rem;
		color: hsl(0, 0%, 15%);
	}
</style>