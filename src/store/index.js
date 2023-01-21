import { createStore } from "vuex";

import rootMutations from "./utils/mutations";
import rootActions from "./utils/actions";
import rootGetters from "./utils/getters";

// Import Modules
import auth from "./modules/auth/index";
import categories from "./modules/categories/index";

const store = createStore({
  modules: {
    auth,
    categories,
  },
  state() {
    return {};
  },
  mutations: rootMutations,
  actions: rootActions,
  getters: rootGetters,
});

export default store;
