<script lang="ts">
	import { cartStore } from '$lib/cartStore/cart';
	import { onMount } from 'svelte';
	const { Clear } = cartStore();
	onMount(() => {
		Clear()
	})
</script>
<h1>Du har lyckas att betala</h1>