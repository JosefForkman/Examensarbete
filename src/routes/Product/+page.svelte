<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main>
	{#if data.Products}
		{#each data.Products as produkt}
			<a href={'/Product/' + produkt.name} class="Produkt">
				<img src="https://placebeard.it/176/notag" alt="" />
				<div class="content">
					<p>{produkt.name}</p>
					<span>{produkt.price}kr</span>
				</div>
			</a>
		{/each}
	{/if}
</main>

<style>
	main {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(176px, 1fr));
		gap: 1rem 2.81rem;
		margin-inline: 2.5rem;
	}
	.Produkt {
		display: flex;
		flex-direction: column;
		background-color: hsla(0, 0%, 100%, 1);
		padding-bottom: 0.5rem;
		border-radius: 1rem;
		overflow: hidden;
		text-decoration: none;
		color: black;
	}
	.content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
		padding: 0.8rem;
	}
	p {
		font-weight: bold;
	}
</style>
