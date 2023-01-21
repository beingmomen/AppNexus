import mutations from "./utils/mutations";
import actions from "./utils/actions";
import getters from "./utils/getters";

export default {
  namespaced: true,
  state() {
    return {
      table: {
        totalItems: 0,
        totalPages: 1,
        allData: [],
        filters: [],
        search: null,
        page: null,
      },
      fields: {
        name: null,
      },
    };
  },
  mutations: mutations,
  actions: actions,
  getters: getters,
};
