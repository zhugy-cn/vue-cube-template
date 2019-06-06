<template>
  <zui-page :loading="false">
    <div class="btn-list">
      <cube-button @click="handleShowLoading('dot')"
        >网页loading（一）</cube-button
      >
      <cube-button @click="handleShowLoading('line')"
        >网页loading（二）</cube-button
      >
    </div>
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
