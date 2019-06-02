<template>
  <zui-page :loading="false">
    <cube-button @click="handleShowLoading('ball')"
      >网页loading（一）</cube-button
    >
    <cube-button @click="handleShowLoading('rect')"
      >网页loading（二）</cube-button
    >
  </zui-page>
</template>
<script>
export default {
  name: '',
  data() {
    return {};
  },
  methods: {
    handleShowLoading(type) {
      this.$loading(type);
      setTimeout(() => {
        this.$loading.hide();
      }, 2000);
    },
  },
};
</script>
<style lang="stylus" scoped>
.cube-btn
  margin 20px 0
</style>
