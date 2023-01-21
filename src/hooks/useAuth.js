import { useStore } from "vuex";

export default () => {
  const store = useStore();

  const autoLogin = () => {
    store.dispatch("auth/autoLogin");
  };

  return { autoLogin };
};
