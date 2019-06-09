<template>
  <div ref="wrapper" class="zui-scroll-wrapper">
    <!-- 滚动内容 -->
    <div class="content-wrapper">
      <!-- 内容列表 -->
      <div ref="listWrapper" class="list-wrapper">
        <slot></slot>
      </div>
      <!-- 底部 loading 区域 -->
      <div v-if="options.pullUpLoad" class="pullup-wrapper">
        <load-more :data-list="[1]" :is-more="isMore"></load-more>
      </div>
    </div>

    <!-- 顶部 loading 区域 -->
    <div class="pulldown-wrapper" ref="pulldown" :style="pullDownStyle">
      <div v-show="beforePullDown">
        <Bubble :y="bubbleY" />
      </div>
      <div v-show="!beforePullDown" class="pulldown-loading">
        <div v-show="isPullingDown">
          <loading></loading>
        </div>
        <div v-show="!isPullingDown">
          <span>{{ pullDownConfig.txt }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./zui-scroll.js"></script>
<style lang="stylus" scoped>
// 测试
.zui-scroll-wrapper
  position relative
  height 100%
.content-wrapper
  position relative
  z-index 9
// 下拉loading
.pulldown-wrapper
  position absolute
  left 0
  top -50PX
  width 100%
  display flex
  justify-content center
  align-items center
  font-size 14px
  color rgb(153, 153, 153)
  .pulldown-loading
    height 40PX
    display flex
    justify-content center
    align-items center
// 上拉loading
.pullup-wrapper
  display flex
  align-items center
  justify-content center
  .load-more
    flex 1
</style>
