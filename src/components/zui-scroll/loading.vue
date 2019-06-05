<template>
  <div class="scroll__loading">
    <i v-for="item in 12" :key="item" />
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'Loading',
};
</script>
<style lang="stylus">
.scroll__loading
  width 20PX
  height 20PX
  position relative
  display block
  box-sizing border-box
  animation spinner-rotate 1s linear infinite
  animation-timing-function steps(12)
  color #8c8c8c
  i
    top 0
    left 0
    width 100%
    height 100%
    position absolute
    &::before
      width 9%
      height 25%
      content ''
      display block
      margin 0 auto
      border-radius 10PX
      background-color currentColor
  for $i in (1 .. 12)
    i:nth-of-type({$i})
      opacity 1 - (0.75 / 12) * ($i - 1)
      transform rotate($i * 30deg)
  @keyframes spinner-rotate
    from
      transform rotate(0deg)
    to
      transform rotate(360deg)
</style>
