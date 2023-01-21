import VueToastification from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

export const options = {
  // You can set your default options here
  timeout: 4000,
};

export const Toast = {
  install(Vue) {
    Vue.use(VueToastification, options);
  },
};
