<template>
  <header>
    <div class="header__con">
      <i class="cubeic-back" @click="$router.back()"></i>
      <span>
        <slot>{{ title || $route.meta.title }}</slot>
      </span>
    </div>
  </header>
</template>
<script>
export default {
  name: 'ZuiHeader',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
};
</script>
<style lang="stylus" scoped>
header
  position relative
  z-index 9
  height 44px
  line-height 44px
  color #fff
  background-color #017AFD
  .cubeic-back
    position absolute
    left 0
    top 0
    padding 0 14px
  .header__con
    text-align center
</style>
