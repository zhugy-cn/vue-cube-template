<template>
  <div class="load-more">
    <template v-if="isMore">
      <loading :size="20"></loading>
      <p class="load-more-text">{{ text }}</p>
    </template>
    <template v-else>
      <p class="line"></p>
      <p class="no-text">{{ contens.empty || '没有更多数据了' }}</p>
      <p class="line"></p>
    </template>
  </div>
</template>

<script>
import Loading from '../loading/loading';
export default {
  name: 'LoadMore',
  components: {
    Loading,
  },
  props: {
    isMore: {
      type: Boolean,
      default: true,
    },
    dataList: {
      type: Array,
      default: () => [],
    },
    contens: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    text() {
      const { hasData, noData } = this.contens;
      if (this.dataList.length > 0) {
        return hasData || '正在加载更多数据...';
      } else {
        return noData || '加载中...';
      }
    },
  },
};
</script>

<style lang="stylus">
.load-more
  position relative
  display flex
  justify-content center
  align-items center
  line-height 1
.load-more-text
  color #777
  margin-left 10PX
  padding-top 2PX
.no-text
  color #999
  padding 0 10px
.line
  width 20%
  height 1PX
  background-color rgba(153, 153, 153, 0.4)
  transform scaleY(0.6)
</style>
