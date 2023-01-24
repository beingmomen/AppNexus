export default {
  async fetchData({ commit }, { data, colName }) {
    commit("setColsData", { key: colName, value: data });
  },
};
