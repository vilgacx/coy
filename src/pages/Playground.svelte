<main class="body play-body">
	<div class="ground">
		<div class="ground-nav">
			<div class="nav-title-div">
				<p class="m-auto">CODE AREA</p>
			</div>
			<div class="btn-div">
				<button class="exbtn run-btn" on:click={Output}>RUN</button>
				<button class="exbtn stop-btn">STOP</button>
				<button class="exbtn clear-btn" on:click={() => {code = ""}}>CLEAR</button>
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
				<button class="exbtn clear-btn" on:click={() => {output = ""}}>CLEAR</button>
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
	let dothen : boolean = true;
	let variables = {};
	let reserved : Array<string> = ["store", "in", "say", "if", "else", "then", "repeat", "times", "delay", "seconds", "clear"];
	let logic : Array<string> = [">", "<", "==", "!=", ">=", "<="];
	let arithmatic : Array<string> = ["+", "-", "*", "/", "**", "%", "(", ")"];
	let all : Array<string> = [...reserved, ...logic, ...arithmatic];

	async function Output() {
		output = "";
		let CodeArray : Array<string> = code.match(/\([^()]*\)|(".*?"|[^"\s]+)+(?=\s*|\s*$)/g);
		for (let i = 0; i < CodeArray.length; i++) {
			if ("store" === CodeArray[i] && dothen === true) {
				StoreFn([CodeArray[i+1],CodeArray[i+2],CodeArray[i+3]],i+1);
			} else if ("say" === CodeArray[i] && dothen === true) {
				SayFn([CodeArray[i+1]],i+1);
			}
		}
		variables = {};
		dothen = true;
	}

	function NewLine () {
			if (output !== "") {
				return "\n";
			} else {
				return "";
			}
		}

	function StoreFn(codearray: Array<string>, index: number) {
			if (isNaN(+(codearray[0])) === true && ((codearray[1]).startsWith('"') === false && (codearray[0]).endsWith('"') === false)) {
				output += `${NewLine()}Error at ${index + 1}: encapsulate text in double-quotes. for eg: "Text"`;
			} else if (codearray[1] !== "in") {
				output += `${NewLine()}Error at ${index}: syntax error; use "in" properly. for eg: store <SOME VALUE> in <VARIABLE>`;
			} else if (isNaN(+(codearray[2])) === false) {
				output += `${NewLine()}Error at ${index + 3}: numbers cannot be variables`;
			} else if (all.includes(codearray[2]) === true) {
				output += `${NewLine()}Error at ${index + 3}: reserved words cannot be variables`;
			} else if (codearray[2].includes("'") || code[2].includes('"')) {
				output += `${NewLine()}Error at ${index + 3}: " or ' are not allowed`;
			} else if (codearray[0].startsWith("(") === true && codearray[0].endsWith(")") === true) {
				if ((arithmatic).some((item: string) => ((codearray[0]).split("")).includes(item)) === true) {
					try {
						const vals = variables;
						for (const key in vals) {
							eval(`const ${key} = vals[key];`);
						}
						variables[codearray[2]] = eval(codearray[0]);
					} catch (e) {
						output += `${NewLine()}Error at ${index + 1}: expression not valid`;
					}
				} else {
					output += `${NewLine()}Error at ${index + 1}: expression not valid`;
				}
			} else {
				variables[codearray[2]] = codearray[0];
			}
		}

		function SayFn(codearray: Array<string>, index: number) {
			if (Object.keys(variables).includes(codearray[0]) === true) {
				const val = variables[codearray[0]];
				if (isNaN(val) === true) {
					output += `${NewLine()}` + val.slice(1, val.length - 1);
				} else {
					output += `${NewLine()}` + val;
				}
			} else if (codearray[0].startsWith("(") === true && codearray[0].endsWith(")") === true) {
				if ((arithmatic).some((item: string) => ((codearray[0]).split("")).includes(item)) === true) {
					try {
						const vals = variables;
						for (const key in vals) {
							eval(`const ${key} = vals[key];`);
						}
						output += `${NewLine()}` + eval(codearray[0]);
					} catch (e) {
						output += `${NewLine()}Error at ${index + 1}: expression not valid`;
					}
				} else {
					output += `${NewLine()}Error at ${index + 1}: expression not valid`;
				}
			} else if (isNaN(+(codearray[0])) === true && ((codearray[0]).startsWith('"') === false && (codearray[0]).endsWith('"') === false)) {
				output += `${NewLine()}Error at ${index + 1}: encapsulate text in double-quotes. for eg: "Text"`;
			} else if (isNaN(+codearray[0]) === false) {
				output += `${NewLine()}` + codearray[0];
			} else {
				output += `${NewLine()}` + (codearray[0]).slice(1, (codearray[0]).length - 1);
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
		@apply bg-green-400 active:bg-green-500;
	}

	.stop-btn {
		@apply bg-red-500 active:bg-red-700;
	}

	.clear-btn {
		@apply bg-red-400 active:bg-red-600;
	}

	.area {
		@apply text-lg flex-1 w-full outline-none p-2 rounded-md;
	}

	.code-area {
		@apply area outline-none resize-none;
	}
</style>
