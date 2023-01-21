import mutations from "./utils/mutations";
import actions from "./utils/actions";
import getters from "./utils/getters";

export default {
  namespaced: true,
  state() {
    return {
      token: null,
      userId: null,
      tokenExpiration: null,
      user: null,
    };
  },
  mutations: mutations,
  actions: actions,
  getters: getters,
};
