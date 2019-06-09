<template>
  <zui-page :loading="false" title="scroll/手写下拉刷新">
    <div class="demo6-wrapper">
      <div :style="style" class="pull-refresh" ref="pullRefresh">
        <!-- 顶部 loading 区域 -->
      </div>
      <div class="pulldown-wrapper" ref="pulldown" :style="pullDownStyle">
        <div v-show="beforePullDown">
          <Bubble :y="bubbleY" />
        </div>
        <div v-show="!beforePullDown" class="pulldown-loading">
          <div v-show="isPullingDown">
            <loading></loading>
          </div>
          <div v-show="!isPullingDown">
            <span>加载成功</span>
          </div>
        </div>
      </div>
    </div>
  </zui-page>
</template>

<script>
import Bubble from './bubble';
import Loading from './loading';

export default {
  components: {
    Bubble,
    Loading,
  },
  data() {
    return {
      threshold: 70, // 顶部下拉的距离来决定刷新的时机
      stop: 40, // 回弹停留距离顶部的距离
      stopTime: 600, // 刷新文字成功停留时间
      bounceTime: 400, // 回弹时间
      style: {},
      startY: 0,
      deltaY: 0,
      state: 0,
      bubbleY: 0,
      isPullingDown: false, // 是否刷新中
      beforePullDown: true, // 下拉之前(初始状态)
      isRebounding: true, // 是否回弹到初始位置
      pullDownStyle: {}, //下拉样式
    };
  },
  async mounted() {
    await this.$nextTick();
    this.pullRefresh = this.$refs.pullRefresh;
    this._onEvents();
  },
  methods: {
    _onEvents() {
      this.pullRefresh.addEventListener('touchstart', this.onTouchStart);
      this.pullRefresh.addEventListener('touchend', this.onTouchEnd);
    },
    _offEvents() {
      this.pullRefresh.removeEventListener('touchstart', this.onTouchStart);
      this.pullRefresh.removeEventListener('touchmove', this.onTouchMove);
      this.pullRefresh.removeEventListener('touchend', this.onTouchEnd);
    },
    resetTouchStatus() {
      this.startY = 0;
      this.deltaY = 0;
    },
    onTouchStart(event) {
      console.log('onTouchStart');
      this.isRebounding &&
        this.pullRefresh.addEventListener('touchmove', this.onTouchMove);
      this.resetTouchStatus();
      this.startY = event.touches[0].clientY;
    },
    onTouchMove(event) {
      const touch = event.touches[0];
      let deltaY = touch.clientY - this.startY;
      if (this.deltaY < 0) return;
      event.preventDefault();
      console.log('onTouchMove');
      if (deltaY > 0) {
        this.isRebounding = false;
        deltaY = deltaY * 0.25 + (this.isPullingDown ? this.stop : 0);
        this.bubbleY = deltaY;
        this.style = {
          transform: `translate3d(0,${deltaY}px, 0)`,
        };
        if (!this.isPullingDown) {
          const translateY = Math.min(deltaY, 50);
          this.pullDownStyle = `transform: translateY(${translateY}px)`;
          this.bubbleY = Math.max(0, deltaY - 50);
        }
      }
      this.deltaY = deltaY;
    },
    onTouchEnd() {
      if (this.deltaY <= 0) return;
      this.bubbleY = 0;
      console.log('onTouchEnd');
      let deltaY = this.deltaY + (this.isPullingDown ? this.stop : 0);
      if (deltaY >= this.threshold) {
        this.style = {
          transition: `${this.bounceTime}ms`,
          transform: `translate3d(0,${this.stop}px, 0)`,
        };
        !this.isPullingDown && this.pullingDown();
      } else {
        this.pullDownStyle = `transform: translateY(0px);transition: ${
          this.bounceTime
        }ms`;
        this.style = {
          transition: `${this.bounceTime}ms`,
          transform: 'translate3d(0,0, 0)',
        };
      }
    },
    // 触发下拉刷新
    pullingDown() {
      this.isPullingDown = true;
      this.beforePullDown = false;
      setTimeout(() => {
        this.finishPullDown();
      }, 2000);
    },
    // 初始话下拉刷新，开启下一次下拉刷新
    finishPullDown() {
      this.pullRefresh.removeEventListener('touchmove', this.onTouchMove);
      this.deltaY = 0;
      this.bubbleY = 0;
      this.isPullingDown = false;
      this.isRebounding = true;
      setTimeout(() => {
        setTimeout(() => {
          this.beforePullDown = true;
        }, this.bounceTime);
        this.style = {
          transition: `${this.bounceTime}ms`,
          transform: 'translate3d(0,0, 0)',
        };
        this.pullDownStyle = `transform: translateY(0px);transition: ${
          this.bounceTime
        }ms`;
      }, this.stopTime);
    },
  },
};
</script>

<style lang="stylus" scoped>
.demo6-wrapper
  height 100%
  position relative
.pull-refresh
  position relative
  height 300%
  background-color red
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
</style>
