<template>
  <zui-page :loading="false" title="scroll/pull-down">
    <zui-scroll
      ref="scroll"
      :options="BScrollOptions"
      @pulling-down="onPullingDown"
      >sdasdsadas</zui-scroll
    >
  </zui-page>
</template>

<script>
import ZuiScroll from '_com/zui-scroll/zui-scroll.vue';
export default {
  components: {
    ZuiScroll,
  },
  data() {
    return {
      BScrollOptions: {
        pullDownRefresh: true,
      },
    };
  },
  methods: {
    onPullingDown() {
      console.log('下拉刷新了');
      setTimeout(() => {
        this.$refs.scroll.forceUpdate();
      }, 2000);
    },
  },
};
</script>

<style lang="stylus" scoped></style>
