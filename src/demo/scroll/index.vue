<template>
  <zui-view :loading="false" title="scroll">
    <div class="btn-list">
      <cube-button @click="handleRouterPush('demo1')">scroll</cube-button>
      <cube-button @click="handleRouterPush('demo2')">pull-down</cube-button>
      <cube-button @click="handleRouterPush('demo3')">pull-up</cube-button>
      <cube-button @click="handleRouterPush('demo4')"
        >pull-down and pull-up</cube-button
      >
      <cube-button @click="handleRouterPush('demo5')">recycle-list</cube-button>
      <cube-button @click="handleRouterPush('demo6')">手写下拉刷新</cube-button>
    </div>
  </zui-view>
</template>
<script>
export default {
  name: 'Scroll',
  methods: {
    handleRouterPush(path) {
      path = this.$route.path + '/' + path;
      this.$router.push(path);
    },
  },
};
</script>
