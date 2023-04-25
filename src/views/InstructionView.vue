<template>
  <div class="instruct-body">
    <table class="instruct-list">
      <tr>
        <td class="tb-items">-</td>
        <td class="tb-items">say ...</td>
      </tr>
      <tr>
        <td class="tb-items">-</td>
        <td class="tb-items">store ... in ...</td>
      </tr>
      <tr>
        <td class="tb-items">-</td>
        <td class="tb-items">if .. then .. else</td>
      </tr>
      <tr>
        <td class="tb-items">-</td>
        <td class="tb-items">repeat ... ... times</td>
      </tr>
      <tr>
        <td class="tb-items">-</td>
        <td class="tb-items">delay ... seconds</td>
      </tr>
      <tr>
        <td class="tb-items">-</td>
        <td class="tb-items">clear</td>
      </tr>
    </table>
  </div>
</template>

<style>
.instruct-body {
  @apply w-full h-full border-2 p-14;
}

.instruct-list {
  @apply text-white text-xl;
}

.tb-items{
  @apply p-4
}
</style>
