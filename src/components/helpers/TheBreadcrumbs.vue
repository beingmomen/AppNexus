<template>
  <div class="">
    <div
      class="container flex items-center px-6 py-4 mx-auto overflow-x-auto whitespace-nowrap"
    >
      <a href="#" class="text-gray-600 dark:text-gray-200">
        <fa-icon :icon="['fas', 'home']" />
      </a>

      <span class="mx-5 text-gray-500 dark:text-gray-300 rtl:-scale-x-100">
        <fa-icon :icon="['fas', 'chevron-right']" class="fa-xs" />
      </span>

      <a
        href="#"
        class="flex items-center text-gray-600 -px-2 dark:text-gray-200 hover:underline"
      >
        <fa-icon :icon="['fas', 'list']" />

        <span class="mx-2">Categories</span>
      </a>

      <span class="mx-5 text-gray-500 dark:text-gray-300 rtl:-scale-x-100">
        <fa-icon :icon="['fas', 'chevron-right']" class="fa-xs" />
      </span>

      <a
        href="#"
        class="flex items-center text-gray-600 -px-2 dark:text-gray-200 hover:underline"
      >
        <fa-icon :icon="['fas', 'folder-plus']" />

        <span class="mx-2">Create</span>
      </a>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
