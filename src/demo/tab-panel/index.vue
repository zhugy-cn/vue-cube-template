<template>
  <zui-view :loading="false" title="tab-panel">
    <div class="btn-list">
      <cube-button @click="handleRouterPush('demo1')">me-scroll</cube-button>
    </div>
  </zui-view>
</template>
<script>
export default {
  name: 'TabPanel',
  methods: {
    handleRouterPush(path) {
      path = this.$route.path + '/' + path;
      this.$router.push(path);
    },
  },
};
</script>
