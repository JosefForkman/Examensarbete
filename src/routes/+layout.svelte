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
		<Fa size="2x" icon={faCartShopping} />

		<button 
			class="hamburger" 
			on:click={() => (navIsOpen = !navIsOpen)}>
			<!-- <p class="sr-only">Menu toggle button </p> -->
			<span aria-hidden="true" />
			<span aria-hidden="true" />
			<span aria-hidden="true" />
		</button>
	</div>

	<nav id="mainNav" class={navIsOpen ? 'active' : ''}>
		<ul>
			<li>
				<a href="/"
					><div class="svgContiner">
						<Fa icon={faHouse} />
					</div>
					Hem</a
				>
			</li>
			<li>
				<a href="/Godis"
					><div class="svgContiner">
						<Fa icon={faCandyCane} />
					</div>
					Godis</a
				>
			</li>
			<li>
				<a href="/OmOss">
					<div class="svgContiner" />
					Om oss</a
				>
			</li>
		</ul>
	</nav>
</header>

<slot />

<style>
	header {
		--_navPosision: calc(125px + 2rem);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
		padding-block: 2rem;
	}

	.loga {
		font-size: 3rem;
		font-weight: 700;
		color: var(--Primary);
	}

	.hamburger {
		display: flex;
		flex-direction: column;
		gap: 0.7rem;
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
		top: 0px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--Background);
		width: 100vw;
		height: calc(100vh - var(--_navPosision));
		/* transform: translateX(100%); */
		transform: translate(100%, var(--_navPosision));

		transition: 0.6s;
	}

	nav.active {
		/* transform: translateX(0%); */
		transform: translate(0%, var(--_navPosision));
	}

	ul {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		list-style: none;
	}
	li:focus, li:hover {
		outline: transparent;
		border-bottom: 2px solid var(--Secundaty);
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
		aspect-ratio: 1;
	}
</style>
