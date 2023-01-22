<template>
  <div class="form-control mb-4">
    <label class="input-group input-group-vertical">
      <span class="capitalize">{{ label }}</span>
      <select class="select select-bordered w-full">
        <option disabled selected>Who shot first?</option>
        <option>Han Solo</option>
        <option>Greedo</option>
      </select>
    </label>
  </div>
</template>

<script setup>
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
  type: {
    type: String,
    default: "text",
  },
});

const fieldValue = computed({
  // getter
  get() {
    const fields = store.getters[`${props.moduleName}/fields`];
    return fields[props.storeKey];
  },
  // setter
  set(val) {
    store.commit(`${props.moduleName}/setFieldValue`, {
      key: props.storeKey,
      value: val,
    });
  },
});
</script>

<style lang="scss" scoped>
</style>