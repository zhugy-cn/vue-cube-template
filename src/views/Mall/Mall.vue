<template>
  <div class="mall-page">
    <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp">
      <!-- 商品列表 -->
      <ul class="goods-list">
        <li
          class="goods-item"
          @click="$router.push('/goods-detail')"
          v-for="(item, index) in goodsList"
          :key="index"
        >
          <img
            class="goods-cover"
            :imgurl="item.imgUrl"
            src="./default-img.png"
          />
          <p class="goods-name">米家扫地机器人边刷</p>
          <p class="goods-price">29</p>
        </li>
      </ul>
    </mescroll-vue>
    <router-view></router-view>
  </div>
</template>
<script src="./mall.js"></script>
<style lang="stylus" scoped src="./mall.styl"></style>
