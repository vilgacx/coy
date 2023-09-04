<main class="main home-body">
	<div class="content-div">
		<p class="title">COY</p>
		<p class="sub">A minimal programming langauage simpler than python & lua.</p>
		<div class="links">
			<a href="/play" use:link>playground</a>
			<br>
			<a href="/guide" use:link>how to use it?</a>
      <br>
      <a href="https://github.com/vilgacx/coy/blob/main/README.md#disclaimer">disclaimer</a>
		</div>
	</div> 
</main>

<script>
	import {link} from 'svelte-spa-router';
</script>

<style lang="postcss">
.home-body {
	@apply flex flex-col p-12;
}

.content-div {
	@apply m-auto flex flex-col space-y-4;
}

.title {
	@apply text-9xl text-green-500 underline;
}

.links {
	@apply decoration-2 underline underline-offset-4 text-blue-800;
}
</style>
