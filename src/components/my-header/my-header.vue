<template>
  <header>
    <div class="header__con">
      <i class="cubeic-back" @click="$router.back()"></i>
      <span>
        <slot>{{ $route.meta.title }}</slot>
      </span>
    </div>
  </header>
</template>
<script>
export default {
  name: 'my-header',
};
</script>
<style lang="stylus" scoped>
header
  position fixed
  z-index 9
  top 0
  left 0
  width 100%
  color #fff
  height 44px
  line-height 44px
  background-color #017AFD
  .cubeic-back
    position absolute
    left 0
    top 0
    padding 0 14px
  .header__con
    text-align center
</style>
