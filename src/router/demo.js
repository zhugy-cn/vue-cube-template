export default [
  {
    path: '/popup',
    meta: {
      title: 'popup',
    },
    component: () => import(/* webpackChunkName: "demo" */ '@/demo/popup.vue'),
  },
  {
    path: '/loading',
    meta: {
      title: 'loading',
    },
    component: () =>
      import(/* webpackChunkName: "demo" */ '@/demo/loading.vue'),
  },
  {
    path: '/toast',
    meta: {
      title: 'toast',
    },
    component: () => import(/* webpackChunkName: "demo" */ '@/demo/toast.vue'),
  },
  {
    path: '/load-more',
    meta: {
      title: 'LoadMore',
    },
    component: () =>
      import(/* webpackChunkName: "demo" */ '@/demo/load-more.vue'),
  },
  {
    path: '/scroll',
    meta: {
      title: 'scroll',
    },
    component: () =>
      import(/* webpackChunkName: "scroll" */ '@/demo/scroll.vue'),
  },
];
