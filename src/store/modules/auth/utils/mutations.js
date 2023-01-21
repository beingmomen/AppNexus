export default {
  setUser(state, payload) {
    state.userId = payload.userId;
    state.token = payload.token;
    state.tokenExpiration = payload.tokenExpiration;
  },
  user(state, payload) {
    state.user = payload;
  },
};
