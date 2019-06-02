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
  // {
  //   path: '/scroll',
  //   meta: {
  //     title: 'scroll',
  //   },
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "demo" */
  //       '@/demo/scroll/scroll.vue'
  //     ),
  // },
];
