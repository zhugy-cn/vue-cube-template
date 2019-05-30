import Vue from 'vue';
const context = require.context(`./`, true, /index.js$/);
context.keys().forEach(item => {
  const fileModule = context(item).default;
  // console.log(fileModule);
  if (fileModule) {
    Vue.use(fileModule);
  }
});
