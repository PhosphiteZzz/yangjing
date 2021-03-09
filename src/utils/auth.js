const TokenKey = "token";
const UserKey = "user";
const searchKey = "history";
const InfoKey = "userInfo";
const CodeKey = "code";
export function getCode() {
  return sessionStorage.getItem(CodeKey);
}

export function setCode(code) {
  return sessionStorage.setItem(CodeKey, code);
}

export function removeCode() {
  return sessionStorage.removeItem(CodeKey);
}

export function getToken() {
  return sessionStorage.getItem(TokenKey);
}

export function setToken(token) {
  return sessionStorage.setItem(TokenKey, token);
}

export function removeToken() {
  return sessionStorage.removeItem(TokenKey);
}

export function getUser() {
  return sessionStorage.getItem(UserKey);
}

export function setUser(username) {
  return sessionStorage.setItem(UserKey, username);
}

export function removeUser() {
  return sessionStorage.removeItem(UserKey);
}

export function getHistory() {
  return localStorage.getItem(searchKey);
}

export function setHistory(name) {
  let storage = localStorage.getItem(searchKey);
  switch (Object.prototype.toString.call(storage)) {
    case "[object Null]":
      localStorage.setItem(searchKey, name);
      break;
    case "[object String]":
      var list = storage.split(",");
      if (list.length >= 30) {
        return;
      }
      var bool = list.some(item => {
        return item === name;
      });
      if (!bool) {
        localStorage.setItem(searchKey, storage + "," + name);
      }
      break;
    default:
      break;
  }
}

export function removeHistory() {
  return localStorage.removeItem(searchKey);
}

export function getUserInfo() {
  return JSON.parse(sessionStorage.getItem(InfoKey));
}

export function setUserInfo(info) {
  return sessionStorage.setItem(InfoKey, JSON.stringify(info));
}

export function removeUserInfo() {
  return sessionStorage.removeItem(InfoKey);
}
