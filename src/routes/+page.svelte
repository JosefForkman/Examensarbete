<script>
	import src from '$lib/assets/pexels-photo-4016579 1.png';
</script>

<main>
	<section>
		<h1>Din Port till Godisparadiset!</h1>
		<p>
			ChokladFrossa är din digitala godisbutik med ett varierat sortiment av läckra och frestande
			godisar från hela världen. Beställ dina favoriter enkelt online med snabb leverans och säker
			betalning för att göra din dag lite sötare.
		</p>
		<a class="btn" href="/Godis">Products</a>
		<img {src} alt="" />
	</section>
</main>

<style>
	main {
		margin-inline: 1rem;
	}
	section {
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		grid-template-rows: auto auto 1fr;
		align-items: start;
		gap: 1rem;
	}
	section h1 {
		color: var(--Primary);
	}
	img {
		grid-row: 1;
		width: 100%;
		border-radius: 0.5rem;
	}

	@media (width >= 768px) {
		section {
			grid-template-columns: 2fr auto;
			gap: 1rem 1.5rem;
		}

		img {
			height: 35vh;
			object-fit: cover;
		}
		img, h1 {
			grid-column: span 2;
		}
	}

	@media (width >= 1024px) {
		main {
			margin-inline: 3rem;
		}
		section {
			grid-template-columns: repeat(2, 1fr);
			justify-items: start;
			gap: 1rem 3rem;
		}
		img {
			grid-column: 2;
			grid-row: 1 / span 3;
			height: auto;
		}

		h1 {
			grid-column: 1;
		}
	}
</style>
