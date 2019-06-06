<template>
  <div>
    <!-- 动画为 scale 时的遮罩层 -->
    <!-- <template v-if="animationType === 'scale'"> -->
    <transition name="zui-fade">
      <div
        v-show="isToggle"
        class="mask-scale"
        :class="{ toggle: isToggle }"
      ></div>
    </transition>
    <!-- </template> -->

    <!-- 内容区域 -->
    <zui-page
      class="zui-view-content"
      :class="[animationType, { toggle: isToggle }]"
      v-bind="$attrs"
    >
      <slot></slot>
    </zui-page>

    <!-- 子路由区域 -->
    <transition name="page-move">
      <router-view class="zui-view-sub-page"></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'ZuiView',
  inheritAttrs: false,
  props: {
    // 动画类型  move scale
    animationType: {
      type: String,
      default: 'move',
    },
  },
  computed: {
    // 组件的名字必须跟路由的名字一样
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
.zui-view-content
  &.move
    transition transform 0.3s
    &.toggle
      // transform scaleY(0.98) translateX(-20%) translateZ(0)
      transform scaleX(0.7) translateX(-20%) translateZ(0)
      transform-origin left
  &.scale
    transition transform 0.4s
    &.toggle
      transform scale(0.96, 0.98) translateZ(0)
.zui-view-sub-page
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
