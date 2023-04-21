<template>
  <div class="home-body">
    <div class="content-div">
      <p class="title">COY</p>
      <p class="sub">A minimal programming langauage simpler than python & lua.</p>
      <div class="home-links-div">
        <router-link to="/playground"><p class="home-link">playground</p></router-link>
        <router-link to="/instructions"><p class="home-link">how to use it?</p></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';
</script>

<style>
.home-body {
  @apply flex flex-col w-full h-full border-2;
}

.content-div {
  @apply m-auto flex-col text-center space-y-12 p-16;
}

.title {
  @apply m-auto text-green-500 text-7xl;
}

.sub {
  @apply m-auto italic text-xl text-white;
}

.home-links-div {
  @apply m-auto flex text-white w-fit space-x-10 text-lg;
}

.home-link {
  @apply hover:text-green-500 cursor-pointer underline underline-offset-4;
}
</style>
