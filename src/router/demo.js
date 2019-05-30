export default [
  {
    path: '/popup',
    meta: {
      title: 'popup',
    },
    component: () =>
      import(/* webpackChunkName: "Home" */
      '@/demo/popup.vue'),
  },
  {
    path: '/loading',
    meta: {
      title: 'loading',
    },
    component: () =>
      import(/* webpackChunkName: "Home" */
      '@/demo/loading.vue'),
  },
  {
    path: '/toast',
    meta: {
      title: 'toast',
    },
    component: () =>
      import(/* webpackChunkName: "Home" */
      '@/demo/toast.vue'),
  },
];
