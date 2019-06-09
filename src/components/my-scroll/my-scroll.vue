<template>
  <div class="my-scroll" ref="scrollWrapper">
    <template v-if="isData">
      <slot></slot>
      <load-more
        ref="loadMore"
        :data-list="dataList"
        :is-more="isMore"
      ></load-more>
    </template>
    <no-data v-else>暂无订单</no-data>
  </div>
</template>

<script>
import LoadMore from '_com/load-more/load-more';
import NoData from '_com/no-data/no-data.vue';
import { throttle } from '@/libs/utils';

export default {
  name: 'MyScroll',
  components: {
    LoadMore,
    NoData,
  },
  props: {
    dataList: {
      type: Array,
      default: () => [],
    },
    isData: {
      type: Boolean,
    },
    isMore: {
      type: Boolean,
    },
    isLoading: {
      type: Boolean,
    },
  },
  mounted() {
    let scrollWrapper = this.$refs.scrollWrapper;
    this.loadMore = this.$refs.loadMore.$el;
    scrollWrapper.addEventListener('scroll', this.onScroll);
  },
  methods: {
    onScroll: throttle(function() {
      if (this.isLoading || !this.isMore) return;
      const windowH = window.innerHeight;
      const { top } = this.loadMore.getBoundingClientRect();
      if (top < windowH + 100) {
        this.$emit('pulling-up');
      }
    }, 100),
  },
};
</script>
<style lang="stylus" scoped>
.my-scroll
  height 100%
  overflow auto
</style>
