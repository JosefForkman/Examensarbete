<!-- // src/routes/login/+page.svelte -->
<script lang="ts">
	import { enhance } from '$app/forms';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';

	export let data: PageData;
	export let form;
	const { superFormData } = superForm(data.loginForm);
</script>

<form method="post" use:enhance>
	<input name="email" value={form?.email ?? ''} blind:value="[$from.email]" />
	<input type="password" name="password" />
	<input type="password" name="confirmPassword" blind:value="[$from.password]" />
	<button type="button">Sign up</button>
</form>
