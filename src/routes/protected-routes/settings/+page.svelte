<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;
	//@ts-ignore
	const { form } = superForm(data.form);
</script>

<main>
	<form method="POST">
		<div class="inputField">
			<label for="name">Namn</label>
			<input type="text" name="name" bind:value={$form.name} />
		</div>
		<div class="inputField">
			<label for="city">Stad</label>
			<input type="text" name="city" bind:value={$form.city} />
		</div>
		<div class="inputField">
			<label for="line1">Gata</label>
			<input type="line1" name="line1" bind:value={$form.line1} />
		</div>
		<div class="inputField">
			<label for="line2">Husnummer</label>
			<input type="number" name="line2" bind:value={$form.line2} />
		</div>
		<div class="inputField">
			<label for="postal_code">Postnummer</label>
			<input type="number" name="postal_code" bind:value={$form.postal_code} />
		</div>
		<div class="inputField">
			<label for="phone">Telefon nummer</label>
			<input type="text" name="phone" bind:value={$form.phone} />
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
