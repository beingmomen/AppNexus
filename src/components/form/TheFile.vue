<template>
  <div class="form-control mb-4">
    <label class="input-group input-group-vertical relative">
      <span class="capitalize w-full h-10 pr-0 justify-between">
        {{ label }}
      </span>
      <div v-show="image" class="avatar absolute right-0 bottom-0">
        <div class="w-10 rounded-[50%]">
          <img
            class="rounded-img"
            :src="src || '/src/assets/images/logo.png'"
          />
        </div>
      </div>
    </label>

    <input
      type="file"
      class="file-input file-input-bordered w-full"
      :placeholder="label"
      ref="fileInput"
      :multiple="multiple"
      :accept="accept"
      @change="file"
    />
  </div>
</template>

<script setup>
import {
  storage,
  uploadBytesResumable,
  getDownloadURL,
  storageRef,
} from "@/plugins/firebase.js";
import { ref, computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const fileInput = ref(null);
const src = ref("");
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
    default: false,
  },
  storagePath: {
    type: String,
    default: null,
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
  store.commit(`${props.moduleName}/setTableValue`, {
    key: "loading",
    value: true,
  });
  let file = await fileInput.value.files[0];
  fetchImgUrl(file);
  let formData = await new FormData();
  await formData.append("file", file);

  const reader = await new FileReader();
  reader.onload = async (e) => {
    src.value = await e.target.result;
  };
  await reader.readAsDataURL(file);
  // fieldValue.value = await file;
};

const fetchImgUrl = async (file) => {
  const storageReference = storageRef(storage, props.storagePath + file.name);
  const uploadTask = uploadBytesResumable(storageReference, file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.warn("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.warn("Upload is paused");
          break;
        case "running":
          store.commit(`${props.moduleName}/setTableValue`, {
            key: "progress",
            value: progress,
          });
          break;
      }
    },
    (error) => {
      console.warn("error", error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        // console.warn("File available at", downloadURL);
        fieldValue.value = downloadURL;
        store.commit(`${props.moduleName}/setTableValue`, {
          key: "loading",
          value: false,
        });
        store.commit(`${props.moduleName}/setTableValue`, {
          key: "progress",
          value: 0,
        });
      });
    }
  );
};
</script>

<style lang="scss" scoped>
.rounded-img {
  border-radius: 50% !important;
}
</style>