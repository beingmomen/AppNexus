import { ref } from "vue";

export default () => {
  const fullSidebar = ref(true);

  const toggleFullSidebar = (key) => {
    fullSidebar.value = !fullSidebar.value;
  };

  return { fullSidebar, toggleFullSidebar };
};
