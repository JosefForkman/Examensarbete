<script lang="ts">
	import type { LayoutData } from './$types';
	import Fa from 'svelte-fa';
	import { faCandyCane, faCartShopping, faHouse } from '@fortawesome/free-solid-svg-icons';

	import '$lib/style.css';

	export let data: LayoutData;

	const { session } = data;

	let navIsOpen = false;
</script>

<!-- The link is a shortcut to be able to skip the header  -->
<a href="#shortcut" class="sr-only">Hoppa över navigering</a>

<header>
	<a class="loga" href="/">ChokladFrossa</a>

	<button
		class="hamburger"
		aria-controls="mainNav"
		aria-expanded={navIsOpen}
		on:click={() => (navIsOpen = !navIsOpen)}
	>
		<p class="sr-only">Meny</p>
		<span aria-hidden="true" />
		<span aria-hidden="true" />
		<span aria-hidden="true" />
	</button>
	<nav id="mainNav" class={navIsOpen ? 'active' : ''}>
		<ul>
			<li>
				<a href="/">
					<div class="svgContiner">
						<Fa icon={faHouse} />
					</div>
					Hem
				</a>
			</li>
			<li>
				<a href="/Godis"
					><div class="svgContiner">
						<Fa icon={faCandyCane} />
					</div>
					Godis
				</a>
			</li>
			<li>
				<a href="/OmOss">
					<div class="svgContiner" />
					Om oss
				</a>
			</li>

			{#if session}
				<li>
					<form method="post">
						<button class="btn">Logga ut</button>
					</form>
				</li>
			{:else}
				<li>
					<a href="/login">
						<div class="svgContiner" />
						Logga in
					</a>
				</li>
				<li>
					<a href="/signUp">
						<div class="svgContiner" />
						Registrera
					</a>
				</li>
			{/if}
		</ul>
	</nav>

	<Fa class="CartShopping" size="2x" color="var(--Primary)" icon={faCartShopping} />
</header>

<div id="shortcut">
	<slot  />
</div>

<style>
	header {
		--_height: 110px;
		/* display: flex;*/
		display: grid;
		align-items: center;
		justify-items: center;
		grid-template-columns: auto 1fr auto;
		padding: 1.5rem 3rem;
		width: 100%;
		height: var(--_height);

		box-sizing: border-box;
	}

	.loga {
		font-size: 3rem;
		font-weight: 700;
		color: var(--Accent);
	}
	nav ul {
		display: flex;
		gap: 2rem;
	}

	nav ul li {
		list-style: none;
	}

	nav ul li a:focus-visible {
		outline: transparent;
		border-bottom: 2px solid red;
	}

	nav ul li a {
		font-size: 2.25rem;
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

	@media (width <= 1300px) {
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

			transform: translateX(100%);
			transition: 0.6s;
		}

		nav.active {
			transform: translateX(0%);
		}

		nav ul {
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
</style>
