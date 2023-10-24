<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const { Products } = data;
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
{#if Products}
	{#each Products as Product}
		<p>{Product.description}</p>
	{/each}
{:else}
	<p>LMAO</p>
{/if}
