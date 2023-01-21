import axios from "axios";
import router from "@/router/index";
const API_KEY = "AIzaSyC7AEfVGbRgXcGr1Xt8J5qu5yfy46st8Nk";
const SIGNUP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
const UPDATE_URL = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`;
const LOOKUP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`;
const LOGIN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

export default {
  async createUser({ commit, dispatch }, payload) {
    try {
      const { data, status } = await axios.post(SIGNUP_URL, payload);
      if (status === 200) {
        commit("setUser", data);
        dispatch("updateUser", { ...data, displayName: payload.displayName });
        router.push("/auth/login");
      }
    } catch (error) {
      // console.warn("Error creating user:", error);
    }
  },

  async updateUser({ commit }, payload) {
    try {
      const { data, status } = await axios.post(UPDATE_URL, {
        ...payload,
        photoUrl: "https://placeimg.com/80/80/people",
      });

      if (status === 200) {
        commit("user", data);
      }
    } catch (error) {
      // console.warn("Error updating user:", error);
    }
  },

  async currentUser({ commit, dispatch }, payload) {
    if (!payload) return;
    try {
      const {
        data: {
          users: [user],
        },
        status,
      } = await axios.post(LOOKUP_URL, {
        idToken: payload,
      });

      if (status === 200) {
        commit("user", user);
      }
    } catch (error) {}
  },

  async login({ commit, dispatch }, payload) {
    try {
      const { data, status } = await axios.post(LOGIN_URL, payload);
      if (status === 200) {
        localStorage.setItem("windy_strap-token", data.idToken);
        localStorage.setItem("windy_strap-userId", data.localId);
        localStorage.setItem("windy_strap-tokenExpiration", data.expiresIn);
        dispatch("currentUser", data.idToken);
        commit("setUser", {
          userId: data.localId,
          token: data.idToken,
          tokenExpiration: data.expiresIn,
        });
        router.push("/");
      }
    } catch (error) {
      // console.warn("Error logging in:", error);
    }
  },
  autoLogin({ commit, dispatch }) {
    const token = localStorage.getItem("windy_strap-token");
    const userId = localStorage.getItem("windy_strap-userId");
    const tokenExpiration = localStorage.getItem("windy_strap-tokenExpiration");
    if (!token) return;
    commit("setUser", { userId, token, tokenExpiration });
    dispatch("currentUser", token);
  },

  logout({ commit }) {
    localStorage.removeItem("windy_strap-token");
    localStorage.removeItem("windy_strap-userId");
    localStorage.removeItem("windy_strap-tokenExpiration");
    commit("setUser", { userId: null, token: null, tokenExpiration: null });
    commit("user", null);
    router.push("/auth/login");
  },
};
