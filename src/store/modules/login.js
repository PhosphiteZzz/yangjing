import { loginRequest, registRequest } from "@/api/login.js";

import {
  getToken,
  setToken,
  setUser,
  setUserInfo,
  setCode
} from "@/utils/auth.js";
const login = {
  state: {
    token: getToken(),
    user: "",
    info: {},
    code: ""
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USER: (state, user) => {
      state.user = user;
    },
    SET_INFO: (state, info) => {
      state.info = info;
    },
    SET_CODE: (state, code) => {
      state.code = code;
    }
  },
  actions: {
    Login({ commit }, result) {
      return new Promise((resolve, reject) => {
        loginRequest(result)
          .then(res => {
            if (res && res.code !== 500) {
              if (res.code === 200) {
                setToken(res.token);
                setUser(res.data.nickName);
                setUserInfo(res.data);
                setCode(getRandom(10));
                commit("SET_TOKEN", res.token);
                commit("SET_USER", res.data.nickName);
                commit("SET_INFO", res.data);
                commit("SET_CODE", getRandom(10));
              }
              resolve(res);
            }
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    Regist({ commit }, result) {
      return new Promise((resolve, reject) => {
        registRequest(result).then(res => {
          if (res && res.code === 200) {
            resolve(res);
          }
        });
      });
    }
  },
  namespaced: true
};
/** 获取10位code码 */
function getRandom(num) {
  return Math.floor(
    (Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, num - 1)
  );
}
export default login;
