import Vue from 'vue';
const context = require.context(`./`, true, /index.js$/);
context.keys().forEach(item => {
  const fileModule = context(item).default;
  if (fileModule) {
    Vue.use(fileModule);
  }
});
