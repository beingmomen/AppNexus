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
        loading: false,
        progress: 0,
      },
      fields: {
        name: null,
        packageName: null,
        versionName: null,
        versionCode: null,
        logo: null,
        apk: null,
        category: null,
        images: null,
      },
    };
  },
  mutations: mutations,
  actions: actions,
  getters: getters,
};
