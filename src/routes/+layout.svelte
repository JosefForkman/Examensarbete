<script lang="ts">
	import Fa from 'svelte-fa';
	import { faCandyCane, faCartShopping, faHouse } from '@fortawesome/free-solid-svg-icons';
	import type { LayoutData } from './$types';
	import '$lib/style.css';

	export let data: LayoutData;
</script>

<header>
	<a class="loga" href="/">ChokladFrossa</a>

	<Fa icon={faCartShopping} />

	<div class="hamburger">
		<span />
		<span />
		<span />
	</div>

	<nav>
		<ul>
			<li><a href="/"><Fa icon={faHouse} />Hem</a></li>
			<li><a href="/Godis"><Fa icon={faCandyCane} />Godis</a></li>
			<li><a href="/OmOss"><div class="svgContiner"></div> Om oss</a></li>
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
		width: 50px;
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
	}

	nav.active {
		
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
	}

	.svgContiner {
		height: 2.25rem;
		aspect-ratio: 1 / 1;
	}
</style>
