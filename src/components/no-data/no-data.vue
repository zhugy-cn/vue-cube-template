<template functional>
  <div class="zui-no-data" :style="{ marginTop: marginTop }">
    <img class="zui-no-data__img" src="../../assets/images/icon-null.png" />
    <p class="zui-no-data__text">
      <slot>暂无数据</slot>
    </p>
  </div>
</template>
<script>
export default {
  props: {
    marginTop: {
      type: String,
      default: '60px',
    },
  },
};
</script>
<style lang="stylus" scoped>
.zui-no-data
  text-align center
  opacity 0.8
  &__img
    width 70px
  &__text
    color #b5b5b5
    font-size 14px
    margin-top 15px
</style>
