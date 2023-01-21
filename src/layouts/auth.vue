<template>
  <router-view></router-view>
</template>
  
  <script setup>
import useThemes from "../hooks/useThemes.js";
const { setTheme } = useThemes();
</script>
  
  <style lang="scss" scoped>
</style>