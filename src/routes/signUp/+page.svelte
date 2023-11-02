<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	export let data: PageData;
	const { form, errors, enhance } = superForm(data.signUpForm);
</script>

<SuperDebug data={$form} />
<main>
	<h2>Sign Up</h2>
	<form method="post" use:enhance>
		<div class="inputContainer">
			<label for="email">Email</label>
			<input
				name="email"
				aria-invalid={$errors.email ? 'true' : undefined}
				bind:value={$form.email}
			/>
			{#if $errors.email}<span class="invalid">{$errors.email}</span>{/if}
		</div>
		<div class="inputContainer">
			<label for="password">Password</label>
			<input
				type="password"
				name="password"
				aria-invalid={$errors.password ? 'true' : undefined}
				bind:value={$form.password}
			/>
			{#if $errors.password}<span class="invalid">{$errors.password}</span>{/if}
		</div>
		<div class="inputContainer">
			<label for="confirmPassword">Confirm Password</label>
			<input
				type="password"
				name="confirmPassword"
				aria-invalid={$errors.confirmPassword ? 'true' : undefined}
				bind:value={$form.confirmPassword}
			/>
			{#if $errors.confirmPassword}<span class="invalid">{$errors.confirmPassword}</span>{/if}
		</div>
		<button type="submit">Sign up</button>
	</form>
</main>

<style>
	main {
		width: 100%;
		min-height: 60vh;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		gap: 36px;
	}
	form {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 18px;
	}
	.inputContainer {
		display: flex;
		flex-direction: column;
		font-size: 16px;
		gap: 8px;
	}
	input {
		padding: 12px;
		min-width: 329px;
		border: solid 3px var(--Accent);
		border-radius: 3px;
	}
	button {
		padding: 17px 60px;
		border-radius: 25px;
		font-size: 20px;
		cursor: pointer;
		background-color: var(--Primary);
		color: white;
	}
	h2 {
		font-size: 36px;
	}
</style>
