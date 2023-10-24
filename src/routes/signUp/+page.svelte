<!-- // src/routes/login/+page.svelte -->
<script lang="ts">
	// import { enhance } from '$app/forms';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	export let data: PageData;
	// export let form;
	const { form, errors, constraints, enhance } = superForm(data.loginForm);
</script>

<SuperDebug data={$form} />

<form method="post" use:enhance>
	<input
		name="email"
		aria-invalid={$errors.email ? 'true' : undefined}
		bind:value={$form.email}
	/>
	{#if $errors.email}<span class="invalid">{$errors.email}</span>{/if}

	<input
		type="password"
		name="password"
		aria-invalid={$errors.password ? 'true' : undefined}
		bind:value={$form.password}
	/>
	{#if $errors.password}<span class="invalid">{$errors.password}</span>{/if}

	<input
		type="password"
		name="confirmPassword"
		aria-invalid={$errors.confirmPassword ? 'true' : undefined}
		bind:value={$form.confirmPassword}
	/>
	{#if $errors.confirmPassword}<span class="invalid">{$errors.confirmPassword}</span>{/if}

	<button type="submit">Sign up</button>
</form>
