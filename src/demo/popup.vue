<template>
  <zui-page :loading="false">
    <div class="btn-list">
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
  </zui-page>
</template>
<script>
import ZuiPopup from '_com/popup/popup';
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
  methods: {
    handleClickBtn(position) {
      this.position = position;
      this.isPopup = !this.isPopup;
    },
  },
};
</script>
