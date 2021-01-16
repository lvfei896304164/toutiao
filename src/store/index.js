import Vue from 'vue';
import Vuex from 'vuex';
import { setItem, getItem } from '@/utils/storage.js';

Vue.use(Vuex);
const TOKEN_KEY = 'TOUTIAO_USER';
export default new Vuex.Store({
  state: {
    // 一个对象用来存储用户登录的信息(token等数据)
    // user: JSON.parse(window.localStorage.getItem(TOKEN_KEY)),
    user: getItem(TOKEN_KEY),
  },
  mutations: {
    setUser(state, data) {
      state.user = data;
      setItem(TOKEN_KEY, state.user);
      // 为了防止刷新丢失,我们需要把数据存储备份到本地储存
      // window.localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user));
    },
  },
  actions: {},
  modules: {},
});
