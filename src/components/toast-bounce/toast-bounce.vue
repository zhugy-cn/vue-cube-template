<template>
  <transition name="zui-bounce">
    <div class="zui-toast" v-show="visible">
      <span class="zui-toast-text">{{ content }}</span>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'toast-bounce',
  data() {
    return {
      visible: false,
      content: '',
    };
  },
  methods: {
    show(content) {
      if (this.visible) return;
      this.content = content;
      this.visible = true;
      this.timer = setTimeout(() => {
        this.visible = false;
      }, 2000);
    },
    hide() {
      this.visible = false;
      clearTimeout(this.timer);
    },
  },
};
</script>
<style lang="stylus" scoped>
.zui-toast
  position fixed
  z-index 9999
  left 0
  bottom 200PX
  width 100%
  text-align center
  .zui-toast-text
    display inline-block
    height 38PX
    line-height 38PX
    font-size 13PX
    border-radius 2PX
    padding 0 20PX
    word-break break-all
    box-sizing border-box
    // color #fff
    // background-color rgba(0, 0, 0, 0.7)
    color rgb(204, 204, 204)
    background-color rgba(37, 38, 45, 0.9)
.zui-bounce-enter-active
  animation bounceInUp 0.3s
@keyframes bounceInUp
  from, 60%, 75%, 90%, to
    animation-timing-function cubic-bezier(0.215, 0.61, 0.355, 1)
  from
    opacity 0
    transform translate3d(0, 200%, 0)
  60%
    opacity 1
    transform translate3d(0, -10PX, 0)
  75%
    transform translate3d(0, 3PX, 0)
  90%
    transform translate3d(0, -3PX, 0)
  to
    transform translate3d(0, 0, 0)
</style>
