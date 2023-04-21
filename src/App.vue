<template>
  <div class="body">
    <Navbar class="w-52" />
    <RouterView class="flex-grow" />
  </div>
</template>

<script>
import { RouterView } from 'vue-router';
import Navbar from "./components/Navbar.vue";
export default {
  components: { Navbar }
}
</script>

<style scoped>
.body {
  @apply flex bg-black h-100v w-full p-14 font-mono gap-10;
}
</style>
