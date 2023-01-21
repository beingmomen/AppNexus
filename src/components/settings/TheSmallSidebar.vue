<template>
  <ul
    class="menu h-screen bg-base-100 p-2 rounded-box fixed md:static hidden md:flex"
  >
    <li class="logo mb-2 mx-auto">
      <router-link to="/" class="w-12 p-0 hover:bg-inherit">
        <img src="@/assets/images/logo.png" />
      </router-link>
    </li>
    <li v-for="{ name, route, icon } in routes" :key="name">
      <router-link :to="route">
        <fa-icon :icon="['fas', icon]" class="fa-xl" />
      </router-link>
    </li>
  </ul>
</template>

<script setup>
const props = defineProps({
  routes: Array,
});
</script>

<style lang="scss" scoped></style>
