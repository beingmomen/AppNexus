<template>
  <!-- Put this part before </body> tag -->
  <Teleport to="body">
    <input type="checkbox" :id="id" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box" :class="width">
        <label
          :for="id"
          class="btn btn-sm btn-circle absolute right-2 top-2"
          @click="$emit('closeModal')"
        >
          ✕
        </label>
        <h3 class="font-bold text-lg mb-5 capitalize">{{ title }}</h3>
        <slot name="content" />
        <div class="modal-action">
          <label :for="id" class="btn gap-2" @click="$emit('ok')">
            {{ ok }}
          </label>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  id: {
    type: String,
    default: null,
  },
  title: {
    type: String,
    default: null,
  },
  width: {
    type: String,
    default: null,
  },
  ok: {
    type: String,
    default: null,
  },
});
const emit = defineEmits(["ok", "closeModal"]);
</script>

<style lang="scss" scoped></style>
