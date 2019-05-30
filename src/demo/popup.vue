<template>
  <div>
    <my-header></my-header>
    <div class="main-content">
      <cube-button @click="handleClickBtn('center')">中间弹出(一)</cube-button>
      <cube-button @click="handleClickBtn('zoom-center')"
        >中间弹出(二)</cube-button
      >
      <cube-button @click="handleClickBtn('top')">顶部弹出</cube-button>
      <cube-button @click="handleClickBtn('bottom')">底部弹出</cube-button>
      <cube-button @click="handleClickBtn('left')">左边弹出</cube-button>
      <cube-button @click="handleClickBtn('right')">右边弹出</cube-button>

      <zui-popup :visible.sync="isPopup" :position="position"></zui-popup>
    </div>
  </div>
</template>
<script>
import ZuiPopup from '_com/popup/popup';
export default {
  name: 'popup',
  components: {
    ZuiPopup,
  },
  data() {
    return {
      isPopup: false,
      position: '',
    };
  },
  methods: {
    handleClickBtn(position) {
      this.position = position;
      this.isPopup = !this.isPopup;
    },
  },
};
</script>
<style lang="stylus" scoped>
.cube-btn
  margin 20px 0
</style>
