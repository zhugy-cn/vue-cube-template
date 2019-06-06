<template>
  <!-- <transition name="zui-toast-fade"> -->
  <div class="zui-loading" v-show="visible">
    <div v-if="type === 'dot'" class="load-dot">
      <div class="load load1"></div>
      <div class="load load2"></div>
      <div class="load"></div>
    </div>
    <div v-if="type === 'line'" class="load-line">
      <div class="load load1"></div>
      <div class="load load2"></div>
      <div class="load load3"></div>
      <div class="load load4"></div>
      <div class="load load5"></div>
    </div>
  </div>
  <!-- </transition> -->
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      type: 'dot', // 可选值 line
    };
  },
  methods: {
    show(type = 'dot') {
      this.type = type;
      this.visible = true;
    },
    hide() {
      this.visible = false;
    },
  },
};
</script>

<style lang="stylus" scoped>
.zui-loading
  position absolute
  left 0
  right 0
  top 0
  bottom 0
  z-index 100
  display flex
  align-items center
  justify-content center
  // background-color rgba(37, 38, 45, 0.2)
// 淡入
.zui-toast-fade-enter-active
  animation toast-in 0.1s
.zui-toast-fade-leave-active
  animation toast-out 0.1s
@keyframes toast-in
  0%
    opacity 0
  100%
    opacity 1
@keyframes toast-out
  0%
    opacity 1
  100%
    opacity 0
// 小球加载
.load-dot
  width 150PX
  text-align center
  .load
    width 22PX
    height 22PX
    margin 0 6PX
    background-color #00adb5
    border-radius 100%
    display inline-block
    animation bouncedelay 1.4s infinite ease-in-out
    animation-fill-mode both
  .load1
    animation-delay -0.32s
  .load2
    animation-delay -0.16s
@keyframes bouncedelay
  0%, 80%, 100%
    transform scale(0)
  40%
    transform scale(1)
// 音符
.load-line
  display flex
  justify-content space-around
  width 48PX
  height 54PX
  .load
    height 100%
    width 4PX
    background-color #00adb5
    animation stretchdelay 1.2s infinite ease-in-out
  .load2
    animation-delay -1.1s
  .load3
    animation-delay -1s
  .load4
    animation-delay -0.9s
  .load5
    animation-delay -0.8s
@keyframes stretchdelay
  0%, 40%, 100%
    transform scaleY(0.46)
  20%
    transform scaleY(1)
</style>
