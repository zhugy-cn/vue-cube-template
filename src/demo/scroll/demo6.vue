<template>
  <zui-page :loading="false" title="scroll/手写下拉刷新">
    <div class="demo6-wrapper">
      <div :style="style" class="pull-refresh" ref="pullRefresh">
        <div
          class="panel-item-wrap border-bottom-1px"
          v-for="(item, index) in dataList"
          :key="item.id"
          :data-index="index"
        >
          <div class="panel__content" @click="handleClick(item.id)">
            <div class="panel__tags">
              <div class="panel__tag">{{ item.age }}m³</div>
              <div class="panel__tag">{{ item.content_type }}</div>
              <div class="panel__tag" v-if="item.sex == 0">到付</div>
            </div>
            <div class="panel__row">
              <div class="label">代收货款</div>
              ：
              <div class="value">¥{{ item.price1 }}</div>
            </div>
            <div class="panel__row">
              <div class="label">寄件地址</div>
              ：
              <div class="value ellipsis">{{ item.start_addr }}</div>
            </div>
            <div class="panel__row">
              <div class="label">收件地址</div>
              ：
              <div class="value ellipsis">{{ item.end_addr }}</div>
            </div>
            <div class="panel__row">
              <div class="label">取件时间</div>
              ：
              <div class="value">
                {{ item.start_time }} 至 {{ (item.end_time + '').slice(-5) }}
              </div>
            </div>
            <div class="panel__remark border-top-1px">
              <div class="ellipsis">备注：{{ item.words || '暂无' }}</div>
            </div>
          </div>
          <div class="panel__footer">
            <div v-if="item.sex == 1" class="left-price active">
              {{ item.status == 1 ? '未揽件' : '已揽件' }}未支付：¥
              <span>{{ item.price || 0 }}</span>
            </div>
            <div v-else class="left-price">
              已揽件并支付：¥
              <span>{{ item.price || 0 }}</span>
            </div>
            <div class="right-staff">揽件员：{{ item.name }}</div>
          </div>
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
import { getList_api } from '_api/common';

export default {
  components: {
    Bubble,
    Loading,
  },
  data() {
    return {
      dataList: [],
      queryList: {
        page: 1,
        limit: 30,
      },
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
    await this.getDataList();
    this.pullRefresh = this.$refs.pullRefresh;
    this._onEvents();
  },

  methods: {
    // 获取数据
    getDataList(type) {
      return new Promise(async resolve => {
        let { page } = this.queryList;
        let params = {
          ...this.queryList,
          status: this.status,
        };
        let { list } = await getList_api(params);
        if (page === 1 && list.length === 0) {
          // 没数据
          this.isData = false;
        } else {
          // 有数据
          this.isData = true;
        }
        await new Promise(resolve => setTimeout(() => resolve(), 300));
        if (type === 'refresh') {
          this.dataList = [];
          this.dataList = list;
        } else {
          this.dataList = this.dataList.concat(list);
        }
        resolve();
      });
    },
    onTouchStart(event) {
      console.log('onTouchStart');
      this.isRebounding &&
        this.pullRefresh.addEventListener('touchmove', this.onTouchMove);
      this._resetTouchStatus();
      this.startY = event.touches[0].clientY;
    },
    onTouchMove(event) {
      if (this._isScrollBarBottom() === 0) {
        const touch = event.touches[0];
        let deltaY = touch.clientY - this.startY;
        if (this.deltaY < 0) return;
        if (event.cancelable) {
          event.preventDefault();
        }
        if (deltaY > 0) {
          this.isRebounding = false;
          deltaY = deltaY * 0.3 + (this.isPullingDown ? this.stop : 0);
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
      }
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
        this._finishPullDown();
      }, 2000);
    },
    _onEvents() {
      this.pullRefresh.addEventListener('touchstart', this.onTouchStart);
      this.pullRefresh.addEventListener('touchend', this.onTouchEnd);
    },
    _offEvents() {
      this.pullRefresh.removeEventListener('touchstart', this.onTouchStart);
      this.pullRefresh.removeEventListener('touchmove', this.onTouchMove);
      this.pullRefresh.removeEventListener('touchend', this.onTouchEnd);
    },
    _resetTouchStatus() {
      this.startY = 0;
      this.deltaY = 0;
    },
    // 初始话下拉刷新，开启下一次下拉刷新
    _finishPullDown() {
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
    _isScrollBarBottom() {
      return this.pullRefresh.scrollTop;
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
  height 100%
  overflow auto
  -webkit-overflow-scrolling touch
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
