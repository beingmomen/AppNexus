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
          <label
            :for="id"
            class="btn gap-2"
            :class="{ loading: loading }"
            @click="$emit('ok')"
          >
            <span v-if="progress">
              {{ Math.ceil(progress) + "" + "%" || null }}
              {{ $t("loading") }}
            </span>
            <span v-else>
              {{ ok }}
            </span>
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
  progress: {
    type: Number,
    default: null,
  },
  loading: {
    type: Boolean,
    default: false,
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
