<template>
  <div class="form-control mb-4">
    <label class="input-group input-group-vertical">
      <span class="capitalize">{{ label }}</span>
      <select class="select select-bordered w-full" v-model="fieldValue">
        <option selected disabled value="null">{{ $t("select") }}</option>
        <option v-for="(item, i) in list" :key="i" :value="item.id">
          {{ item.name }}
        </option>
      </select>
    </label>
  </div>
</template>

<script setup>
import { db } from "@/plugins/firebase.js";
import { doc, getDoc } from "firebase/firestore";
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const props = defineProps({
  label: {
    type: String,
    default: null,
  },
  moduleName: {
    type: String,
    default: null,
  },
  storeKey: {
    type: String,
    default: null,
  },
  listKey: {
    type: String,
    default: null,
  },
  type: {
    type: String,
    default: "text",
  },
  global: {
    type: Boolean,
    default: false,
  },
  reference: {
    type: Boolean,
    default: false,
  },
});

const fieldValue = computed({
  // getter
  get() {
    const fields = store.getters[`${props.moduleName}/fields`];
    return fields[props.storeKey];
  },
  // setter
  async set(val) {
    let docSnap = val;

    if (props.reference) {
      docSnap = doc(db, `${props.listKey}/ ${val}`);
    }
    store.commit(`${props.moduleName}/setFieldValue`, {
      key: props.storeKey,
      value: docSnap,
    });
  },
});

const list = computed(() => {
  if (props.global) {
    const data = store.getters["global/cols"];
    return data[props.listKey];
  } else {
    return store.getters[`${props.moduleName}/${props.listKey}`];
  }
});
</script>

<style lang="scss" scoped>
</style>