<template>
  <div class="pulldown">
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
    <!-- 滚动内容 -->
    <div ref="bsWrapper" class="pulldown-bswrapper">
      <div class="pulldown-scroller">
        <!-- 内容列表 -->
        <ul class="pulldown-list">
          <li v-for="i of dataList" :key="i" class="pulldown-list-item">
            {{ `I am item ${i} ` }}
          </li>
        </ul>
        <!-- 底部 loading 区域 -->
        <div class="pullup-wrapper">
          <load-more :data-list="[1]" :is-more="isMore"></load-more>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable vue/no-unused-components */
import Bubble from './bubble';
import Loading from './loading';
import LoadMore from '_com/load-more/load-more';
import BScroll from '@better-scroll/core';
import PullDown from '@better-scroll/pull-down';
import Pullup from '@better-scroll/pull-up';
import ScrollBar from '@better-scroll/scroll-bar';

BScroll.use(PullDown);
BScroll.use(Pullup);
BScroll.use(ScrollBar);

function getOneRandomList() {
  const arr = Array.apply(null, { length: 30 }).map((...args) => args[1]);
  return arr.sort(() => Math.random() - 0.5);
}

const TIME_BOUNCE = 800;
const TIME_STOP = 600;
export default {
  components: {
    Bubble,
    Loading,
    LoadMore,
  },
  props: {
    // 下拉刷新配置
    pullDownConfig: {
      type: [Object, Boolean],
      default: () => ({
        threshold: 90, // 触发 pullingDown 的距离
        stop: 40, // pullingDown 正在刷新 hold 时的距离
        txt: '刷新成功',
      }),
    },
    // 上拉加载配置
    pullUpConfig: {
      type: [Object, Boolean],
      default: () => ({
        threshold: 100, // 提前触发 pullingUp 的距离
        txt: { more: '上拉加载', noMore: '— 我是有底线的 —' },
      }),
    },
    // 滚动条
    scrollbar: {
      type: [Object, Boolean],
      default: () => ({
        fade: true,
        interactive: false,
      }),
    },
  },
  data() {
    return {
      bscroll: null,
      bubbleY: 0, // 气泡y坐标
      pullDownStyle: {}, // 下拉样式
      pullDownInitTop: 0, // 气泡盒子的top值
      beforePullDown: true, // 下拉之前(初始状态)
      isPullingDown: false, // 正在下拉
      isRebounding: false, // 正在回弹

      isPullUpLoad: false, // 上拉加载中
      isMore: true, // 是否还有更多数据
      dataList: getOneRandomList(),
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initBscroll();
      const pullDown = this.$refs.pullDown;
      this.pullDownInitTop =
        parseInt(pullDown && getComputedStyle(pullDown).top) || -50;
    });
  },
  methods: {
    // 初始化
    initBscroll() {
      let options = {
        pullDownRefresh: this.pullDownConfig,
        pullUpLoad: this.pullUpConfig,
        scrollbar: this.scrollbar,
      };
      this.bscroll = new BScroll(this.$refs.bsWrapper, options);
      this.bscroll.on('pullingDown', this.pullingDownHandler);
      this.bscroll.on('pullingUp', this.pullingUpHandler);
      this.bscroll.on('scroll', this.scrollHandler);
    },
    scrollHandler(pos) {
      if (pos.y < 0) return;
      const posY = Math.floor(pos.y); // 滚动的y轴位置：Number
      if (this.beforePullDown) {
        const translateY = Math.min(posY, -this.pullDownInitTop);
        this.pullDownStyle = `transform: translateY(${translateY}px)`;
        this.bubbleY = Math.max(0, posY + this.pullDownInitTop);
      } else {
        this.bubbleY = 0;
      }

      if (this.isRebounding) {
        const translateY = Math.min(posY + 10, this.pullDownConfig.stop + 10); // 50
        this.pullDownStyle = `transform: translateY(${translateY}px)`;
      }
    },
    // 当下拉的距离大于 threshold 值时，触发一次 pullingDown(下拉刷新) 钩子。
    async pullingDownHandler() {
      this.beforePullDown = false;
      this.isPullingDown = true;
      // 请求数据
      await this.requestData();
      this.isPullingDown = false;
      console.log('刷新成功'); // 回弹开始
      this.isRebounding = true;
      this.onFinishPullDown();
    },
    // 下拉完成
    async onFinishPullDown() {
      const stopTime = TIME_STOP;
      await new Promise(resolve => {
        setTimeout(() => {
          // 刷新完毕（初始状态）
          this.bscroll.finishPullDown();
          resolve();
        }, stopTime);
      });
      setTimeout(() => {
        this.beforePullDown = true;
        this.bscroll.refresh();
        this.isRebounding = false;
        this.isMore = true;
        this.bscroll.openPullUp(this.pullDownConfig);
        console.log('下拉完成'); // 回弹结束
        this.pullDownStyle = `transform: translateY(0px)`;
      }, TIME_BOUNCE);
    },

    // ------- 上拉加载 -----------
    async pullingUpHandler() {
      console.log('上拉加载');
      this.isPullUpLoad = true;
      await this.requestData();
      this.bscroll.finishPullUp();
      this.closePullUp();
      this.bscroll.refresh();
      this.isPullUpLoad = false;
    },
    // 关闭上拉加载
    closePullUp() {
      this.isMore = false;
      this.bscroll.closePullUp();
    },

    // 上拉下拉结束，强制重新计算可滚动距离
    // final = true
    forceUpdate() {},

    // 手动触发下拉刷新
    autoPullDownRefresh() {
      this.bscroll && this.bscroll.autoPullDownRefresh();
    },
    // 刷新滚动高度
    refresh() {
      this.bscroll && this.bscroll.refresh();
    },
    // 滚动到指定位置
    scrollTo(x = 0, y = 0, time = this.bounceTime) {
      this.bscroll && this.bscroll.scrollTo(x, y, time);
    },
    // 滚动到顶部
    scrollToTop() {
      this.bscroll && this.scrollTo(0, 0);
    },
    // 滚动到底部
    scrollToBottom() {
      this.bscroll && this.scrollTo(0, this.bscroll.maxScrollY);
    },
    // 获取数据
    async requestData() {
      const newData = await this.ajaxGet(/* url */);
      this.dataList = newData;
    },
    ajaxGet(/* url */) {
      return new Promise(resolve => {
        setTimeout(() => {
          const dataList = getOneRandomList();
          resolve(dataList);
        }, 1000);
      });
    },
  },
};
</script>
<style lang="stylus" scoped>
// 测试
.pulldown
  height 100%
  background-color #fff
.pulldown-bswrapper
  position relative
  height 100%
  border 1px solid #ccc
  overflow hidden
.pulldown-list
  padding 0
.pulldown-list-item
  padding 10px 0
  list-style none
  border-bottom 1px solid #ccc
  background-color #ccc
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
  height 48px
  .load-more
    flex 1
</style>
