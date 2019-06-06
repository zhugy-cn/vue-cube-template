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
    name: 'Scroll',
    component: () =>
      import(/* webpackChunkName: "scroll" */ '@/demo/scroll/index.vue'),
    children: [
      {
        path: 'demo1',
        component: () =>
          import(/* webpackChunkName: "scroll" */ '@/demo/scroll/demo1.vue'),
      },
      {
        path: 'demo2',
        meta: {
          title: 'scroll/demo2',
        },
        component: () =>
          import(/* webpackChunkName: "scroll" */ '@/demo/scroll/demo2.vue'),
      },
      {
        path: 'demo3',
        meta: {
          title: 'scroll/demo3',
        },
        component: () =>
          import(/* webpackChunkName: "scroll" */ '@/demo/scroll/demo3.vue'),
      },
      {
        path: 'demo4',
        meta: {
          title: 'scroll/demo4',
        },
        component: () =>
          import(/* webpackChunkName: "scroll" */ '@/demo/scroll/demo4.vue'),
      },
    ],
  },
];
