<script>
	import Router from 'svelte-spa-router';
	import { link }	from 'svelte-spa-router';
	import routes from './routes';
</script>

<main class="body">
	<div class="nav">
		<a href="/" class="nav-link" use:link>Home</a>
		<a href="/guide" class="nav-link" use:link>Guide</a>
		<a href="/play" class="nav-link" use:link>Playground</a>
	</div>
	<Router {routes} />
</main>

<style lang="postcss">
	.nav {
		@apply flex w-full justify-between text-lg px-16 py-4 border-b border-black;
	}

	.nav-link {
		@apply hover:text-blue-800;
	}
</style>
