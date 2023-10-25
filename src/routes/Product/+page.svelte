<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>
<main>
	{#each data.produkts as produkt}
		<div class="Produkt">
			<img src="https://placebeard.it/176/notag" alt="">
			<div class="content">
				<p>{produkt.name}</p>
				<span>{produkt.Price}kr</span>
			</div>
		</div>
	{/each}
</main>

<style>
	main {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(176px, 1fr));
		gap: 1rem 2.81rem;
		margin-inline: 2.5rem
	}
	.Produkt {
		display: flex;
		flex-direction: column;
		background-color: hsla(0, 0%, 100%, 1);
		padding-bottom: 0.5rem;
		border-radius: 1rem;
		overflow: hidden;
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