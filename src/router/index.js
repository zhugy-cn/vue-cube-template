import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';
import Demo from './demo';

Vue.use(Router);
const router = new Router({
  routes: [...Demo, ...routes],
  mode: 'history',
  base: process.env.BASE_URL,
});

export default router;
