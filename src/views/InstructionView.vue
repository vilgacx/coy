<template>
  <div class="instruct-body">
    <table>
      <tr>
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
        <td>if [LOGIC] then [EXECUTABLE] else [EXECUTABLE]</td>
        <td>if 10 > 20 then say 10 else say 20</td>
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
    <p>Logical operators: <b>&#62;</b> (greater than), <b>&#60;</b> (lesser than), <b>==</b> (equal to), <b>!=</b> (not equal to), <b>&#62;=</b> (greater than or equal to), <b>&#60;=</b> (lesser than or equal to).</p>
    <p>Arithmatic operators: <b>+</b> (addition), <b>-</b> (subtraction), <b>*</b> (multiplication), <b>/</b> (division), <b>**</b> (exponential), <b>%</b> (modulus), <b>(</b> (opening bracket), <b>)</b> (closing bracket).</p>
    <p class="text-white"><i>(important note : this documentaion is very rough idea. will be updated soon)</i></p>
  </div>
</template>

<style>
.instruct-body {
  @apply w-full h-full border-2 p-10 text-white overflow-auto space-y-4;
}

th, td{
  @apply p-5 border text-center;
}

span {
  @apply m-auto underline
}
</style>
