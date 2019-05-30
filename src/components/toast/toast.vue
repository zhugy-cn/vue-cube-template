<template>
  <transition name="zui-toast-fade">
    <div class="zui-toast" v-show="visible">
      <div
        class="zui-toast__mask"
        :class="{ visible: mask }"
        @click="visible = false"
      ></div>
      <div class="zui-toast__content">
        <div v-if="isLoading" class="zui-loading">
          <span class="zui-loading-spinners">
            <i class="zui-loading-spinner" v-for="item in 12" :key="item"></i>
          </span>
        </div>
        <i
          v-if="!isLoading && iconClass.length"
          class="zui-toast__icon"
          :class="iconClass"
        ></i>
        <div v-show="content" class="zui-toast__tip" v-html="content"></div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'toast',
  data() {
    return {
      mask: false,
      visible: false,
      content: '提示的内容',
      type: '',
    };
  },
  computed: {
    iconClass() {
      const iconClass = [];
      const classMap = {
        success: 'cubeic-right',
        error: 'cubeic-wrong',
        warn: 'cubeic-warn',
      };
      const icon = classMap[this.type];
      if (icon) {
        iconClass.push(icon);
      }
      return iconClass;
    },
    isLoading() {
      return this.type === 'loading';
    },
  },
  methods: {
    show({ content = '提示的内容', type = '', mask = false, time = 2000 }) {
      this.content = content;
      this.type = type;
      this.mask = mask;
      this.visible = true;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.visible = false;
      }, time);
    },
    hide() {
      clearTimeout(this.timer);
      this.visible = false;
    },
  },
};
</script>
<style lang="stylus" scoped>
.zui-toast
  position fixed
  left 0
  right 0
  top 0
  bottom 0
  z-index 100
  pointer-events none
  &__mask
    position absolute
    height 100%
    width 100%
    pointer-events auto
    &.visible
      background-color rgba(37, 38, 45, 0.4)
  &__content
    position absolute
    z-index 99
    top 50%
    left 50%
    transform translate(-50%, -50%)
    display flex
    align-items center
    height 50PX
    padding 0 18PX
    color #ccc
    background-color rgba(37, 38, 45, 0.9)
    border-radius 2PX
.zui-toast__icon
  font-size 28PX
.zui-toast__tip
  line-height 20PX
  font-size 14PX
  max-width 12em
  max-height 40px
  overflow hidden
.zui-toast__icon, .zui-loading
  ~ .zui-toast__tip
    margin-left 8px
.zui-toast-fade-enter-active
  animation toast-in 0.2s
.zui-toast-fade-leave-active
  animation toast-out 0.2s
@keyframes toast-in
  0%
    opacity 0
  100%
    opacity 1
@keyframes toast-out
  0%
    opacity 1
  100%
    opacity 0
// loading
.zui-loading
  font-size 24PX
.zui-loading-spinners
  position relative
  display block
  width 1em
  height 1em
.zui-loading-spinner
  position absolute
  left 44.5%
  top 37%
  width 2PX // for rem
  height 25%
  border-radius 50% / 20%
  opacity 0.25
  background-color currentColor
  animation spinner-fade 1s linear infinite
  for num in (1 .. 12)
    &:nth-child({num})
      animation-delay ((num - 1) / 12)s
      transform rotate(30deg * (num - 6)) translateY(-150%)
@keyframes spinner-fade
  0%
    opacity 0.85
  50%
    opacity 0.25
  100%
    opacity 0.25
</style>
