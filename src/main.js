import Vue from 'vue';
import './cube-ui';
import App from './App.vue';
import router from './router';
import store from './store';
import 'amfe-flexible';
import './assets/stylus/index.styl';
import './components';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
