<template>
  <div class="drawer drawer-mobile">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div
      class="
        drawer-content
        flex flex-col
        items-center
        justify-start
        shadow-layout
        lg:mx-2
        mx-0
      "
    >
      <Navbar
        class="rounded-box z-30 shadow-[rgba(99,99,99,0.2)_0px_0px_12px_0px]"
      >
        <template #menu>
          <fa-icon
            :icon="['fas', 'bars']"
            class="fa-xl hidden lg:inline-block cursor-pointer"
            @click="toggleFullSidebar"
          />
          <label for="my-drawer-2" class="drawer-button lg:hidden">
            <fa-icon :icon="['fas', 'bars']" class="fa-xl" />
          </label>
        </template>
      </Navbar>
      <section class="sm:container w-full mx-0 sm:mx-auto px-4 pt-2">
        <router-view></router-view>
      </section>
    </div>
    <div class="drawer-side shadow-layout">
      <label for="my-drawer-2" class="drawer-overlay"></label>
      <transition name="fade" mode="out-in">
        <component
          :is="fullSidebar ? FullSidebar : SmallSidebar"
          :routes="routes"
        ></component>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import useToggleSidebar from "../hooks/useToggleSidebar.js";

// Imports Components
import FullSidebar from "../components/settings/TheFullSidebar.vue";
import SmallSidebar from "../components/settings/TheSmallSidebar.vue";
import Navbar from "../components/settings/TheNavbar.vue";

const { t } = useI18n(); // use as global scope
const routes = computed(() => {
  const routes = [
    { name: t("dashboard"), route: "/", icon: "chart-line" },
    { name: t("admins"), route: "/admins", icon: "user" },
    { name: t("categories"), route: "/categories", icon: "list" },
    { name: t("apps"), route: "/apps", icon: "robot" },
    { name: t("auto_update"), route: "/auto-update", icon: "wrench" },
  ];

  return routes;
});

const { fullSidebar, toggleFullSidebar } = useToggleSidebar();
</script>

<style lang="scss" scoped>
@import url("../assets/settings/sidebar.scss");
</style>
