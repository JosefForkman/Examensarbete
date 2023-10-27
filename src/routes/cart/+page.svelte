<script lang="ts">
	// import type { PageData } from './$types';

	// export let data: PageData;
</script>

<main>
	<h1>Cart</h1>
	<div class="cartContainer">
		<ul>
			<li>
				<div class="wrapper">
					<img src="" alt="" />
					<div class="textContainer">
						<p class="bold">name</p>
						<p>price</p>
					</div>
				</div>
				<div class="buttonContainer">
					<input type="number" name="quantity" min="0" max="100" step="1" value="1" /><button />
				</div>
			</li>
		</ul>
	</div>
</main>

<style>
	main {
		width: -webkit-fill-available;
		min-height: 99vh;
		margin-inline: 18px;
		display: flex;
		flex-direction: column;
	}
	img {
		width: 80px;
		height: 80px;
	}
	li {
		width: -webkit-fill-available;
		display: flex;
		justify-content: space-between;
		border-bottom: solid 2px black;
		padding-bottom: 8px;
	}
	button {
		width: 55px;
		height: 55px;
		background-color: azure;
	}
	.buttonContainer {
		display: flex;
		gap: 18px;
		align-items: center;
	}
	input {
		width: 46px;
		height: 28px;
	}
	.textContainer {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.bold {
		font-weight: bold;
		margin-top: 8px;
	}
	.wrapper {
		display: flex;
		gap: 8px;
	}
</style>
