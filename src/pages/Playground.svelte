<script lang="ts">
  let code: String = "";
  let output: String = "";
  let dothen: boolean = true;
  let variables = {};
  let reserved: Array<string> = ["store","in","say","if","then","repeat","times","delay","seconds","clear"];
  let logic: Array<string> = [">", "<", "==", "!=", ">=", "<="];
  let arithmatic: Array<string> = ["+", "-", "*", "/", "**", "%", "(", ")"];
  let all: Array<string> = [...reserved, ...logic, ...arithmatic];
  let CodeArray: Array<string> = [];

  async function Output() {
    output = "";
    CodeArray = code.match(/\([^()]*\)|(".*?"|[^"\s]+)+(?=\s*|\s*$)/g);
    for (let i = 0; i < CodeArray.length; i++) {
      if ("store" === CodeArray[i]) {
        if (CodeArray[i-1] === "then") {
          if (dothen === true) {
            StoreFn([CodeArray[i + 1], CodeArray[i + 2], CodeArray[i + 3]], i+1);
          }
        } else {
          StoreFn([CodeArray[i + 1], CodeArray[i + 2], CodeArray[i + 3]], i+1);
        }
      } else if ("say" === CodeArray[i]) {
        if (CodeArray[i-1] === "then") {
          if (dothen === true) {
            SayFn([CodeArray[i + 1]], i+1);
          } 
        } else {
          SayFn([CodeArray[i + 1]], i+1);
        }
      } else if ("if" === CodeArray[i] && ("then" === CodeArray[i + 4] || "then" === CodeArray[i + 5]) && (logic).includes(CodeArray[i + 2]) === true && dothen === true) {
        if (CodeArray[i-1] === "then") {
          if (dothen === true) {
            IfThenFn([CodeArray[i+1], CodeArray[i+2], CodeArray[i+3]], i+1);
          }
        } else {
          IfThenFn([CodeArray[i+1], CodeArray[i+2], CodeArray[i+3]], i+1);
        }
      } else if ("repeat" === CodeArray[i] && (EvalCheck(CodeArray[i+1]) === true) && "times" === CodeArray[i+3]) {
        if (CodeArray[i-1] === "then") {
          if (dothen === true) {
            RepeatFn(CodeArray, i);
          }
        } else {
          RepeatFn(CodeArray, i);
        } 
      } else if ("delay" === CodeArray[i] && CodeArray[i + 2] === "seconds") {
        const delayfn = async () => { await (new Promise(res => setTimeout(res,DelayFn([CodeArray[i+1]], i)))) };
        if (CodeArray[i-1] === "then") {
          if (dothen === true) {
            await delayfn();
          }
        } else {
          await delayfn();
        }
      } else if ("clear" === CodeArray[i]) {
        if (CodeArray[i-1] === "then") {
          if (dothen === true) {
            output = "";
          }
        } else {
          output = "";
        }
      }
    }
    variables = {};
    dothen = true;
  }

  //newline check
  function NewLine() {
    if (output !== "") {
      return "\n";
    } else {
      return "";
    }
  }

  //arithmatic evaluation
  function Evaluate(code: string, index: number, fn: any) {
    if (arithmatic.some((item: string) => code.split("").includes(item)) === true) {
      try {
        const vals = variables;
        for (const key in vals) {
          return eval(`const ${key} = vals[key];`);
        }
        fn();
      } catch (e) {
        output += `${NewLine()}Error at ${index + 1}: expression not valid`;
      }
    } else {
      output += `${NewLine()}Error at ${index + 1}: expression not valid`;
    }
  }

  //common check
  const EvalCheck = (code: string) => { return code.startsWith("(") === true && code.endsWith(")") === true };
  const EncapCheck = (code: string) => { return isNaN(+code) === true && code.startsWith('"') === false && code.endsWith('"') === false };

  //common output
  const EncapOut = (index: number) => {output += `${NewLine()}Error at ${index + 1}: encapsulate text in double-quotes. for eg: "Text"`};

  //store function
  function StoreFn(codearray: Array<string>, index: number) {
    if (EncapCheck(codearray[0]) === true) {
      EncapOut(index);
    } else if (codearray[1] !== "in") {
      output += `${NewLine()}Error at ${index}: syntax error; use "in" properly. for eg: store <SOME VALUE> in <VARIABLE>`;
    } else if (isNaN(+codearray[2]) === false) {
      output += `${NewLine()}Error at ${index + 3}: numbers cannot be variables`;
    } else if (all.includes(codearray[2]) === true) {
      output += `${NewLine()}Error at ${index + 3}: reserved words cannot be variables`;
    } else if (codearray[2].includes("'") || code[2].includes('"')) {
      output += `${NewLine()}Error at ${index + 3}: " or ' are not allowed`;
    } else if (EvalCheck(codearray[0]) === true) {
      Evaluate(codearray[0],index,() => {variables[codearray[2]] = eval(codearray[0])});
    } else {
      variables[codearray[2]] = codearray[0];
    }
  }

  //say function
  function SayFn(codearray: Array<string>, index: number) {
    if (Object.keys(variables).includes(codearray[0]) === true) {
      const val = variables[codearray[0]];
      if (isNaN(val) === true) {
        output += `${NewLine()}` + val.slice(1, val.length - 1);
      } else {
        output += `${NewLine()}` + val;
      }
    } else if (EvalCheck(codearray[0]) === true) {
      Evaluate(codearray[0],index,() => {output += `${NewLine()}` + eval(codearray[0])});
    } else if (EncapCheck(codearray[0]) === true) {
      EncapOut(index);
    } else if (isNaN(+codearray[0]) === false) {
      output += `${NewLine()}` + codearray[0];
    } else {
      output += `${NewLine()}` + codearray[0].slice(1, codearray[0].length - 1);
    }
  }

  //if then function
  function IfThenFn(codearray: Array<string>, index: number) {
    const vararray = (Object.keys(variables));
    let elements = [];
    if (vararray.includes(codearray[0])) {
      elements.push(variables[codearray[0]]);
    } else if (EvalCheck(codearray[0])) {
      Evaluate(codearray[0],index,() => {elements.push(eval(codearray[0]))});
    } else {
      elements.push(codearray[0]);
    }

    if (vararray.includes(codearray[2])) {
      elements.push(variables[codearray[2]]);
    } else if (EvalCheck(codearray[2])) {
      Evaluate(codearray[2],index,() => {elements.push(eval(codearray[2]))});
    } else {
      elements.push(codearray[2]);
    }
    dothen = eval(`${elements[0]} ${codearray[1]} ${elements[1]}`);
  } 

  //loop
  function RepeatFn(codearray: Array<string>, index: number) {
    const looparray = [];
    for (let j = 0; j < parseInt(codearray[index+2]); j++) {
      const val = codearray[index+1].slice(1, codearray[index+1].length - 1);
      const loopcode = val.match(/\([^()]*\)|(".*?"|[^"\s]+)+(?=\s*|\s*$)/g)
      looparray.push(...loopcode);
    }
    CodeArray = ((codearray.slice(0, index+4)).concat(looparray)).concat(codearray.slice(index+4, codearray.length));
  }

  //delay
  function DelayFn (codearray: Array<string>, index: number) {
    let delaytime: number = 0;
    if (Object.keys(variables).includes(CodeArray[0]) === true) {
      const val = variables[codearray[0]];
      if (isNaN(val) === true) {
        this.output += `${NewLine()}Error at ${index}: variable is text required number or decimals`;
      } else {
        delaytime = parseFloat(val);
      }
    } else if (EvalCheck(codearray[0]) === true) {
      Evaluate(codearray[0],index,() => {delaytime = eval(codearray[0])});
    } else if (isNaN(+codearray[0]) === true) {
      output += `${NewLine()} Error at ${index}: seconds should be in numbers or decimals`;
    } else if (isNaN(+codearray[0]) === false) {
      delaytime = Number(codearray[0]);
    }
    return parseFloat(delaytime) * 1000;
  }

</script>

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
    <textarea class="code-area" spellcheck="false" bind:value={code} />
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
      <p style="white-space: pre-line">{output}</p>
    </div>
  </div>
</main>

<style lang="postcss">
  .play-body {
  @apply p-8 md:p-12 grid grid-rows-2 lg:grid-cols-2 lg:grid-rows-none bg-green-400 gap-8;
  }

  .ground {
  @apply flex flex-col w-full h-full border-2 border-black bg-white rounded-md;
  }

  .ground-nav {
  @apply flex justify-between p-2.5 border-b-2 border-black;
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
