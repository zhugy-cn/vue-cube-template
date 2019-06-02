<template>
  <section class="goodsDetail-page">
    <img src="http://192.168.1.200:8080/img/goods-1.33ef0366.jpg" />
    <div class="title"></div>
    <div class="desc"></div>
    <div class="content"></div>
    <div class="meta"></div>
  </section>
</template>
<script>
export default {
  name: 'GoodsDetail',
  data() {
    return {};
  },
  created() {
    console.log('detail');
  },
};
</script>
<style lang="stylus" scoped>
.goodsDetail-page
  position fixed
  z-index 99
  top 0
  right 0
  left 0
  bottom 0
  background-color #fff
img
  width 100%
.title
  height 32px
  width 60%
  background-color #dedede
.desc
  height 32px
  width 80%
  background-color #dedede
.content
  height 32px
  width 50%
  background-color #dedede
.meta
  height 32px
  width 70%
  background-color #dedede
div
  margin 20px 0
</style>
