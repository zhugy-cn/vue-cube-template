<template>
  <div class="home-page">
    <!-- 轮播图 -->
    <section class="scroll-wrapper">
      <cube-slide ref="slide" :data="bannerList">
        <cube-slide-item v-for="item in bannerList" :key="item.id">
          <img :src="item.image" />
        </cube-slide-item>
      </cube-slide>
    </section>
    <!-- 焦点图 -->
    <ul class="btn-list">
      <li v-for="(item, index) in btnList" :key="index">
        <img :src="item.imgUrl" />
        <p>{{ item.title }}</p>
      </li>
    </ul>
    <!-- 广告图 -->
    <section class="advert-list">
      <img class="advert-left" src="./images/bidding.gif" />
      <div class="advert-right">
        <img src="./images/bidding_1.png" />
        <img src="./images/bidding_2.png" />
      </div>
    </section>
    <!-- 商品列表 -->
    <ul class="goods-list">
      <li
        class="goods-item"
        @click="handleJumpDetail(item.id, $event)"
        v-for="(item, index) in goodsList"
        :key="index"
      >
        <img class="goods-cover" :src="item.imgUrl" />
        <p class="goods-name">米家扫地机器人边刷</p>
        <p class="goods-price">29</p>
      </li>
    </ul>
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @before-leave="beforeLeave"
      @leave="leave"
      @after-leave="afterLeave"
    >
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
/* eslint-disable no-unused-vars */
export default {
  name: 'home',
  methods: {
    handleJumpDetail(id, event) {
      // 第一帧的位置
      const firstRect = event.currentTarget
        .querySelector('img')
        .getBoundingClientRect();
      console.log(firstRect);
      this.firstRect = firstRect;
      this.$router.push(this.$route.path + '/goodsDetail');
    },
    // 进入时
    beforeEnter(el) {
      console.log('beforeEnter');
    },
    enter(el, done) {
      // 第一帧的位置
      const firstRect = this.firstRect;
      // 最后一帧的位置
      const lastRect = el.getBoundingClientRect();
      console.log(lastRect);
      const Invert = {
        deltax: firstRect.left - lastRect.left,
        deltaY: firstRect.top - lastRect.top,
        deltaW: firstRect.width / lastRect.width,
        deltaH: firstRect.height / lastRect.height,
      };
      el.animate(
        [
          {
            transformOrigin: 'top left',
            transform: `translate3d(${Invert.deltax}px,${
              Invert.deltaY
            }px,0) scale(${Invert.deltaW},${Invert.deltaH})`,
            borderRadius: '5px',
          },
          {
            transformOrigin: 'top left',
            transform: `translate3d(0 ,0, 0) scale(1,1)`,
            borderRadius: '0',
          },
        ],
        {
          duration: 400,
          easing: 'cubic-bezier(0.2, 0, 0.2, 1)',
        },
      ).onfinish = function() {
        done();
      };
    },
    afterEnter(el) {
      console.log('afterEnter');
    },
    // 离开时
    beforeLeave(el) {
      console.log('beforeLeave');
    },
    leave(el, done) {
      const firstRect = this.firstRect;
      if (firstRect.left === undefined) {
        return done();
      }
      const lastRect = el.getBoundingClientRect();
      const Invert = {
        deltax: firstRect.left - lastRect.left,
        deltaY: firstRect.top - lastRect.top,
        deltaW: firstRect.width / lastRect.width,
        deltaH: firstRect.height / lastRect.height,
      };
      el.animate(
        [
          {
            transformOrigin: 'top left',
            transform: `translate3d(${Invert.deltax}px,${
              Invert.deltaY
            }px,0) scale(${Invert.deltaW},${Invert.deltaH})`,
            borderRadius: '5px',
          },
          {
            transformOrigin: 'top left',
            transform: `translate3d(0 ,0, 0) scale(1)`,
            borderRadius: '0',
          },
        ],
        {
          duration: 400,
          direction: 'reverse',
          easing: 'cubic-bezier(0.2, 0, 0.2, 1)',
        },
      ).onfinish = function() {
        done();
      };
    },
    afterLeave(el) {
      console.log('afterLeave');
    },
  },
  data() {
    return {
      firstRect: {},
      bannerList: [
        {
          id: 1,
          image: require('./images/banner_1.jpg'),
        },
        {
          id: 2,
          image: require('./images/banner_2.jpg'),
        },
        {
          id: 3,
          image: require('./images/banner_3.jpg'),
        },
        {
          id: 4,
          image: require('./images/banner_4.png'),
        },
      ],
      btnList: [
        {
          title: '免费设计',
          imgUrl: require('./images/btn_mfsj.png'),
        },
        {
          title: '装修报价',
          imgUrl: require('./images/btn_zxbj.png'),
        },
        {
          title: '装修保',
          imgUrl: require('./images/btn_zxb.png'),
        },
        {
          title: '装修贷',
          imgUrl: require('./images/btn_zxd.png'),
        },
        {
          title: '免费验房',
          imgUrl: require('./images/btn_mfyf.png'),
        },
        {
          title: '效果图',
          imgUrl: require('./images/btn_xgt.png'),
        },
        {
          title: '装修公司',
          imgUrl: require('./images/btn_zxgs.png'),
        },
        {
          title: '装修日记',
          imgUrl: require('./images/btn_zxrj.png'),
        },
      ],
      goodsList: [
        {
          id: 1,
          imgUrl: require('./images/goods-1.jpg'),
        },
        {
          id: 2,
          imgUrl: require('./images/goods-2.png'),
        },
        {
          id: 3,
          imgUrl: require('./images/goods-3.jpg'),
        },
        {
          id: 4,
          imgUrl: require('./images/goods-4.jpg'),
        },
        {
          id: 5,
          imgUrl: require('./images/goods-5.jpg'),
        },
        {
          id: 6,
          imgUrl: require('./images/goods-6.jpg'),
        },
      ],
    };
  },
  created() {
    console.log('home');
  },
};
</script>
<style lang="stylus" scoped src="./Home.styl"></style>
