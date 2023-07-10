<main class="body play-body">
	<div class="ground">
		<div class="ground-nav">
			<div class="nav-title-div">
				<p class="m-auto">CODE AREA</p>
			</div>
			<div class="btn-div">
				<button class="run-btn" on:click={Output}>RUN</button>
				<button class="stop-btn">STOP</button>
				<button class="clear-btn">CLEAR</button>
			</div>
		</div>
		<textarea class="code-area" spellcheck="false" bind:value={code}></textarea>
	</div>
	<div class="ground">
		<div class="ground-nav">
			<div class="nav-title-div">
				<p class="m-auto">OUTPUT</p>
			</div>
			<div>
				<button class="clear-btn">CLEAR</button>
			</div>
		</div>
		<div class="area">
			<p style="white-space: pre-line">{ output }</p>
      </div>
	</div>
</main>

<script lang="ts">
	let code : String = "";	
	let output : String = "";

	async function Output() {
		let CodeArray: Array<String> = code.match(/\([^()]*\)|(".*?"|[^"\s]+)+(?=\s*|\s*$)/g);
		for (let i = 0; i < CodeArray.length; i++) {
		}
	}
</script>


<style lang="postcss">
	.play-body {
		@apply p-8 md:p-12 grid grid-rows-2 lg:grid-cols-2 lg:grid-rows-none bg-green-400 gap-8;
	}

	.ground {
		@apply flex flex-col w-full h-full border-2 border-black bg-white rounded-md;
	}

	.ground-nav {
		@apply flex justify-between p-2 border-b-2 border-black;
	}

	.nav-title-div {
		@apply md:text-2xl flex flex-col;
	}

	.btn-div {
		@apply gap-2 grid grid-cols-3;
	}

	.exbtn {
		@apply text-sm md:text-lg p-1.5 rounded;
	}
	
	.run-btn {
		@apply exbtn bg-green-400 active:bg-green-500;
	}

	.stop-btn {
		@apply exbtn bg-red-500 active:bg-red-700;
	}

	.clear-btn {
		@apply exbtn bg-red-400 active:bg-red-600;
	}

	.area {
		@apply text-lg flex-1 w-full outline-none p-2 rounded-md;
	}

	.code-area {
		@apply area outline-none resize-none;
	}
</style>
