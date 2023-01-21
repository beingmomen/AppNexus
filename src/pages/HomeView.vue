<template>
  {{ $t("welcome") }}

  <button class="btn" @click="click">click</button>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useToast } from "vue-toastification";

// import { collection, doc } from "firebase/firestore";

const toast = useToast();
const click = () => {
  toast.success("good");
};

onMounted(() => {});
</script>
