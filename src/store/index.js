import { createStore } from "vuex";

import rootMutations from "./utils/mutations";
import rootActions from "./utils/actions";
import rootGetters from "./utils/getters";

// Import Modules
import auth from "./modules/auth/index";
import categories from "./modules/categories/index";
import apps from "./modules/apps/index";
import global from "./modules/global/index";

const store = createStore({
  modules: {
    auth,
    categories,
    apps,
    global,
  },
  state() {
    return {};
  },
  mutations: rootMutations,
  actions: rootActions,
  getters: rootGetters,
});

export default store;
