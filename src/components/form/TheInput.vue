<template>
  <div class="form-control">
    <label class="input-group">
      <span>{{ label }}</span>
      <input
        v-model="fieldValue"
        :type="type"
        class="input input-bordered w-full"
      />
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