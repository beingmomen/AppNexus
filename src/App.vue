<template>
  <component :is="$route.meta.layout"></component>
</template>

<script setup>
import useAuth from "./hooks/useAuth";
import useAxiosError from "./hooks/useAxiosError";
const { autoLogin } = useAuth();
const { error } = useAxiosError();

autoLogin();
</script>

<style scoped></style>
