<template>
  <zui-page :loading="false">
    <div class="btn-list">
      <cube-button @click="handleToastBounce">toast-bounce</cube-button>
      <cube-button @click="handleToastText">toast-text</cube-button>
      <cube-button @click="handleToastLoading">toast-loading</cube-button>
      <cube-button @click="handleToastSuccess">toast-success</cube-button>
      <cube-button @click="handleToastError">toast-error</cube-button>
      <cube-button @click="handleToastWarn">toast-warn</cube-button>
      <cube-button @click="handleToastMask">toast-mask</cube-button>
    </div>
  </zui-page>
</template>
<script>
export default {
  methods: {
    handleToastBounce() {
      this.$toastBounce();
    },
    handleToastText() {
      this.$toast({ type: '', content: '自定义的提示' });
    },
    handleToastLoading() {
      // 不传 type 默认是 loading
      this.$toast('自定义的提示');
    },
    handleToastSuccess() {
      this.$toast({ type: 'success', content: '自定义的提示' });
    },
    handleToastError() {
      this.$toast({ type: 'error', content: '自定义的提示' });
    },
    handleToastWarn() {
      this.$toast({ type: 'warn', content: '自定义的提示' });
    },
    handleToastMask() {
      this.$toast({ type: 'loading', content: '自定义的提示', mask: true });
    },
  },
};
</script>
