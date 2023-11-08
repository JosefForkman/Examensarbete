<script lang="ts">
	import { z } from 'zod';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;
	//@ts-ignore
	const { form } = superForm(data.form);
</script>

<main>
	<form method="POST">
		<div class="inputField">
			<label for="first_name">Förstanamn</label>
			<input type="text" name="first_name" bind:value={$form.first_name} />
		</div>
		<div class="inputField">
			<label for="first_name">Efternamn</label>
			<input type="text" name="last_name" bind:value={$form.last_name} />
		</div>
		<div class="inputField">
			<label for="first_name">Gata</label>
			<input type="text" name="street" bind:value={$form.street} />
		</div>
		<div class="inputField">
			<label for="first_name">Hus Nummer</label>
			<input type="number" name="house_number" bind:value={$form.house_number} />
		</div>
		<div class="inputField">
			<label for="first_name">Lägenhets Nummer</label>
			<input type="number" name="apartment_number" bind:value={$form.apartment_number} />
		</div>
		<p>
			Alla fält kan lämnas tomma om du inte vill spara din information. <br /><br /> Ifall du vill ta
			bort någon information töm då endast det fältet och Uppdatera så tar vi bort den.
		</p>
		<div class="btnContainer"><button type="submit">Uppdatera mina uppgifter</button></div>
	</form>
	<form action="/deleteAcc" method="post">
		<button class="removeAcc">Ta bort ditt konto</button>
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
		font-size: 18px;
		padding-block: 12px;
		padding-inline: 16px;
		border-width: 1px;
		border-radius: 5px;
	}
	label {
		font-size: 14px;
		background-color: white;
		padding-inline: 4px;
		position: absolute;
		top: -8px;
		left: 16px;
	}
	.btnContainer {
		width: 80%;
	}
	button {
		width: 100%;
		padding-block: 12px;
		font-size: 18px;
		font-weight: bold;
		border-width: 0;
		background-color: var(--Primary);
		color: white;
		border-radius: 10px;
	}
	form > p {
		width: 80%;
		color: gray;
		font-size: 13px;
	}
	.removeAcc {
		background-color: red;
		width: 80%;
	}
</style>
