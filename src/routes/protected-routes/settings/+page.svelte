<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;

	const { form, enhance, submitting, errors } = superForm(data.form, { dataType: 'json' });
</script>

<main>

	<form method="POST" use:enhance>
		<div class={`inputField ${$form.name ? 'dirty': ''}`}>
			<label for="name">Namn</label>
			<input type="text" name="name" bind:value={$form.name} placeholder="Namn" />
			{#if $errors.name}<span class="invalid">{$errors.name}</span>{/if}
		</div>
		<div class={`inputField ${$form.phone ? 'dirty' : ''}`}>
			<label for="phone">Telefon nummer</label>
			<input type="text" name="phone" bind:value={$form.phone} placeholder="Telefon nummer" />
			{#if $errors.phone}<span class="invalid">{$errors.phone}</span>{/if}
		</div>
		{#if $form.address}
			<div class={`inputField ${$form.address.city ? 'dirty' : ''}`}>
				<label for="city">Stad</label>
				<input type="text" name="city" bind:value={$form.address.city} placeholder="Stad" />
				{#if $errors.address?.city}<span class="invalid">{$errors.address?.city}</span>{/if}
			</div>
			<div class={`inputField ${$form.address.line1 ? 'dirty' : ''}`}>
				<label for="line1">Gata</label>
				<input type="te" name="line1" bind:value={$form.address.line1} placeholder="Gata" />
				{#if $errors.address?.line1}<span class="invalid">{$errors.address?.line1}</span>{/if}
			</div>
			<div class={`inputField ${$form.address.line2 ? 'dirty' : ''}`}>
				<label for="line2">Husnummer</label>
				<input type="number" name="line2" bind:value={$form.address.line2} placeholder="Husnummer" />
				{#if $errors.address?.line2}<span class="invalid">{$errors.address?.line2}</span>{/if}
			</div>
			<div class={`inputField ${$form.address.postal_code ? 'dirty' : ''}`}>
				<label for="postal_code">Postnummer</label>
				<input type="number" name="postal_code" bind:value={$form.address.postal_code} placeholder="Postnummer" />
				{#if $errors.address?.postal_code}<span class="invalid">{$errors.address?.postal_code}</span>{/if}
			</div>
		{/if}
		<p>
			Alla fält kan lämnas tomma om du inte vill spara din information. <br /><br /> Ifall du vill ta
			bort någon information töm då endast det fältet och Uppdatera så tar vi bort den.
		</p>
		<div class="btnContainer">
			<button disabled={!submitting} class="btn" type="submit">Uppdatera mina uppgifter</button>
		</div>
	</form>
	<form action="/deleteAcc" method="post">
		<button class="btn removeAcc">Ta bort ditt konto</button>
	</form>
</main>

<style>
	main {
		width: 90%;
		margin-inline: 18px;
	}
	form {
		width: 100%;
		background-color: white;
		display: flex;
		flex-direction: column;
		align-items: center;
		box-shadow: 0px 3px 6px lightgray;
		padding-block: 16px;
		gap: 16px;
	}
	.inputField {
		width: 80%;
		position: relative;
	}
	input {
		width: -webkit-fill-available;
		font-size: 1rem;
		padding-block: 0.75em;
		padding-inline: 1em;
		border-width: 1px;
		border-radius: 0.31em;
	}
	label {
		position: absolute;
		top: 50%;
		left: 0.75em;
		transform: translateY(-50%);
		font-size: 1rem;
		background-color: white;
		padding-inline: 0.25em;

		transition: top 0.3s;
	}
	.inputField:focus-within label,
	.inputField.dirty label {
		top: -0.5em;
		transform: translateY(0%);
	}
	.btnContainer {
		width: 80%;
	}
	/* button {
		width: 100%;
		padding-block: 12px;
		font-size: 18px;
		font-weight: bold;
		border-width: 0;
		background-color: var(--Primary);
		color: white;
		border-radius: 10px;
	} */
	form > p {
		width: 80%;
		color: gray;
		font-size: .75rem;
	}
	.removeAcc {
		background-color: red;
		/* width: 80%; */
	}
</style>
