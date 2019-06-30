/* eslint-disable vue/no-unused-components */
import Bubble from './bubble';
import Loading from './loading';
import LoadMore from '_com/load-more/load-more';
import BScroll from '@better-scroll/core';
import PullDown from '@better-scroll/pull-down';
import PullUp from '@better-scroll/pull-up';
import ScrollBar from '@better-scroll/scroll-bar';
import { camelize } from '@/libs/utils';

BScroll.use(PullDown);
BScroll.use(PullUp);
BScroll.use(ScrollBar);

// 滚动事件
const EVENT_SCROLL = 'scroll';
const EVENT_BEFORE_SCROLL_START = 'before-scroll-start';
const EVENT_SCROLL_END = 'scroll-end';
const SCROLL_EVENTS = [
  EVENT_SCROLL,
  EVENT_BEFORE_SCROLL_START,
  EVENT_SCROLL_END,
];

// 下拉刷新
const EVENT_PULLING_DOWN = 'pulling-down';
const EVENT_PULLING_UP = 'pulling-up';

// 默认配置
const DEFAULT_OPTIONS = {
  click: true,
  scrollbar: false, // 滚动条
  pullDownRefresh: false, // 下拉刷新
  pullUpLoad: false, // 上拉加载
};
export default {
  components: {
    Bubble,
    Loading,
    LoadMore,
  },
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    // better-scroll 配置
    options: {
      type: Object,
      default: () => ({}),
    },
    // 需要监听的滚动事件
    scrollEvents: {
      type: Array,
      default() {
        return [];
      },
      validator(arr) {
        return arr.every(item => {
          return SCROLL_EVENTS.indexOf(item) !== -1;
        });
      },
    },
    // 内容不够时是否需要回弹效果
    bounce: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      scroll: null,
      bubbleY: 0, // 气泡y坐标
      pullDownStyle: {}, // 下拉样式
      pullDownInitTop: 0, // 气泡盒子的top值
      beforePullDown: true, // 下拉之前(初始状态)
      isPullingDown: false, // 正在下拉
      isRebounding: false, // 正在回弹
      isPullUpLoad: false, // 上拉加载中
      isMore: true, // 是否还有更多数据
    };
  },
  computed: {
    pullDownConfig() {
      let { pullDownRefresh } = this.options;
      if (pullDownRefresh === true) {
        pullDownRefresh = {};
      }
      return {
        threshold: 90, // 配置顶部下拉的距离来决定刷新时机
        stop: 40, // 回弹停留的距离
        stopTime: 600, // 刷新成功的文字显示时间
        txt: '刷新成功', // 刷新成功的文字
        ...pullDownRefresh,
      };
    },
    // 是否需要监听滚动
    needListenScroll() {
      return this.scrollEvents.indexOf(EVENT_SCROLL) !== -1;
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initScroll();
      const pullDown = this.$refs.pullDown;
      // 盒子的 top：-50
      this.pullDownInitTop =
        parseInt(pullDown && getComputedStyle(pullDown).top) || -50;
    });
  },
  methods: {
    // 初始化
    initScroll() {
      // 下拉刷新（内容不够）的回弹效果
      this._calculateMinHeight();
      // 合并参数
      const options = {
        ...DEFAULT_OPTIONS,
        ...this.options,
        probeType: this.needListenScroll ? 3 : 1,
      };
      const { pullDownRefresh, pullUpLoad } = options;
      this.scroll = new BScroll(this.$refs.wrapper, options);
      // 根据参数派发对应的事件给父组件
      this._listenScrollEvents();
      // 下拉刷新
      if (pullDownRefresh) {
        this._onPullDownRefresh();
      }
      // 上拉加载
      if (pullUpLoad) {
        this._onPullUpLoad();
      }
    },
    // 刷新
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    // 禁用 BetterScroll
    disable() {
      this.scroll && this.scroll.disable();
    },
    // 启用 BetterScroll
    enable() {
      this.scroll && this.scroll.enable();
    },
    // 监听下拉刷新
    _onPullDownRefresh() {
      this.scroll.on('pullingDown', this._pullDownHandle);
      this.scroll.on('scroll', this._pullDownScrollHandle);
    },
    // 监听上拉加载
    _onPullUpLoad() {
      this.scroll.on('pullingUp', this._pullUpHandle);
    },
    // 当下拉的距离大于 threshold 值时，触发一次 pullingDown(下拉刷新) 钩子。
    _pullDownHandle() {
      if (this.resetPullDownTimer) {
        clearTimeout(this.resetPullDownTimer);
      }
      this.scroll.disable(); // 禁止滚动

      this.beforePullDown = false;
      this.isPullingDown = true;
      this.$emit(EVENT_PULLING_DOWN);
    },
    // 下拉刷新会自动派发滚动( probeType = 3 )
    _pullDownScrollHandle(pos) {
      if (pos.y < 0) {
        this.pullDownStyle = `transform: translateY(0px)`;
        return;
      }
      const posY = Math.floor(pos.y); // 滚动的y轴位置：Number
      if (this.beforePullDown) {
        const translateY = Math.min(posY, -this.pullDownInitTop);
        this.pullDownStyle = `transform: translateY(${translateY}px)`;
        this.bubbleY = Math.max(0, posY + this.pullDownInitTop);
      } else {
        this.bubbleY = 0;
      }
      // 开始回弹了
      if (this.isRebounding) {
        const translateY = Math.min(posY + 10, this.pullDownConfig.stop + 10); // // 盒子的 top：-50，最大 50
        this.pullDownStyle = `transform: translateY(${translateY}px)`;
      }
    },
    // ------- 上拉加载触发 -----------
    _pullUpHandle() {
      if (this.isMore) {
        this.isPullUpLoad = true;
        this.$emit(EVENT_PULLING_UP);
      } else {
        this.scroll.finishPullUp();
      }
    },
    // 数据请求完毕，上拉下拉结束，强制重新计算可滚动距离
    // isMore 表示是否还有下一页
    async forceUpdate(isMore = true) {
      this.isMore = isMore;
      const { pullDownRefresh, pullUpLoad } = this.options;
      // 有下拉刷新并且正处于刷新状态
      if (pullDownRefresh && this.isPullingDown) {
        this.isPullingDown = false;
        this.isRebounding = true;
        // 将下拉刷新恢复成可刷新的初始状态
        await this._reboundPullDown();
        // 将气泡回弹恢复成初始状态
        await this._afterPullDown();
        this.scroll.enable(); // 开启滚动
      } else if (pullUpLoad && this.isPullUpLoad) {
        this.isPullUpLoad = false;
        this.scroll.finishPullUp(); // 准备下一次上拉加载
      }
      await this.$nextTick();
      this.refresh();
    },
    // 下拉刷新数据请求完毕开始回弹成初始状态准备下一次下拉刷新
    _reboundPullDown() {
      return new Promise(resolve => {
        const { stopTime } = this.pullDownConfig;
        setTimeout(() => {
          // 刷新完毕（初始状态）
          this.scroll.finishPullDown();
          resolve();
        }, stopTime);
      });
    },
    // 下拉刷新数据请求完毕将气泡恢复成初始状态
    _afterPullDown() {
      return new Promise(resolve => {
        const { bounceTime } = this.scroll.options;
        this.resetPullDownTimer = setTimeout(() => {
          this.beforePullDown = true;
          this.isRebounding = false;
          this.pullDownStyle = `transform: translateY(0px)`;
          resolve();
        }, bounceTime);
      });
    },
    // 下拉刷新（内容不够）的回弹效果
    _calculateMinHeight() {
      const { pullDownRefresh } = this.options;
      this.$refs.listWrapper.style.minHeight =
        pullDownRefresh || this.bounce
          ? `${this.$refs.wrapper.offsetHeight + 1}px`
          : 0;
    },
    // 触发父组件监听的事件
    _listenScrollEvents() {
      this.scrollEvents.forEach(event => {
        this.scroll.on(camelize(event), (...args) => {
          this.$emit(event, ...args);
        });
      });
    },
  },
};
