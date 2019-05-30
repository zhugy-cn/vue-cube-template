import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';

// 导入文件
const context = require.context('./modules', false, /\.js$/);
const modules = {};
context.keys().forEach(item => {
  const fileName = item.slice(2, -3);
  const fileModule = context(item).default;
  modules[fileName] = fileModule;
});

Vue.use(Vuex);
export default new Vuex.Store({
  getters,
  modules,
});
