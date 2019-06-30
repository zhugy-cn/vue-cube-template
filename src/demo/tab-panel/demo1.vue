<template>
  <div class="demo1-page">
    <cube-tab-bar
      show-slider
      class="cube-tab-bar__custom"
      v-model="tabIndex"
      @change="handleChangeTab"
    >
      <cube-tab v-for="(item, index) in tabs" :label="index" :key="index">
        <div class="zui-tab">{{ item }}</div>
      </cube-tab>
    </cube-tab-bar>
    <div class="tab-panel"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabIndex: 0,
      tabs: ['全部', '待付款', '待发货', '待收货'],
    };
  },
  methods: {
    handleChangeTab() {},
  },
};
</script>
<style lang="stylus" scoped>
.demo1-page
  display flex
  flex-direction column
  .tab-panel
    flex 1
    overflow hidden
.cube-tab-bar__custom
  background-color #fff
  .cube-tab
    color rgba(0, 0, 0, 0.6)
    font-size 16px
    line-height 20px
    padding 15px 0 12px
  .cube-tab_active
    color #000
    font-size 18px
    font-weight 700
</style>
