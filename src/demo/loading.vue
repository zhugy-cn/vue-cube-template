<template>
  <zui-page :loading="false">
    <cube-button @click="handleShowLoading('dot')"
      >网页loading（一）</cube-button
    >
    <cube-button @click="handleShowLoading('line')"
      >网页loading（二）</cube-button
    >
  </zui-page>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      loading1: false,
    };
  },
  methods: {
    handleShowLoading(type) {
      this.$pageLoading(type);
      setTimeout(() => {
        this.$pageLoading.hide();
      }, 2000);
    },
  },
};
</script>
<style lang="stylus" scoped>
.cube-btn
  margin 20px 0
</style>
