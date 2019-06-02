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
<script src="./home.js"></script>
<style lang="stylus" scoped src="./home.styl"></style>
