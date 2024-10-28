<script lang="ts">
	import { link } from "svelte-spa-router";
</script>

<main class="main home-body">
	<div class="content-div">
		<p class="title">COY</p>
		<p class="sub">
			A minimal web-based programming langauage written in
			typescript.
		</p>
		<div class="links">
			<a href="/play" use:link>playground</a>
			<a href="/guide" use:link>how to use it?</a>
			<a
				href="https://github.com/vilgacx/coy/blob/main/README.md#disclaimer"
				>disclaimer</a
			>
			<a href="https://github.com/vilgacx/coy" use:link
				>source code</a
			>
		</div>
	</div>
</main>

<style lang="postcss">
	.home-body {
		@apply flex flex-col p-12;
	}

	.content-div {
		@apply m-auto flex flex-col space-y-4;
	}

	.sub {
		@apply md:w-96;
	}

	.title {
		@apply text-9xl text-green-500 underline;
	}

	.links {
		@apply flex flex-col gap-1 decoration-2 underline underline-offset-4 text-blue-800;
	}
</style>
