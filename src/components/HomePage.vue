<template>
	<div class="flex flex-col py-10 px-28 space-y-8 font-mono">
		<div class="m-auto flex flex-col space-y-2">
			<h1 class="text-6xl">codethetoy</h1>
			<p class="text-2xl"><i>a toy languange for learners simpler than lua and python.</i></p>
			<p class="font-bold">written in freaking JS.</p>
			<p class="text-xs text-italic"><i>by x0rvet.</i></p>
		</div>
		<textarea class="m-auto p-5 bg-neutral-800 rounded-lg h-30v w-75v text-white outline-none" id="CodeArea"/>
		<button class="m-auto bg-green-400 text-white px-5 py-2 text-3xl rounded-lg" v-on:click="Out">run</button>
		<div class="m-auto flex flex-col space-y-2 text-slate-500" v-show="ShowOutput">
			<p>Output:</p>
			<p class="p-5 border" id="output">{{output}}</p>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			"ShowOutput": false,
			"reserved": ["store","in","repeat","times","if","else","then","say"],
			"logicc": [">","<","="],
			"variables": {},
			"dothen": true,
			"output": "",
			"looped": [],
		}
	},
	methods: {
		Out: async function() {
			this.output = "";
			let code = document.getElementById("CodeArea").value;
			let arraycode = code.match(/(".*?"|[^"\s]+)+(?=\s*|\s*$)/g);
			for (let i = 0; i < arraycode.length; i++) {
				if ("store" === arraycode[i] && this.dothen == true) {
					if (arraycode[i+2] == "in") {
						this.variables[arraycode[i+3]] = arraycode[i+1];
					}
				} else if (("if" == arraycode[i] && "then" == arraycode[i+4]) && this.dothen == true) {
					if (">" == arraycode[i+2]) {
						if (parseInt(arraycode[i+1]) > parseInt(arraycode[i+3])) {
						this.dothen = true
						} else {
							this.dothen = false
						}
					} else if ("<" == arraycode[i+2]) {
						if (parseInt(arraycode[i+1]) < parseInt(arraycode[i+3])) {
							this.dothen = true
						} else {
							this.dothen = false
						}
					} else if ("=" == arraycode[i+2]) {
						if (parseInt(arraycode[i+1]) == parseInt(arraycode[i+3])) {
							this.dothen = true
						} else {
							this.dothen = false
						}
					}
				} else if ("else" == arraycode[i]) {
					this.dothen = true;
				} else if ("say" == arraycode[i] && this.dothen == true) {
					if (Object.keys(this.variables).includes(arraycode[i+1])) {
						this.output = this.variables[arraycode[i+1]]
					} else {
						this.output = arraycode[i+1];
					}
				} else if ("repeat" == arraycode[i] && "times" == arraycode[i+3]) {
					for(let i = 0; i < parseInt(arraycode[i+2]); i++) {
						this.looped.push(arraycode[i+1]);
					}
				}
			} 
			console.log(this.variables)
			this.ShowOutput = true;
			this.dothen = true;
		}
	}
}
</script>

<style>
</style>
