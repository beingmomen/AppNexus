import { ref } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";

export default () => {
  const store = useStore();
  const toast = useToast();
  const error = ref(null);

  const handleError = (e) => {
    // Do some action here, for example, logging the error to the console
    const msg = e.response.data.error.message;
    toast.error(msg);

    if (msg === "INVALID_ID_TOKEN") {
      store.dispatch("auth/logout");
    }
    error.value = e;
    return Promise.reject(e);
  };

  axios.interceptors.response.use((response) => response, handleError);

  return { error };
};
