<template>
  <transition name="zui-toast-fade">
    <div class="zui-loading" v-show="visible">
      <div :class="'load-content-'+type">
        <div class="load load1"></div>
        <div class="load load2"></div>
        <div class="load"></div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "loading",
  data() {
    return {
      visible: false,
      type: "ball"
    };
  },
  methods: {
    show(type = "ball") {
      this.type = type;
      this.visible = true;
    },
    hide() {
      this.visible = false;
    }
  }
};
</script>

<style lang="stylus" scoped>
.zui-loading
  position fixed
  left 0
  right 0
  top 0
  bottom 0
  z-index 100
  display flex
  align-items center
  justify-content center
  background-color rgba(37, 38, 45, 0.2)
// 淡入
.zui-toast-fade-enter-active
  animation toast-in 0.2s
.zui-toast-fade-leave-active
  animation toast-out 0.2s
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
// 方块加载
.load-content-rect
  width 60PX
  height 60PX
  background-color #00adb5
  animation rotateplane 1.2s infinite ease-in-out
@keyframes rotateplane
  0%
  50%
  100%
@keyframes rotateplane
  0%
    transform perspective(120PX) rotateX(0deg) rotateY(0deg)
  50%
    transform perspective(120PX) rotateX(-180.1deg) rotateY(0deg)
  100%
    transform perspective(120PX) rotateX(-180deg) rotateY(-179.9deg)
// 小球加载
.load-content-ball
  margin 50PX auto
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
</style>