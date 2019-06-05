<template>
  <div class="load-spinner">
    <span class="spinners" :class="{ slot: hasSlot }" :style="style">
      <i class="spinner" v-for="item in balde" :key="item"></i>
    </span>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ZuiLoading',
  props: {
    size: {
      type: Number,
      default: 24,
    },
  },
  data() {
    return {
      balde: 12,
    };
  },
  computed: {
    style() {
      if (!this.size) return;
      const value = `${this.size}px`;
      return {
        width: value,
        height: value,
      };
    },
    hasSlot() {
      return this.$slots.default;
    },
  },
};
</script>

<style lang="stylus" scoped>
.load-spinner
  color #888
  display flex
  align-items center
  justify-content center
  .spinners
    font-size 12PX
    position relative
    display block
    width 1em
    height 1em
    &.slot
      margin-right 8px
  .spinner
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
