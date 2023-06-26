<template>
  <div class="instruct-body">
    <table class="instruct-list">
      <tr>
        <td class="tb-items">- say ...</td>
        <td>"say" is used to display output on the screen. You can use it to print text, numbers, and value of variables.</td>
        <td>"for e.g.: say "Hello World"</td>
      </tr>
      <tr>
        <td class="tb-items">- store ... in ...</td>
        <td></td>
      </tr>
      <tr>
        <td class="tb-items">- if .. then .. else</td>
        <td></td>
      </tr>
      <tr>
        <td class="tb-items">- repeat ... ... times</td>
        <td></td>
      </tr>
      <tr>
        <td class="tb-items">- delay ... seconds</td>
        <td></td>
      </tr>
      <tr>
        <td class="tb-items">- clear</td>
        <td></td>
      </tr>
    </table>
  </div>
</template>

<style>
.instruct-body {
  @apply w-full h-full border-2 p-14;
}

.instruct-list {
  @apply text-white text-xl table-fixed w-full;
}
</style>
