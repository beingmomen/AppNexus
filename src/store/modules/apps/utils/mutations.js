export default {
  setTableValue(state, { key, value }) {
    state.table[key] = value;
  },
  setFieldValue(state, { key, value }) {
    state.fields[key] = value;
  },
};
