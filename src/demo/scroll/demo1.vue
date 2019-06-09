<template>
  <zui-page :loading="false" title="scroll/scroll">
    <zui-scroll :scroll-events="scrollEvents" @scroll="onScroll">
      按时大撒大撒
    </zui-scroll>
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
      scrollEvents: ['scroll'],
    };
  },
  methods: {
    onScroll(pos) {
      console.log(pos);
    },
  },
};
</script>

<style lang="stylus" scoped></style>
