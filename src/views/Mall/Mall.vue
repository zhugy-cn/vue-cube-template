<template>
  <div class="mall-page">
    <!-- 商品列表 -->
    <ul class="goods-list">
      <li
        class="goods-item"
        @click="$router.push('/goods-detail')"
        v-for="(item, index) in goodsList"
        :key="index"
      >
        <img class="goods-cover" :src="item.imgUrl" />
        <p class="goods-name">米家扫地机器人边刷</p>
        <p class="goods-price">29</p>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>
<script src="./mall.js"></script>
<style lang="stylus" scoped src="./mall.styl"></style>
