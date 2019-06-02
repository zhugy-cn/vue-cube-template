import Index from '_views/index/index.vue';
import GoodsDetail from '_views/goods-detail/goods-detail.vue';
import Demo from './demo';

export default [
  {
    path: '/',
    name: 'index',
    component: Index,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () =>
          import(
            /* webpackChunkName: "home" */
            '_views/home/home.vue'
          ),
        children: [
          {
            path: 'goods-detail',
            meta: {
              title: '商品详情',
            },
            component: GoodsDetail,
          },
        ],
      },
      {
        path: 'mall',
        name: 'Mall',
        component: () =>
          import(
            /* webpackChunkName: "mall" */
            '_views/mall/mall.vue'
          ),
        children: [
          {
            path: 'goods-detail',
            meta: {
              title: '商品详情',
            },
            component: GoodsDetail,
          },
        ],
      },
      {
        path: 'shopping-cart',
        name: 'ShoppingCart',
        component: () =>
          import(
            /* webpackChunkName: "shopping-cart" */
            '_views/shopping-cart/shopping-cart.vue'
          ),
        children: [
          {
            path: 'goods-detail',
            meta: {
              title: '商品详情',
            },
            component: GoodsDetail,
          },
        ],
      },
      {
        path: 'personal',
        name: 'Personal',
        component: () =>
          import(
            /* webpackChunkName: "personal" */
            '_views/personal/personal.vue'
          ),
        children: Demo,
      },
    ],
  },
  {
    path: '/goods-detail',
    meta: {
      title: '商品详情',
    },
    component: GoodsDetail,
  },
];
