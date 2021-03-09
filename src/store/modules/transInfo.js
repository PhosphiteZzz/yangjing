const login = {
  state: {
    searchTitle: ""
  },
  mutations: {
    setTitle: (state, title) => {
      state.searchTitle = title;
    }
  },
  actions: {},
  namespaced: true
};
export default login;
