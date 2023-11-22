<script>
	import src from '$lib/assets/pexels-photo-4016579 1.png';
</script>

<main>
	<section class="herro">
		<h1>Din Port till Godisparadiset!</h1>
		<p>
			ChokladFrossa är din digitala godisbutik med ett varierat sortiment av läckra och frestande
			godisar från hela världen. Beställ dina favoriter enkelt online med snabb leverans och säker
			betalning för att göra din dag lite sötare.
		</p>
		<a class="btn" href="/Godis">Products</a>
		<img {src} alt="" />
	</section>

	<section class="about" id="aboutSection">
		<h2>About us</h2>
		<p>
			Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
			been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
			galley of type and scrambled it to make a type specimen book. It has survived not only five
			centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It
			was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
			passages, and more recently with desktop publishing software like Aldus PageMaker including
			versions of Lorem Ipsum.
		</p>
	</section>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		gap: 10rem;
		margin-inline: 1rem;
	}
	.herro {
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		grid-template-rows: auto auto 1fr;
		align-items: start;
		gap: 1rem;
	}
	.herro h1 {
		color: var(--Primary);
	}
	.herro img {
		grid-row: 1;
		width: 100%;
		border-radius: 0.5rem;
	}

	.about {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 5rem;
	}

	@media (width >= 768px) {
		.herro {
			grid-template-columns: 2fr auto;
			gap: 1rem 1.5rem;
		}

		.herro img {
			height: 35vh;
			object-fit: cover;
		}
		img,
		.herro h1 {
			grid-column: span 2;
		}
	}

	@media (width >= 1024px) {
		main {
			margin-inline: 3rem;
		}
		.herro {
			grid-template-columns: repeat(2, 1fr);
			justify-items: start;
			gap: 1rem 3rem;
		}
		.herro img {
			grid-column: 2;
			grid-row: 1 / span 3;
			height: auto;
		}

		.herro h1 {
			grid-column: 1;
		}
	}
</style>
