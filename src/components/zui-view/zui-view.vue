<template>
  <div>
    <!-- scale 时的遮罩层 -->
    <template v-if="animationType === 'scale'">
      <transition name="zui-fade">
        <div
          v-show="isToggle"
          class="mask-scale"
          :class="{ toggle: isToggle }"
        ></div>
      </transition>
    </template>
    <div class="parent-page" :class="[animationType, { toggle: isToggle }]">
      <template v-if="header">
        <zui-header :title="title"></zui-header>
        <div class="zui-body">
          <slot></slot>
        </div>
      </template>
      <template v-else>
        <slot></slot>
      </template>
    </div>
    <transition name="page-move">
      <router-view class="sub-page"></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'ZuiView',
  inheritAttrs: false,
  props: {
    // 头部标题
    title: {
      type: String,
      default: '',
    },
    // 是否隐藏头部
    header: {
      type: Boolean,
      default: true,
    },
    // 动画类型  move scale
    animationType: {
      type: String,
      default: 'move',
    },
  },
  computed: {
    isToggle() {
      return this.$route.name !== this.$parent.$options.name;
    },
  },
};
</script>
<style lang="stylus" scoped>
.mask-scale
  position fixed
  z-index 10
  top 0
  left 0
  bottom 0
  right 0
  visibility hidden
  background-color rgba(37, 38, 45, 0.5)
  &.toggle
    visibility visible
.zui-body
  height calc(100% - 44px)
  overflow auto
.parent-page
  transition transform 0.4s
.move.toggle
  transform translateX(-20%) translateZ(0)
.scale.toggle
  transform scale(0.94) translateZ(0)
.sub-page
  position absolute
  z-index 10
  top 0px
  left 0px
  width 100%
  height 100%
  background rgb(239, 239, 244)
.page-move-enter, .page-move-leave-active
  transform translateX(100%) translateZ(0)
.page-move-enter-active, .page-move-leave-active
  transition transform 0.3s
// 淡入
.zui-fade-enter-active
  animation fade-in 0.4s
.zui-fade-leave-active
  animation fade-out 0.4s
@keyframes fade-in
  0%
    opacity 0
  100%
    opacity 1
@keyframes fade-out
  0%
    opacity 1
  100%
    opacity 0
</style>
