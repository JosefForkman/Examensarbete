<script lang="ts">
	import type { LayoutData } from './$types';
	import Fa from 'svelte-fa';
	import { faCandyCane, faCartShopping, faHouse } from '@fortawesome/free-solid-svg-icons';

	import '$lib/style.css';

	export let data: LayoutData;

	let navIsOpen = false;
</script>

<header>
	<a class="loga" href="/">ChokladFrossa</a>

	<div class="middelItem">
		<Fa icon={faCartShopping} />

		<button class="hamburger" on:click={() => (navIsOpen = !navIsOpen)}>
			<span />
			<span />
			<span />
		</button>
	</div>

	<nav class={navIsOpen ? 'active' : ''}>
		<ul>
			<li><a href="/"><Fa icon={faHouse} />Hem</a></li>
			<li><a href="/Godis"><Fa icon={faCandyCane} />Godis</a></li>
			<li>
				<a href="/OmOss"
					><div class="svgContiner" />
					 Om oss</a
				>
			</li>
		</ul>
	</nav>
</header>

<slot />

<style>
	header {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
	}

	.loga {
		font-size: 3rem;
		font-weight: 700;
		color: var(--Primary);
	}

	.hamburger {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		background-color: transparent;
		width: 50px;

		border: none;
	}
	.middelItem {
		display: flex;
		gap: 2.5rem;
	}
	.middelItem svg {
		font-size: 2rem;
	}
	.hamburger span {
		background-color: var(--Primary);
		height: 4px;
		width: 100%;

		border-radius: 0.5rem;
	}

	nav {
		position: absolute;
		top: 50%;
		left: 100%;
		transform: translate(0%, -50%);

		transition: 0.6s;
	}

	nav.active {
		left: 50%;
		transform: translate(-50%, -50%);
	}

	ul {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		list-style: none;
	}

	ul a {
		display: flex;
		gap: 1em;
		font-size: 2.25rem;
		color: var(--Primary);
		width: max-content;
	}

	.svgContiner {
		height: 2.25rem;
		aspect-ratio: 1 / 1;
	}
</style>
