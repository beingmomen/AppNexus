<template>
  <div class="navbar bg-base-100 mx-auto mt-2 w-[98%]">
    <div class="flex-1">
      <div class="flex-none">
        <slot name="menu" />
      </div>
    </div>
    <div class="flex-none gap-2">
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost m-1 capitalize">
          <fa-icon :icon="['fas', 'palette']" class="fa-xl" />

          <svg
            class="fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
            />
          </svg>
        </label>

        <ul
          tabindex="0"
          class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-48"
        >
          <li
            v-for="(theme, i) in themes"
            :key="i"
            class="
              mb-1
              cursor-pointer
              rounded-md
              border
              flex flex-row
              justify-between
            "
            :data-theme="theme.key"
            @click="setTheme(theme.key)"
          >
            <a class="hover:bg-inherit capitalize">{{ theme.name }}</a>
            <div class="avatar-group hover:bg-inherit p-0 -space-x-6">
              <div class="avatar border-3">
                <div class="w-4 bg-primary"></div>
              </div>
              <div class="avatar border-3">
                <div class="w-4 bg-secondary"></div>
              </div>
              <div class="avatar border-3">
                <div class="w-4 bg-success"></div>
              </div>
              <div class="avatar border-3">
                <div class="w-4 bg-error"></div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost m-1">
          <svg
            class="inline-block h-4 w-4 fill-current md:h-5 md:w-5"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 512 512"
          >
            <path
              d="M363,176,246,464h47.24l24.49-58h90.54l24.49,58H480ZM336.31,362,363,279.85,389.69,362Z"
            ></path>
            <path
              d="M272,320c-.25-.19-20.59-15.77-45.42-42.67,39.58-53.64,62-114.61,71.15-143.33H352V90H214V48H170V90H32v44H251.25c-9.52,26.95-27.05,69.5-53.79,108.36-32.68-43.44-47.14-75.88-47.33-76.22L143,152l-38,22,6.87,13.86c.89,1.56,17.19,37.9,54.71,86.57.92,1.21,1.85,2.39,2.78,3.57-49.72,56.86-89.15,79.09-89.66,79.47L64,368l23,36,19.3-11.47c2.2-1.67,41.33-24,92-80.78,24.52,26.28,43.22,40.83,44.3,41.67L255,362Z"
            ></path>
          </svg>

          <svg
            class="fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
            />
          </svg>
        </label>

        <ul
          tabindex="0"
          class="
            dropdown-content
            menu
            p-2
            shadow-lg
            bg-base-100
            rounded-box
            w-48
          "
        >
          <li
            v-for="(lang, i) in languages"
            :key="i"
            class="
              mb-1
              cursor-pointer
              rounded-md
              h-9
              bg-inherit
              flex flex-row
              justify-between
              text-inherit
            "
            data-theme="light"
            @click="changeLang(lang.key)"
          >
            <button
              class="flex w-full h-full"
              :class="{ active: currentLang == lang.key }"
            >
              <img
                loading="lazy"
                width="20"
                height="20"
                :src="`https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.0/svg/${lang.svg}`"
                alt="English"
              />
              <span class="flex flex-1 justify-between capitalize">{{
                lang.name
              }}</span>
            </button>
          </li>
        </ul>
      </div>
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img src="https://placeimg.com/80/80/people" />
          </div>
        </label>
        <ul
          tabindex="0"
          class="
            mt-3
            p-2
            shadow
            menu menu-compact
            dropdown-content
            bg-base-100
            rounded-box
            w-52
          "
        >
          <!-- <li>
            <a class="justify-between">
              Profile
              <span class="badge">New</span>
            </a>
          </li>
          <li><a>Settings</a></li> -->
          <li @click="logout"><a>Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import useThemes from "../../hooks/useThemes.js";
import useI18n from "../../hooks/useI18n.js";
import { useStore } from "vuex";
const { setTheme, themes } = useThemes();
const { changeLang, currentLang, languages } = useI18n();
const store = useStore();

const logout = () => {
  store.dispatch("auth/logout");
};
</script>

<style lang="scss" scoped>
</style>