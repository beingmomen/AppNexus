import { ref, onMounted, computed } from "vue";
import i18n from "../plugins/i18n";
import { useI18n } from "vue-i18n";

export default () => {
  const currentLang = ref();
  const { t } = useI18n(); // use as global scope

  const languages = computed(() => {
    return [
      {
        name: t("english"),
        key: "en",
        svg: "1f1ec-1f1e7.svg",
      },
      {
        name: t("arabic"),
        key: "ar",
        svg: "1f1f8-1f1e6.svg",
      },
      {
        name: t("spanish"),
        key: "es",
        svg: "1f1ea-1f1f8.svg",
      },
    ];
  });

  const changeLang = (lang) => {
    currentLang.value = lang;
    localStorage.setItem("windyStrapLang", lang);
    i18n.global.locale.value = lang;
    document.body.setAttribute("dir", lang == "ar" ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", lang);
  };

  const lang = localStorage.getItem("windyStrapLang") || "en";
  document.addEventListener("DOMContentLoaded", changeLang(lang));

  return { changeLang, currentLang, languages };
};
