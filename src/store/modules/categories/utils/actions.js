import axios from "axios";
import router from "@/router/index";

import { db } from "@/plugins/firebase.js";
import {
  collection,
  query,
  orderBy,
  getCountFromServer,
  limit,
  getDocs,
  doc,
  onSnapshot,
} from "firebase/firestore";

const APP_URL = "https://appnexus-4136f-default-rtdb.firebaseio.com";

export default {
  async fetchData({ commit }, data) {
    commit("setTableValue", { key: "allData", value: data });
  },
  async fetchDocument({}, payload) {
    const { data } = await axios.get(`${APP_URL}/categories/${payload}.json`);
    return data;
  },
  showSingleData({ commit, state }, payload) {
    const extract = Object.keys(state.fields);
    const extractedData = extract.map((key) => ({ [key]: payload[key] }));
    const result = Object.assign({}, ...extractedData);

    for (const [key, value] of Object.entries(result)) {
      commit("setFieldValue", { key, value });
    }
  },
  async addData({ dispatch }, { data }) {
    await axios.post(`${APP_URL}/categories.json`, data);
    await dispatch("fetchData");
  },
  async updateData({ dispatch }, { data, id }) {
    await axios.patch(`${APP_URL}/categories/${id}.json`, data);
    await dispatch("fetchData");
  },
  async deleteDoc({ dispatch }, { data, id }) {
    await axios.delete(`${APP_URL}/categories/${id}.json`, data);
    await dispatch("fetchData");
  },
  async resetFields({ state, commit }) {
    Object.keys(state.fields).forEach((field, i) => {
      commit("setFieldValue", { key: field, value: null });
    });
  },
};
