<template>
  <zui-page>
    <cube-button @click="handleClickBtn('center')">中间弹出(一)</cube-button>
    <cube-button @click="handleClickBtn('zoom-center')"
      >中间弹出(二)</cube-button
    >
    <cube-button @click="handleClickBtn('top')">顶部弹出</cube-button>
    <cube-button @click="handleClickBtn('bottom')">底部弹出</cube-button>
    <cube-button @click="handleClickBtn('left')">左边弹出</cube-button>
    <cube-button @click="handleClickBtn('right')">右边弹出</cube-button>
    <cube-button @click="ajax">请求</cube-button>

    <zui-popup :visible.sync="isPopup" :position="position"></zui-popup>
  </zui-page>
</template>
<script>
import ZuiPopup from '_com/popup/popup';
import { test_api } from '_api/common';
export default {
  name: 'Popup',
  components: {
    ZuiPopup,
  },
  data() {
    return {
      isPopup: false,
      position: '',
    };
  },
  async created() {
    await test_api();
    this.$loading.hide();
  },
  methods: {
    handleClickBtn(position) {
      this.position = position;
      this.isPopup = !this.isPopup;
    },
    async ajax() {
      this.$toast();
      await test_api();
      this.$toast.hide();
    },
  },
};
</script>
<style lang="stylus" scoped>
.cube-btn
  margin 20px 0
</style>
