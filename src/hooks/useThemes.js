import { ref, onMounted, computed } from "vue";
import { useI18n } from "vue-i18n";

export default () => {
  const { t } = useI18n(); // use as global scope

  const themes = computed(() => {
    return [
      {
        name: t("light"),
        key: "light",
      },
      {
        name: t("dark"),
        key: "dark",
      },
      {
        name: t("night"),
        key: "night",
      },
      {
        name: t("coffee"),
        key: "coffee",
      },
    ];
  });

  const setTheme = (theme) => {
    localStorage.setItem("windyStrapTheme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  };

  const theme = localStorage.getItem("windyStrapTheme") || "light";
  document.addEventListener("DOMContentLoaded", setTheme(theme));

  return { setTheme, themes };
};
