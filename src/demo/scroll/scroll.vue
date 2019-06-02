<template>
  <div class="pulldown">
    <div ref="bsWrapper" class="pulldown-bswrapper">
      <!-- 滚动内容 -->
      <div class="pulldown-scroller">
        <!-- 内容列表 -->
        <ul class="pulldown-list">
          <li v-for="i of dataList" :key="i" class="pulldown-list-item">
            {{ `I am item ${i} ` }}
          </li>
        </ul>
      </div>
    </div>
    <!-- 顶部 loading 区域 -->
    <div class="pulldown-wrapper" ref="pulldown" :style="pullDownStyle">
      <div v-show="beforePullDown">
        <Bubble :y="bubbleY" />
      </div>
      <div v-show="!beforePullDown">
        <div v-show="isPullingDown">
          <span>刷新中...</span>
        </div>
        <div v-show="!isPullingDown">
          <span>刷新成功</span>
        </div>
      </div>
    </div>
    <!-- 底部 loading 区域 -->
  </div>
</template>
<script>
/* eslint-disable vue/no-unused-components */
import Bubble from './bubble';
import BScroll from '@better-scroll/core';
import PullDown from '@better-scroll/pull-down';

BScroll.use(PullDown);

function getOneRandomList() {
  const arr = Array.apply(null, { length: 30 }).map((...args) => args[1]);
  return arr.sort(() => Math.random() - 0.5);
}

const TIME_BOUNCE = 800;
const TIME_STOP = 600;
const THRESHOLD = 70;
const STOP = 56;
export default {
  components: {
    Bubble,
  },
  data() {
    return {
      bubbleY: 0, // 气泡y坐标
      pullDownStyle: {}, // 下拉样式
      pullDownInitTop: 0, // 气泡盒子的top值
      beforePullDown: true, // 下拉之前(初始状态)
      isPullingDown: false, // 正在下拉
      dataList: getOneRandomList(),
    };
  },
  created() {
    this.bscroll = null;
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
    // 促使话
    initBscroll() {
      this.bscroll = new BScroll(this.$refs.bsWrapper, {
        bounceTime: TIME_BOUNCE,
        pullDownRefresh: {
          threshold: THRESHOLD,
          stop: STOP,
        },
      });
      this.bscroll.on('pullingDown', this.pullingDownHandler);
      this.bscroll.on('scroll', this.scrollHandler);
    },
    scrollHandler(pos) {
      const posY = Math.floor(pos.y); // 滚动的y轴位置：Number
      if (this.beforePullDown) {
        const translateY = Math.min(posY, -this.pullDownInitTop);
        this.bubbleY = Math.max(0, posY + this.pullDownInitTop);
        this.pullDownStyle = `transform: translateY(${translateY}px)`;
      } else {
        this.bubbleY = 0;
      }
    },
    // 当下拉的距离大于 threshold 值时，触发一次 pullingDown 钩子。
    async pullingDownHandler() {
      this.beforePullDown = false;
      this.isPullingDown = true;

      // 请求数据
      await this.requestData();

      this.isPullingDown = false;

      this.finishPullDown();
    },
    // 下拉完成
    async finishPullDown() {
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
      }, TIME_BOUNCE);
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
// 下拉气泡
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
</style>
