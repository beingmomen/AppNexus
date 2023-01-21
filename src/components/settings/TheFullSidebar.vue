<template>
  <ul
    class="menu h-screen bg-base-100 rounded-box fixed md:static p-2 w-80 text-base-content"
  >
    <li class="logo mb-2 mx-[5.500px]">
      <router-link to="/" class="text-xl font-bold hover:bg-inherit p-0">
        <div class="w-12">
          <img src="@/assets/images/logo.png" />
        </div>
        <span> AppNexus </span>
      </router-link>
    </li>
    <li v-for="{ name, route, icon } in routes" :key="name">
      <router-link :to="route">
        <fa-icon :icon="['fas', icon]" class="fa-xl" />
        <span class="mx-2 capitalize"> {{ name }} </span>
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
