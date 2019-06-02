<template>
  <div class="shopping-cart">
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
    <div class="panel-list">
      <keep-alive>
        <component :is="currentComponent"></component>
      </keep-alive>
    </div>
  </div>
</template>
<script>
import { getList_api } from '_api/common';

const context = require.context(`./`, false, /(?=panel).*?.vue$/);
const modules = {};
context.keys().forEach(item => {
  const fileName = item.slice(2, -4);
  const fileModule = context(item).default;
  modules[fileName] = fileModule;
});

export default {
  name: 'ShoppingCart',
  components: {
    ...modules,
  },
  data() {
    return {
      tabIndex: 0,
      tabs: ['全部', '待付款', '待发货', '待收货'],
    };
  },
  computed: {
    currentComponent() {
      return 'panel' + (this.tabIndex + 1);
    },
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      await getList_api();
    },
    handleChangeTab() {},
  },
};
</script>
<style lang="stylus" scoped>
.shopping-cart
  position relative
.cube-tab-bar__custom
  .cube-tab
    padding 0
    height 50px
    line-height 50px
    background-color #fff
.panel-list
  position absolute
  top 50px
  bottom 0
  left 0
  right 0
</style>
