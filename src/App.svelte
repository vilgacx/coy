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
