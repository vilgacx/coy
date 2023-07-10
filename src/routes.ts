import Home from './pages/Home.svelte'; 
import Guide from './pages/Guide.svelte';
import Playground from './pages/Playground.svelte';

const routes = {
    '/': Home,
		'/guide': Guide,
		'/play': Playground
}

export default routes;
