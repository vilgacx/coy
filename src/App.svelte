<script>
import Router from 'svelte-spa-router';
import routes from './routes.ts';
</script>

<main class="body">
	<div class="nav">
		<a href="/" class="nav-link">Home</a>
		<a href="/guide" class="nav-link">Guide</a>
		<a href="/play" class="nav-link">Playground</a>
	</div>
	<Router {routes} />
</main>
