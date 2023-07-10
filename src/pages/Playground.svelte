<main class="body play-body">
	<div class="ground">
		<div class="ground-nav">
			<div class="nav-title-div">
				<p class="m-auto">CODE AREA</p>
			</div>
			<div class="btn-div">
				<button class="run-btn">RUN</button>
				<button class="stop-btn">STOP</button>
				<button class="clear-btn">CLEAR</button>
			</div>
		</div>
		<textarea class="code-area" spellcheck="false"></textarea>
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
	let  output = "";
</script>


<style lang="postcss">
	.play-body {
		@apply p-12 grid grid-rows-2 lg:grid-cols-2 lg:grid-rows-none bg-green-400 gap-8;
	}

	.ground {
		@apply flex flex-col w-full h-full border-2 border-black bg-white rounded-md;
	}

	.ground-nav {
		@apply flex justify-between p-2 border-b-2 border-black;
	}

	.nav-title-div {
		@apply text-2xl flex flex-col;
	}

	.btn-div {
		@apply gap-2 grid grid-cols-3;
	}

	.exbtn {
		@apply text-lg p-1.5 rounded;
	}
	
	.run-btn {
		@apply exbtn bg-green-400;
	}

	.stop-btn {
		@apply exbtn bg-red-500;
	}

	.clear-btn {
		@apply exbtn bg-red-400;
	}

	.area {
		@apply text-lg flex-1 w-full outline-none p-2 rounded-md;
	}

	.code-area {
		@apply area outline-none resize-none;
	}
</style>
