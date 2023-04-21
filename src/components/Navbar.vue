<template>
  <div class="nav-main">
    <div class="nav-item-div"> 
      <router-link to="/"><p class="link">/home</p></router-link>
      <router-link to="/playground" class="link"><p>/playground</p></router-link>
      <router-link to="/instructions" class="link"><p>/instructions</p></router-link>
    </div>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';
</script>

<style scoped>
.nav-main {
  @apply flex flex-col h-fit border-2 border-white py-10;
}

.nav-item-div {
  @apply m-auto flex flex-col space-y-6 text-white text-lg;
}

.link {
  @apply underline underline-offset-4 hover:text-green-500 cursor-pointer;
}
</style>
