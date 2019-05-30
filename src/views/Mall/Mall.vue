<template>
  <div class="mall-page">
    <!-- 商品列表 -->
    <ul class="goods-list">
      <li
        class="goods-item"
        @click="$router.push('/goodsDetail')"
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
<script>
export default {
  name: 'mall',
  data() {
    return {
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
};
</script>
<style lang="stylus" scoped>
.goods-list
  display flex
  flex-wrap wrap
  padding-top 2PX
  background-color #fff
  .goods-item
    width 50%
    box-sizing border-box
    &:nth-child(odd)
      padding-right 1PX
    &:nth-child(even)
      padding-left 1PX
  .goods-cover
    width 100%
  .goods-name
    font-size 15px
    padding 10px 14px 8px
  .goods-price
    position relative
    color #ff6700
    font-size 17px
    padding 0 14px 10px 22px
    &::after
      content '\A5'
      position absolute
      left 10px
      top 1PX
      font-size 14px
      text-decoration none
</style>
