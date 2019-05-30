export default {
  state: {
    include: [],
  },
  mutations: {
    addIncludeItem(state, routeName) {
      if (state.include.findIndex(item => item === routeName) === -1) {
        state.include.push(routeName);
      }
    },
    removeIncludeItem(state, routeName) {
      let index = state.include.findIndex(item => item === routeName);
      state.include.splice(index, 1);
    },
    clearIncludeAll(state) {
      state.include = [];
    },
  },
};
