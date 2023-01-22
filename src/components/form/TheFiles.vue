<template>
  <div class="form-control mb-4">
    <label class="input-group input-group-vertical relative">
      <span class="capitalize w-full h-10 pr-0 justify-between">
        {{ label }}
      </span>
      <div v-show="image" class="avatar absolute right-0 bottom-0">
        <div
          v-for="img in filesSrc"
          :key="img.name"
          class="w-10 ml-2 rounded-[50%]"
        >
          <img class="rounded-img" :src="img.src" />
        </div>
      </div>
      <div v-if="!filesSrc" class="avatar absolute right-0 bottom-0">
        <div class="w-10 ml-2 rounded-[50%]">
          <img class="rounded-img" src="/src/assets/images/logo.png" />
        </div>
      </div>
    </label>

    <input
      type="file"
      class="file-input file-input-bordered w-full"
      :placeholder="label"
      ref="filesInput"
      :multiple="multiple"
      :accept="accept"
      @change="file"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const filesInput = ref(null);
const filesSrc = ref();
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
  accept: {
    type: String,
    default: "image/*",
  },
  image: {
    type: Boolean,
    default: true,
  },
  multiple: {
    type: Boolean,
    default: true,
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
    console.warn("val", val);
    store.commit(`${props.moduleName}/setFieldValue`, {
      key: props.storeKey,
      value: val,
    });
  },
});

const file = async () => {
  let files = await filesInput.value.files;
  let filesArray = [];
  const arr = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    filesArray.push(file);
    if (!file || !file.type.match("image.*")) {
      continue;
    }

    // Store the file in the uploadedFiles array
    arr.push({
      name: file.name,
      src: URL.createObjectURL(file),
    });
  }
  filesSrc.value = arr;
  fieldValue.value = filesArray;
};
</script>

<style lang="scss" scoped>
.rounded-img {
  border-radius: 50% !important;
}
</style>