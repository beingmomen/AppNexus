import mutations from "./utils/mutations";
import actions from "./utils/actions";
import getters from "./utils/getters";

export default {
  namespaced: true,
  state() {
    return {
      cols: {
        categories: [],
      },
    };
  },
  mutations: mutations,
  actions: actions,
  getters: getters,
};
