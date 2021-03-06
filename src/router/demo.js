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
      {
        path: 'demo5',
        meta: {
          title: 'scroll/虚拟列表',
        },
        component: () =>
          import(/* webpackChunkName: "scroll" */ '@/demo/scroll/demo5.vue'),
      },
      {
        path: 'demo6',
        meta: {
          title: 'scroll/下拉刷新',
        },
        component: () =>
          import(/* webpackChunkName: "scroll" */ '@/demo/scroll/demo6.vue'),
      },
    ],
  },
  {
    path: '/tab-panel',
    name: 'TabPanel',
    component: () =>
      import(/* webpackChunkName: "tab-panel" */ '@/demo/tab-panel/index.vue'),
    children: [
      {
        path: 'demo1',
        component: () =>
          import(
            /* webpackChunkName: "tab-panel" */ '@/demo/tab-panel/demo1/index.vue'
          ),
      },
    ],
  },
];
