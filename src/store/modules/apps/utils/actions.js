export default {
  async fetchData({ commit }, data) {
    commit("setTableValue", { key: "allData", value: data });
  },
  showSingleData({ commit, state }, payload) {
    const extract = Object.keys(state.fields);
    const extractedData = extract.map((key) => ({ [key]: payload[key] }));
    const result = Object.assign({}, ...extractedData);

    for (const [key, value] of Object.entries(result)) {
      commit("setFieldValue", { key, value });
    }
  },
  async resetFields({ state, commit }) {
    Object.keys(state.fields).forEach((field, i) => {
      commit("setFieldValue", { key: field, value: null });
    });
  },
};
