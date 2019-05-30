<template>
  <transition name="zui-fade">
    <div class="zui-popup" v-show="visible">
      <!-- 遮罩层 -->
      <div
        class="zui-popup__mask"
        @touchmove.prevent
        @click="handleMaskClick"
      ></div>
      <!-- 内容 -->
      <transition :name="transitionName">
        <div v-show="visible" class="zui-popup__container" :class="position">
          内容
        </div>
      </transition>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'popup',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    maskClosable: {
      type: Boolean,
      default: true,
    },
    position: {
      type: String,
      default: 'center',
    },
  },
  computed: {
    transitionName() {
      switch (this.position) {
        case 'zoom-center':
          return 'zui-zoom';
        case 'top':
          return 'zui-slide-down';
        case 'bottom':
          return 'zui-slide-up';
        case 'left':
          return 'zui-slide-left';
        case 'right':
          return 'zui-slide-right';
        default:
          return 'zui-bounce';
      }
    },
  },
  methods: {
    handleMaskClick() {
      if (this.maskClosable) {
        this.$emit('update:visible', false);
      }
    },
  },
};
</script>
<style lang="stylus" scoped>
.zui-popup
  position fixed
  left 0
  right 0
  top 0
  bottom 0
  z-index 100
  &__mask
    position absolute
    z-index -1
    height 100%
    width 100%
    background-color rgba(0, 0, 0, 0.7)
    // background-color rgba(37, 38, 45, 0.4)
  &__container
    position absolute
    width 300PX
    height 200PX
    background-color #fff
    &[class*='center']
      top 50%
      left 50%
      transform translate3d(-50%, -50%, 0)
      border-radius 4PX
    &.top, &.bottom
      left 0
      right 0
      width 100%
    &.top
      top 0
    &.bottom
      bottom 0
    &.left, &.right
      top 0
      bottom 0
      height 100%
    &.left
      left 0
    &.right
      right 0
// 淡入
.zui-fade
  &-enter-active
    animation 0.3s zui-fade-in
  &-leave-active
    animation 0.4s zui-fade-out
@keyframes zui-fade-in
  from
    opacity 0
  to
    opacity 1
@keyframes zui-fade-out
  from
    opacity 1
  to
    opacity 0
// cube-ui
.zui-zoom
  &-enter-active
    animation 0.4s zui-zoom-in
  &-leave-active
    animation 0.3s zui-zoom-out
@keyframes zui-zoom-in
  0%
    opacity 0
    transform translate3d(-50%, -50%, 0) scale(0)
  50%
    transform translate3d(-50%, -50%, 0) scale(1.1)
  100%
    opacity 1
    transform translate3d(-50%, -50%, 0) scale(1)
@keyframes zui-zoom-out
  to
    opacity 0
    transform translate3d(-50%, -50%, 0) scale(0.9)
// 放大
.zui-bounce
  &-enter-active
    animation 0.3s zui-bounce-in
  &-leave-active
    animation 0.3s zui-bounce-out
@keyframes zui-bounce-in
  from
    opacity 0
    transform translate3d(-50%, -50%, 0) scale(0.7)
  to
    opacity 1
    transform translate3d(-50%, -50%, 0) scale(1)
@keyframes zui-bounce-out
  from
    opacity 1
    transform translate3d(-50%, -50%, 0) scale(1)
  to
    opacity 0
    transform translate3d(-50%, -50%, 0) scale(0.9)
// 底部滑出（下到上）
.zui-slide-up
  &-enter-active
    animation zui-slide-up-enter 0.3s both ease
  &-leave-active
    animation zui-slide-up-leave 0.3s both ease
@keyframes zui-slide-up-enter
  from
    transform translate3d(0, 100%, 0)
@keyframes zui-slide-up-leave
  to
    transform translate3d(0, 100%, 0)
// 顶部滑出（上到下）
.zui-slide-down
  &-enter-active
    animation zui-slide-down-enter 0.3s both ease
  &-leave-active
    animation zui-slide-down-leave 0.3s both ease
@keyframes zui-slide-down-enter
  from
    transform translate3d(0, -100%, 0)
@keyframes zui-slide-down-leave
  to
    transform translate3d(0, -100%, 0)
// 左边滑出（左到右）
.zui-slide-left
  &-enter-active
    animation zui-slide-left-enter 0.3s both ease
  &-leave-active
    animation zui-slide-left-leave 0.3s both ease
@keyframes zui-slide-left-enter
  from
    transform translate3d(-100%, 0, 0)
@keyframes zui-slide-left-leave
  to
    transform translate3d(-100%, 0, 0)
// 右边滑出（右到左）
.zui-slide-right
  &-enter-active
    animation zui-slide-right-enter 0.3s both ease
  &-leave-active
    animation zui-slide-right-leave 0.3s both ease
@keyframes zui-slide-right-enter
  from
    transform translate3d(100%, 0, 0)
@keyframes zui-slide-right-leave
  to
    transform translate3d(100%, 0, 0)
</style>
