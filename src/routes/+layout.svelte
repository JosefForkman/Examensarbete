<script lang="ts">
	import '$lib/style.css';

	import type { LayoutData } from './$types';
	import Fa from 'svelte-fa';
	import {
		faCandyCane,
		faCartShopping,
		faHouse,
		faUserAlt
	} from '@fortawesome/free-solid-svg-icons';

	export let data: LayoutData;

	const { session } = data;

	const toggleNav = () => (navIsOpen = !navIsOpen);

	let navIsOpen = false;
</script>

<!-- The link is a shortcut to be able to skip the header  -->
<a href="#shortcut" class="sr-only">Hoppa över navigering</a>

<header>
	<a aria-label="Logga med text 'ChokladFrossa'" class="loga" href="/">ChokladFrossa</a>

	<button class="hamburger" aria-controls="mainNav" aria-expanded={navIsOpen} on:click={toggleNav}>
		<p class="sr-only">Meny</p>
		<span aria-hidden="true" />
		<span aria-hidden="true" />
		<span aria-hidden="true" />
	</button>
	<nav id="mainNav" class={navIsOpen ? 'active' : ''}>
		<ul>
			<li>
				<button on:click={toggleNav} tabindex="-1" aria-hidden="true">
					<a href="/">
						<div class="svgContiner">
							<Fa icon={faHouse} />
						</div>
						Hem
					</a>
				</button>
			</li>
			<li>
				<button on:click={toggleNav} tabindex="-1" aria-hidden="true">
					<a href="/Product"
						><div class="svgContiner">
							<Fa icon={faCandyCane} />
						</div>
						Godis
					</a>
				</button>
			</li>
			<li>
				<button on:click={toggleNav} tabindex="-1" aria-hidden="true">
					<a href="/OmOss">
						<div class="svgContiner" />
						Om oss
					</a>
				</button>
			</li>

			{#if session}
				<li>
					<button on:click={toggleNav} tabindex="-1" aria-hidden="true">
						<a href="/protected-routes/dashboard">
							<div class="svgContiner">
								<Fa icon={faUserAlt} />
							</div>
							Mina sidor</a
						>
					</button>
				</li>
				<li>
					<form action="/signOut" method="post">
						<button class="btn" on:click={toggleNav}>Logga ut</button>
					</form>
				</li>
			{:else}
				<li>
					<button on:click={toggleNav} tabindex="-1" aria-hidden="true">
						<a href="/login">
							<div class="svgContiner" />
							Logga in
						</a>
					</button>
				</li>
				<li>
					<button on:click={toggleNav} tabindex="-1" aria-hidden="true">
						<a href="/signUp">
							<div class="svgContiner" />
							Registrera
						</a>
					</button>
				</li>
			{/if}
		</ul>
	</nav>
	<a href="/cart">
		<Fa class="CartShopping" size="2x" color="var(--Primary)" icon={faCartShopping} />
	</a>
</header>

<div id="shortcut">
	<slot />
</div>

<style>
	header {
		--_height: 170px;
		/* display: flex;*/
		display: grid;
		align-items: center;
		justify-items: center;
		grid-template-columns: auto 1fr auto;
		padding: 1.5rem 1rem;
		width: 100%;
		height: var(--_height);
		margin-bottom: 2.5rem;
		box-shadow: 0px 4px 8px hsl(0deg 0% 0% / 10%);

		box-sizing: border-box;
	}

	.loga {
		font-size: 2rem;
		font-weight: 700;
		color: var(--Accent);
	}
	nav ul {
		display: flex;
		align-items: center;
		gap: 2rem;
	}

	nav ul li {
		list-style: none;
	}

	nav ul li button:not(.btn) {
		background-color: transparent;
		border: transparent;
	}

	nav ul li a button:focus-visible {
		outline: transparent;
		border-bottom: 2px solid red;
	}

	nav ul li a {
		font-size: 1.5rem;
		color: var(--Primary);
	}
	.hamburger {
		display: none;
		flex-direction: column;
		gap: 0.7rem;
		background-color: transparent;
		width: 50px;

		border: none;
	}
	.hamburger span {
		background-color: var(--Primary);
		height: 4px;
		width: 100%;

		border-radius: 0.5rem;
	}

	.svgContiner {
		display: none;
		height: 2.25rem;
		aspect-ratio: 1;
	}

	@media (width >= 1024px) {
		header {
			padding: 1.5rem 3rem;
		}
	}

	@media (width <= 1400px) {
		header {
			justify-items: end;
			gap: 2rem;
		}
		nav {
			position: fixed;
			left: 0px;
			top: var(--_height);
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: var(--Background);
			height: calc(100vh - var(--_height));
			width: 100%;
			z-index: 2;

			transform: translateX(100%);
			transition: 0.6s;
		}

		nav.active {
			transform: translateX(0%);
		}

		nav ul {
			align-items: baseline;
			flex-direction: column;
		}

		.hamburger {
			display: flex;
		}

		nav ul li a {
			display: flex;
			gap: 1em;
		}
		.svgContiner {
			display: block;
		}
	}

	@media (width <= 600px) {
		header {
			--_height: 171px;
			grid-template-columns: 1fr 1fr;
			justify-items: center;
		}

		.loga {
			grid-column: span 2;
		}
	}

	a {
		color: black;
	}
</style>
