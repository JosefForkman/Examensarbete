<script lang="ts">
	// fill if needs
</script>

<main>
	<div class="linkContainer">
		<a class="btn" href='/login'>Login</a>
		<a class="btn" href='/signUp'>Sign Up</a>
	</div>
</main>

<style>
	main {
		width: 100%;
		height: 60vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.linkContainer {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 18px;
	}
	.linkBtn {
		padding: 17px 60px;
		border-radius: 25px;
		font-size: 20px;
		cursor: pointer;
		background-color: var(--Primary);
		color: white;
	}
</style>
