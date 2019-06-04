<template>
  <div>
    <zui-header :title="title"></zui-header>
    <template v-if="loading">
      <!-- 需要显示loading -->
      <transition name="page-fade">
        <div v-show="ready" class="zui-body">
          <slot></slot>
        </div>
      </transition>
    </template>
    <!-- 不需要显示loading -->
    <template v-else>
      <div class="zui-body">
        <slot></slot>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  name: 'ZuiPage',
  props: {
    // 头部loading
    title: {
      type: String,
      default: '',
    },
    // 是否显示loading
    loading: {
      type: Boolean,
      default: true,
    },
    // loading 类型
    loadingType: {
      type: String,
      default: 'ball',
    },
  },
  data() {
    return {
      ready: false,
    };
  },
  created() {
    // 显示loading
    this.loading && this.$pageLoading(this.loadingType);
  },
  methods: {
    onReady() {
      this.ready = true;
    },
  },
};
</script>
<style lang="stylus" scoped>
.zui-body
  height calc(100% - 44px)
  overflow auto
  // 淡入
.page-fade-enter-active
  animation fade-in 0.2s
@keyframes fade-in
  0%
    opacity 0
  100%
    opacity 1
</style>
