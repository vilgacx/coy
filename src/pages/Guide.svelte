<main class="body m-auto">
  <div class="instruct-body">
    <div class="instruct">
      <table>
        <tr class="text-green-500">
          <th>syntax</th>
          <th>example</th>
        </tr>
        <tr>
          <td>store [VALUE] in [VARIABLE NAME]</td>
          <td><span>store 10 in x</span> <b>or</b> <span>store t in y</span> <b>(t is another variable)</b> <b>or</b> store (10 + 20) in z</td>
        </tr>
        <tr>
          <td>say [VARIABLE/VALUE]</td>
          <td><span>say "hello world"</span> <b>or</b> <span>say x</span> <b>(x is a variable)</b></td>
        </tr> 
        <tr>
          <td>if [LOGIC] then [EXECUTABLE]</td>
          <td><span>if 10 > 20 then say 10</span></td>
        </tr>
        <tr>
          <td>repeat ([EXECUTABLE]) [SOME WHOLE VALUE] times</td>
          <td><span>repeat (say "hello world") 5 times</span> <b>or</b> <span>repeat (say "hello world") x times</span> <b>(x is a variable with whole value)</b></td>
        </tr>
        <tr>
          <td>delay [SOME WHOLE VALUE] seconds</td>
          <td><span>delay 5 seconds</span> <b>or</b> <span>delay x seconds</span> <b>(x is a variable with whole value)</b></td>
        </tr>
        <tr>
          <td>clear</td>
          <td><span>clear</span> <b>(will clear the output)</b></td>
        </tr>
      </table>
      <div class="ops">
        <p><b class="text-green-500">Logical operators</b>: <b>&#62;</b> (greater than), <b>&#60;</b> (lesser than), <b>==</b> (equal to), <b>!=</b> (not equal to), <b>&#62;=</b> (greater than or equal to), <b>&#60;=</b> (lesser than or equal to).</p>
        <p><b class="text-green-500">Arithmatic operators</b>: <b>+</b> (addition), <b>-</b> (subtraction), <b>*</b> (multiplication), <b>/</b> (division), <b>**</b> (exponential), <b>%</b> (modulus), <b>(</b> (opening bracket), <b>)</b> (closing bracket).</p>
      </div>
    </div>
  </div>
</main>

<style lang="postcss">
  .instruct-body {@apply m-auto w-full h-full flex flex-col overflow-y-auto py-6 }

  .instruct { @apply m-auto px-4 md:px-8 space-y-6 text-sm md:text-base }

  th, td { @apply p-5 border }

  span { @apply m-auto underline }

  .ops { @apply space-y-4 }
</style>
