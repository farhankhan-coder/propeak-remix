import _ from 'lodash';
import { ACCESS_TOKEN } from '../common/const';

const USER_INFO = 'userInfo';

const parse = JSON.parse;
const stringify = JSON.stringify;

const Auth = {
  clear(key) {
    if (typeof localStorage !== 'undefined' && localStorage.getItem(key)) {
      localStorage.removeItem(key);
    }
  },

  clearAppStorage() {
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
  },

  clearToken(tokenKey = ACCESS_TOKEN) {
    Auth.clear(tokenKey);
  },

  clearUserInfo(userInfo = USER_INFO) {
    Auth.clear(userInfo);
  },

  get(key) {
    if (typeof localStorage !== 'undefined' && localStorage.getItem(key)) {
      return parse(localStorage.getItem(key)) || null;
    }
    return null;
  },

  // getToken(tokenKey = ACCESS_TOKEN) {
  //   return Auth.get(tokenKey);
  // },
  getToken(tokenKey = 'accessToken') {
    const tokenString = localStorage.getItem(tokenKey);
    if (tokenString) {
      const token = parse(tokenString);
      return token;
    }
    return null;
  },
  getUserInfo(userInfo = USER_INFO) {
    return Auth.get(userInfo);
  },

  set(key, value, isLocalStorage) {
    if (_.isEmpty(value)) {
      return;
    }

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, stringify(value));
    }
  },

  setToken(value = '', tokenKey = ACCESS_TOKEN, isLocalStorage = false) {
    Auth.set(tokenKey, value, isLocalStorage);
  },

  setUserInfo(value = '', userInfo = USER_INFO, isLocalStorage = false) {
    Auth.set(userInfo, value, isLocalStorage);
  },
};

export default Auth;
