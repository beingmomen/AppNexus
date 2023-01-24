<template>
  <div class="form-control mb-4">
    <label class="input-group input-group-vertical relative">
      <span class="capitalize w-full h-10 pr-0 justify-between">
        {{ label }}
      </span>
      <div
        v-if="fieldValue"
        v-show="image"
        class="avatar absolute right-0 bottom-0"
      >
        <div
          v-for="(img, i) in fieldValue"
          :key="i"
          class="w-10 ml-2 rounded-[50%]"
        >
          <img loading="lazy" class="rounded-img" :src="img" />
        </div>
      </div>
      <div v-else v-show="image" class="avatar absolute right-0 bottom-0">
        <div
          v-for="img in filesSrc"
          :key="img.name"
          class="w-10 ml-2 rounded-[50%]"
        >
          <img loading="lazy" class="rounded-img" :src="img.src" />
        </div>
      </div>
      <div v-if="!filesSrc" class="avatar absolute right-0 bottom-0">
        <div class="w-10 ml-2 rounded-[50%]">
          <img
            loading="lazy"
            class="rounded-img"
            src="/src/assets/images/logo.png"
          />
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
import {
  storage,
  uploadBytesResumable,
  getDownloadURL,
  storageRef,
} from "@/plugins/firebase.js";
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
  fetchImgsUrl(filesArray);
  filesSrc.value = arr;
  // fieldValue.value = filesArray;
};

const fetchImgsUrl = async (files) => {
  store.commit(`${props.moduleName}/setTableValue`, {
    key: "loading",
    value: true,
  });
  let completedUploads = 0;

  const promises = [];

  files.forEach((file) => {
    // Create a reference to the location in Firebase Storage where the file will be uploaded
    const storageReference = storageRef(storage, props.storagePath + file.name);
    // Upload the file and metadata
    const uploadTask = uploadBytesResumable(storageReference, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.warn("Upload is " + progress + "% done");
        console.warn("snapshot.state ", snapshot.state);
        switch (snapshot.state) {
          case "paused":
            // console.warn("Upload is paused");
            break;
          case "running":
            // console.warn("Upload is running");
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
          completedUploads++;
          promises.push(downloadURL);
          if (completedUploads === files.length) {
            console.log("All uploads have been completed!");
            store.commit(`${props.moduleName}/setTableValue`, {
              key: "loading",
              value: false,
            });
            store.commit(`${props.moduleName}/setTableValue`, {
              key: "progress",
              value: 0,
            });
          }
        });
      }
    );

    fieldValue.value = promises;
  });
};
</script>

<style lang="scss" scoped>
.rounded-img {
  border-radius: 50% !important;
}
</style>