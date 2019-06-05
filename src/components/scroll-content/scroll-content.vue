<template>
  <div class="scroll-content">
    <template v-if="isData">
      <slot></slot>
      <load-more
        class="load-more"
        v-show="showLoadingMore"
        :is-more="isMore"
        :data-list="dataList"
      ></load-more>
    </template>
    <no-data v-else></no-data>
  </div>
</template>

<script>
import LoadMore from '../load-more/load-more';
import NoData from '../no-data/no-data';
export default {
  name: 'ScrollContent',
  components: {
    NoData,
    LoadMore,
  },
  props: {
    showLoadingMore: {
      type: Boolean,
      default: true,
    },
    isData: {
      type: Boolean,
      default: true,
    },
    isMore: {
      type: Boolean,
      default: true,
    },
    dataList: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
<style lang="stylus" scoped>
.load-more
  padding 12px 0
</style>
