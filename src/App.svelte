<script>
  import Router from 'svelte-spa-router';
  import { link }	from 'svelte-spa-router';

  import Home from './pages/Home.svelte'; 
  import Guide from './pages/Guide.svelte';
  import Playground from './pages/Playground.svelte';

  const routes = {
    '/': Home,
    '/guide': Guide,
    '/play': Playground
  }
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
  .nav { @apply flex w-full justify-between text-lg px-16 py-4 border-b border-black; }

  .nav-link { @apply hover:text-blue-800; }
</style>
