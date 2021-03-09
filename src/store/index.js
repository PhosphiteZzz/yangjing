import Vue from "vue";
import Vuex from "vuex";
import login from "./modules/login";
import getters from "./getters";
import transInfo from "./modules/transInfo"

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    login,
    transInfo
  },
  getters,

});
