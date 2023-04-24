<template>
  <div class="pg-body">
    <div class="areas">
      <div class="area-nav">
        <div class="heading-div">
          <p class="m-auto">CODE AREA</p>
        </div>
        <div class="btn-div">
          <button class="btn-icon" @click="Out">
            <RunIcon class="icon" />
          </button>
          <button class="btn-icon">
            <StopIcon class="icon" />
          </button>
          <button class="btn-icon">
            <DeleteIcon class="w-12 h-12" />
          </button>
        </div>
      </div>
      <textarea class="code-area" spellcheck="false" v-model="CodeArea"></textarea>
    </div>
    <div class="areas">
      <div class="area-nav">
        <div class="heading-div">
          <p class="m-auto">OUTPUT</p>
        </div>
        <div class="btn-div">
          <button class="btn-icon">
            <DeleteIcon class="w-12 h-12" />
          </button>
        </div>
      </div>
      <div class="output-div">
        <p style="white-space: pre-line">{{ output }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import RunIcon from "../components/RunIcon.vue";
import StopIcon from "../components/StopIcon.vue";
import DeleteIcon from "../components/DeleteIcon.vue";

export default {
  components: { RunIcon, StopIcon, DeleteIcon },
  data() {
    return {
      CodeArea: "",
      ShowOutput: false,
      reserved: ["store", "in", "say", "if", "else", "then", "repeat", "times", "delay", "seconds", "clear"],
      logic: [">", "<", "==", "!=", ">=", "<=",],
      artihmatic: ["+", "-", "*", "/", "**", "//", "(", ")"],
      variables: {},
      dothen: true,
      output: "",
      arraycode: [],
    }
  },
  methods: {
    Out: async function () { 
      this.output = "";    

      this.arraycode = (this.CodeArea).match(/\([^()]*\)|(".*?"|[^"\s]+)+(?=\s*|\s*$)/g);
      for (let i = 0; i < this.arraycode.length; i++) {
        if ("store" === this.arraycode[i] && this.dothen === true) {
          this.StoreFn(this.arraycode, i);
        } else if ("say" === this.arraycode[i] && this.dothen === true) {
          this.SayFn(this.arraycode, i);
        } else if ("if" === this.arraycode[i] && ("then" === this.arraycode[i + 4] || "then" === this.arraycode[i + 5]) && (this.logic).includes(this.arraycode[i + 2]) === true && this.dothen === true) {
          this.IfThenFn(this.arraycode, i);
        } else if ("else" === this.arraycode[i]) {
          this.ElseFn();
        } else if ("repeat" === this.arraycode[i] && (this.arraycode[i + 1].startsWith("(") === true && this.arraycode[i + 1].endsWith(")") === true) && "times" === this.arraycode[i + 3] && this.dothen === true) {
          this.RepeatFn(this.arraycode, i);
        } else if ("delay" === this.arraycode[i] && this.arraycode[i + 2] === "seconds" && this.dothen === true) {
          await (new Promise(res => setTimeout(res, this.DelayFn(this.arraycode, i))));
        } else if ("clear" === this.arraycode[i] && this.dothen === true) {
          this.output = "";
        }
      }

      this.variables = {};
      this.dothen = true;
    },
    NewLine: function () {
      if (this.output !== "") {
        return "\n"
      } else {
        return "";
      }
    },
    StoreFn: function (arraycode, i) {
      if (isNaN(+(arraycode[i + 3])) === false) {
        this.output += `${this.NewLine()}Error at ${i + 3}: numbers cannot be variables`;
      } else if ((this.reserved).includes(arraycode[i + 3]) === true || (this.logic).includes(arraycode[i + 3]) === true || (this.artihmatic).includes(arraycode[i + 3]) === true) {
        this.output += `${this.NewLine()}Error at ${i + 3}: reserved words cannot be variables`;
      } else if (arraycode[i + 3].includes("'") || arraycode[i + 3].includes('"')) {
        this.output += `${this.NewLine()}Error at ${i + 3}: " or ' not allowed`;
      } else if (arraycode[i + 2] !== "in") {
        this.output += `${this.NewLine()}Error at ${i + 2}: syntax error; use "in" properly. for eg: store <SOME VALUE> in <VARIABLE>`;
      } else if (arraycode[i + 1].startsWith("(") === true && arraycode[i + 1].endsWith(")") === true) {
        if ((this.artihmatic).some((item) => ((arraycode[i + 1]).split("")).includes(item)) === true) {
          try {
            const vals = this.variables;
            for (const key in vals) {
              eval(`const ${key} = vals[key];`);
            }
            this.variables[arraycode[i + 3]] = eval(arraycode[i + 1]);
          } catch (e) {
            this.output += `${this.NewLine()}Error at ${i + 1}: expression not valid`;
          }
        } else {
          this.output += `${this.NewLine()}Error at ${i + 1}: expression not valid`;
        }
      } else if (isNaN(+(arraycode[i + 1])) === true && ((arraycode[i + 1]).startsWith('"') === false && (arraycode[i + 1]).endsWith('"') === false)) {
        this.output += `${this.NewLine()}Error at ${i + 1}: encapsulate text in double-quotes. for eg: "Text"`;
      } else {
        this.variables[arraycode[i + 3]] = arraycode[i + 1];
      }
    },
    SayFn: function (arraycode, i) {
      if (Object.keys(this.variables).includes(arraycode[i + 1]) === true) {
        const val = this.variables[arraycode[i + 1]];
        if (isNaN(val) === true) {
          this.output += `${this.NewLine()}` + val.slice(1, val.length - 1);
        } else {
          this.output += `${this.NewLine()}` + val;
        }
      } else if (arraycode[i + 1].startsWith("(") === true && arraycode[i + 1].endsWith(")") === true) {
        if ((this.artihmatic).some((item) => ((arraycode[i + 1]).split("")).includes(item)) === true) {
          try {
            const vals = this.variables;
            for (const key in vals) {
              eval(`const ${key} = vals[key];`);
            }
            this.output += `${this.NewLine()}` + eval(arraycode[i + 1]);
          } catch (e) {
            this.output += `${this.NewLine()}Error at ${i + 1}: expression not valid`;
          }
        } else {
          this.output += `${this.NewLine()}Error at ${i + 1}: expression not valid`;
        }
      } else if (isNaN(+(arraycode[i + 1])) === true && ((arraycode[i + 1]).startsWith('"') === false && (arraycode[i + 1]).endsWith('"') === false)) {
        this.output += `${this.NewLine()}Error at ${i + 1}: encapsulate text in double-quotes. for eg: "Text"`;
      } else if (isNaN(+arraycode[i + 1]) === false) {
        this.output += `${this.NewLine()}` + arraycode[i + 1];
      } else {
        this.output += `${this.NewLine()}` + (arraycode[i + 1]).slice(1, (arraycode[i + 1]).length - 1);
      }
    },
    IfThenFn: function (arraycode, i) {
      const vararray = (Object.keys(this.variables));
      let elements = [];

      if (vararray.includes(arraycode[i + 1])) {
        elements.push(this.variables[arraycode[i + 1]]);
      } else if (arraycode[i + 1].startsWith("(") === true && arraycode[i + 1].endsWith(")") === true) {
        if ((this.artihmatic).some((item) => ((arraycode[i + 1]).split("")).includes(item)) === true) {
          try {
            const vals = this.variables;
            for (const key in vals) {
              eval(`const ${key} = vals[key];`);
            }
            elements.push(eval(arraycode[i + 1]));
          } catch (e) {
            this.output = `${this.NewLine()}Error at ${i + 1}: expression not valid`;
          }
        } else {
          this.output = `${this.NewLine()}Error at ${i + 1}: expression not valid`;
        }
      } else {
        elements.push(arraycode[i + 1]);
      }

      if (vararray.includes(arraycode[i + 3])) {
        elements.push(this.variables[arraycode[i + 3]]);
      } else if (arraycode[i + 3].startsWith("(") === true && arraycode[i + 3].endsWith(")") === true) {
        if ((this.artihmatic).some((item) => ((arraycode[i + 3]).split("")).includes(item)) === true) {
          try {
            const vals = this.variables;
            for (const key in vals) {
              eval(`const ${key} = vals[key];`);
            }
            elements.push(eval(arraycode[i + 3]));
          } catch (e) {
            this.output += `${this.NewLine()}Error at ${i + 1}: expression not valid`;
          }
        } else {
          this.output += `${this.NewLine()}Error at ${i + 1}: expression not valid`;
        }
      } else {
        elements.push(arraycode[i + 3]);
      }

      this.dothen = eval(`${elements[0]} ${arraycode[i + 2]} ${elements[1]}`);
    },
    ElseFn: function () {
      this.dothen = true;
    },
    RepeatFn: function (arraycode, i) {
      const looparray = [];
      for (let j = 0; j < parseInt(arraycode[i + 2]); j++) {
        const val = arraycode[i + 1].slice(1, arraycode[i + 1].length - 1);
        const loopcode = val.match(/\([^()]*\)|(".*?"|[^"\s]+)+(?=\s*|\s*$)/g)
        looparray.push(...loopcode);
      }
      this.arraycode = ((arraycode.slice(0, i + 5)).concat(looparray)).concat(arraycode.slice(i + 5, arraycode.length));
    },
    SleepFn: function (ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },

    DelayFn: function (arraycode, i) {
      let delaytime = 0;
      if (Object.keys(this.variables).includes(arraycode[i + 1]) === true) {
        const val = this.variables[arraycode[i + 1]];
        if (isNaN(val) === true) {
          this.output += `${this.NewLine()}Error at ${i + 1}: variable is text required number or decimals`;
        } else {
          delaytime = parseFloat(val);
        }
      } else if (arraycode[i + 1].startsWith("(") === true && arraycode[i + 1].endsWith(")") === true) {
        if ((this.artihmatic).some((item) => ((arraycode[i + 1]).split("")).includes(item)) === true) {
          try {
            const vals = this.variables;
            for (const key in vals) {
              eval(`const ${key} = vals[key];`);
            }
            delaytime = eval(arraycode[i + 1]);
          } catch (e) {
            this.output += `${this.NewLine()}Error at ${i + 1}: expression not valid`;
          }
        } else {
          this.output += `${this.NewLine()}Error at ${i + 1}: expression not valid`;
        }
      } else if (isNaN(arraycode[i + 1]) === true) {
        this.output += `${this.NewLine()} Error at ${i + 1}: seconds should be in numbers or decimals`;
      } else if (isNaN(arraycode[i + 1]) === false) {
        delaytime = arraycode[i + 1];
      }
      return parseFloat(delaytime) * 1000;
    }
  }
}
</script>

<style scoped>
.pg-body {
  @apply w-full grid grid-cols-2 gap-10;
}

.areas {
  @apply flex flex-col w-full border-2 border-white;
}

.area-nav {
  @apply h-8v w-full bg-white flex text-center text-4xl font-bold justify-between px-6;
}

.heading-div {
  @apply h-full flex flex-col;
}

.code-area {
  @apply h-full w-full outline-none bg-black text-white px-8 py-6 text-2xl;
}

.output-div {
  @apply h-80v w-full text-white px-8 py-6 text-2xl overflow-auto;
}

.btn-div {
  @apply h-full flex space-x-6;
}

.btn-icon {
  @apply m-auto outline-none;
}

.icon {
  @apply w-14 h-14
}
</style>
