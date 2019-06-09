<template>
  <div class="cube-recycle-list">
    <div class="cube-recycle-list-main">
      <!-- 外层盒子 -->
      <div class="cube-recycle-list-items" :style="{ height: heights + 'px' }">
        <!-- 每一项 -->
        <div
          :key="index"
          v-for="(item, index) in visibleItems"
          class="cube-recycle-list-item"
          :style="{ transform: 'translate(0,' + item.top + 'px)' }"
        >
          <div :style="{ opacity: item.loaded }">
            <slot name="item" :data="item.data"></slot>
          </div>
        </div>

        <!-- preloads item for get its height, remove it after caculating height -->
        <div class="cube-recycle-list-pool">
          <template v-for="(item, index) in items">
            <div
              :key="index"
              :ref="'preloads' + index"
              class="cube-recycle-list-item cube-recycle-list-invisible"
              v-if="item && !item.isTombstone && !item.height"
            >
              <slot name="item" :data="item.data"></slot>
            </div>
          </template>
        </div>
      </div>

      <!-- 底部 loading -->
      <div
        v-if="!noMore"
        class="cube-recycle-list-loading"
        :style="{ visibility: loading ? 'visible' : 'hidden' }"
      >
        <slot name="spinner">
          <div class="cube-recycle-list-loading-content">
            <cube-loading class="cube-recycle-list-spinner"></cube-loading>
          </div>
        </slot>
      </div>

      <!-- 没有数据了 -->
      <div v-show="noMore" class="cube-recycle-list-noMore">
        <slot name="noMore">没有数据了</slot>
      </div>
    </div>
    <!-- <div class="cube-recycle-list-fake"></div> -->
  </div>
</template>

<script>
import CubeLoading from '../loading/loading';

const COMPONENT_NAME = 'cube-recycle-list';
const EVENT_SCROLL = 'scroll';
const EVENT_RESIZE = 'resize';

export default {
  name: COMPONENT_NAME,
  data() {
    return {
      items: [], // 所有的信息（数据跟一些其他的描述，loaded top 等）
      heights: 0, // 列表的高度
      startIndex: 0, // 开始索引
      loadings: [],
      noMore: false, // 是否还有数据
    };
  },
  props: {
    size: {
      type: Number,
      default: 20,
    },
    offset: {
      type: Number,
      default: 100,
    },
    onFetch: {
      type: Function,
      required: true,
    },
  },
  computed: {
    // 根据开始索引跟结束索引计算出可视区域的数据
    visibleItems() {
      return this.items.slice(
        Math.max(0, this.startIndex - this.size),
        Math.min(this.items.length, this.startIndex + this.size),
      );
    },
    loading() {
      return this.loadings.length;
    },
  },
  created() {
    this.list = []; // 所有的数据
    this.promiseStack = []; // 保存所有的 promise 栈
  },
  mounted() {
    setTimeout(() => {
      this.$el.addEventListener(EVENT_SCROLL, this._onScroll);
      window.addEventListener(EVENT_RESIZE, this._onResize);
      this.load();
    }, 300);
  },
  beforeDestroy() {
    this.$el.removeEventListener(EVENT_SCROLL, this._onScroll);
    window.removeEventListener(EVENT_RESIZE, this._onResize);
  },
  methods: {
    load() {
      if (!this.loading) {
        this.getItems();
      }
    },
    getItems() {
      console.clear();
      console.log('getItem ---- 获取数据');
      const index = this.promiseStack.length;
      const promiseFetch = this.onFetch();
      this.loadings.push('pending');
      this.promiseStack.push(promiseFetch);
      promiseFetch.then(res => {
        this.loadings.pop(); // 返回数组最后一个
        /* istanbul ignore if */
        if (res) {
          if (res.length < this.size) {
            this.stopScroll(index);
            return;
          }
          this.setList(index, res);
          this.loadItemsByIndex(index);
        } else {
          this.stopScroll(index);
        }
      });
    },
    // 当没有下一页或者没有数据的时候
    stopScroll(index) {
      console.log('stopScroll');
      this.noMore = true;
      this.removeUnusedTombs(this.items.slice(0), index);
      this.updateItemTop();
      this.updateStartIndex();
    },
    removeUnusedTombs(copy, index) {
      let cursor;
      let size = this.size;
      let start = index * size;
      let end = (index + 1) * size;
      for (cursor = start; cursor < end; cursor++) {
        if (copy[cursor] && copy[cursor].isTombstone) break;
      }
      this.items = copy.slice(0, cursor);
    },
    // 将这次加载的数据与以前保存的数据相连接
    setList(index, res) {
      console.log('setList ---- 将这次加载的数据与以前保存的数据相连接');
      this.list = this.list.concat(res);
      // const list = this.list;
      // const baseIndex = index * this.size;
      // for (let i = 0; i < res.length; i++) {
      //   list[baseIndex + i] = res[i];
      // }
    },
    // 获取最后一次加载数据的开始与结束索引  20 -30
    loadItemsByIndex(index) {
      console.log('loadItemsByIndex ---- 获取最后一次加载数据的开始与结束索引');
      const size = this.size;
      const start = index * size;
      const end = (index + 1) * size;
      this.loadItems(start, end);
    },
    // 组成新的数据列表
    loadItems(start, end) {
      console.log('loadItems ---- 组成新的数据列表');
      const items = this.items;
      let promiseTasks = [];
      let item;
      for (let i = start; i < end; i++) {
        item = items[i];
        /* istanbul ignore if */
        if (item && item.loaded) {
          continue;
        }
        this.setItem(i, this.list[i]);
        // get each item's height in nextTick

        promiseTasks.push(
          this.$nextTick().then(() => {
            this.updateItemHeight(i);
          }),
        );
      }

      // update items top and full list height
      window.Promise.all(promiseTasks).then(() => {
        this.updateItemTop();
        this.updateStartIndex();
      });
    },
    // 设置 items(新数据) 的每一项，重新组成新的数据列表
    setItem(index, data) {
      console.log(
        'setItem ---- 设置 items(新数据) 的每一项，添加一些其他描述字段',
      );
      this.$set(this.items, index, {
        data: data || {},
        height: 0,
        top: -1000,
        isTombstone: !data,
        loaded: data ? 1 : 0,
      });
    },
    // 获取并保存每一项的高度
    updateItemHeight(index) {
      console.log('updateItemHeight ---- 获取并保存每一项的高度');
      let cur = this.items[index];
      let dom = this.$refs['preloads' + index];
      if (dom && dom[0]) {
        cur.height = dom[0].offsetHeight;
      } else {
        console.log('没有找到 dom');
      }
    },
    // 设置每一项的 top 值和计算列表的总高度
    updateItemTop() {
      console.log(
        'updateItemTop ---- 根据保存的高度设置每一项的 top 值和计算列表的总高度',
      );
      let heights = 0;
      const items = this.items;
      let pre;
      let current;
      for (let i = 0; i < items.length; i++) {
        pre = items[i - 1];
        current = items[i];
        if (!items[i]) {
          heights += 0;
        } else {
          current.top = pre ? pre.top + pre.height : 0;
          heights += current.height;
        }
      }
      this.heights = heights;
    },
    // 更新开始索引
    updateStartIndex() {
      console.log(
        'updateStartIndex ---- 更新开始索引，根据计算属性来获取可视区展示的数据',
      );
      // update visible items start index
      let top = this.$el.scrollTop;
      let item;
      const items = this.items;
      for (let i = 0; i < items.length; i++) {
        item = items[i];
        if (!item || item.top > top) {
          this.startIndex = Math.max(0, i - 1);
          break;
        }
      }
    },
    reset() {
      const map = [
        {
          key: 'items',
          value: [],
        },
        {
          key: 'heights',
          value: 0,
        },
        {
          key: 'startIndex',
          value: 0,
        },
        {
          key: 'loadings',
          value: [],
        },
        {
          key: 'noMore',
          value: false,
        },
        {
          key: 'list',
          value: [],
        },
        {
          key: 'promiseStack',
          value: [],
        },
      ];
      map.forEach(({ key, value }) => {
        this[key] = value;
      });
      this.$el.scrollTop = 0;
      this.load();
    },
    _onScroll() {
      // trigger load
      if (
        !this.noMore &&
        this.$el.scrollTop + this.$el.offsetHeight > this.heights - this.offset
      ) {
        this.load();
      }
      this.updateStartIndex();
    },
    _onResize() {
      const items = this.items;
      items.forEach(item => {
        item.loaded = false;
      });
      this.loadItems(0, items.length);
    },
  },
  components: {
    CubeLoading,
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.cube-recycle-list
  position relative
  height 100%
  overflow-x hidden
  overflow-y auto
  -webkit-overflow-scrolling touch
.cube-recycle-list-main
  min-height 100%
.cube-recycle-list-fake
  height 1px
.cube-recycle-list-invisible
  top -1000px
  visibility hidden
.cube-recycle-list-item
  width 100%
  position absolute
  box-sizing border-box
.cube-recycle-list-transition
  position absolute
  opacity 0
  transition-property opacity
  transition-duration 500ms
.cube-recycle-list-loading
  overflow hidden
.cube-recycle-list-loading-content
  text-align center
.cube-recycle-list-spinner
  margin 10px auto
  display flex
  justify-content center
</style>
