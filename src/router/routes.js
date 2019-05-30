import Index from '_views/Index/Index.vue';
import GoodsDetail from '_views/GoodsDetail/GoodsDetail.vue';

export default [
  {
    path: '/',
    name: 'index',
    component: Index,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        meta: {
          title: '首页',
        },
        component: () =>
          import(/* webpackChunkName: "Home" */
          '_views/Home/Home.vue'),
        children: [
          {
            path: 'goodsDetail',
            meta: {
              title: '商品详情',
            },
            component: GoodsDetail,
          },
        ],
      },
      {
        path: 'mall',
        name: 'mall',
        meta: {
          title: '购物',
        },
        component: () =>
          import(/* webpackChunkName: "Home" */
          '_views/Mall/Mall.vue'),
        children: [
          {
            path: 'goodsDetail',
            meta: {
              title: '商品详情',
            },
            component: GoodsDetail,
          },
        ],
      },
      {
        path: 'personal',
        name: 'personal',
        meta: {
          title: '个人中心',
        },
        component: () =>
          import(/* webpackChunkName: "Home" */
          '_views/Personal/Personal.vue'),
      },
    ],
  },
  {
    path: '/goodsDetail',
    name: 'goodsDetail',
    meta: {
      title: '商品详情',
    },
    component: GoodsDetail,
  },
];
