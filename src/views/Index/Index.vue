<template>
  <div class="index-page">
    <keep-alive>
      <router-view class="index__content"></router-view>
    </keep-alive>
    <cube-tab-bar class="tab-bar__custom border-top-1px" v-model="activeTab">
      <cube-tab v-for="(item, index) in tabs" :label="item.label" :key="index">
        <i slot="icon" :class="item.icon"></i>
        {{ item.label }}
      </cube-tab>
    </cube-tab-bar>
  </div>
</template>
<script>
export default {
  name: 'index',
  data() {
    return {
      tabs: [
        {
          label: '首页',
          icon: 'cubeic-home',
        },
        {
          label: '购物',
          icon: 'cubeic-credit-card',
        },
        {
          label: '我的',
          icon: 'cubeic-person',
        },
      ],
    };
  },
  computed: {
    activeTab: {
      get() {
        let routeName = this.$route.name;
        switch (routeName) {
          case 'home':
            return '首页';
          case 'mall':
            return '购物';
          default:
            return '我的';
        }
      },
      set(val) {
        let route = '';
        switch (val) {
          case '首页':
            route = '/home';
            break;
          case '购物':
            route = '/mall';
            break;
          case '我的':
            route = '/personal';
            break;
        }
        this.$router.push(route);
      },
    },
  },
};
</script>

<style lang="stylus" scoped>
.index-page
  height 100%
  display flex
  flex-direction column
  .index__content
    flex 1
    overflow auto
  .tab-bar__custom
    background #fff
    .cube-tab
      flex-box-col(center, center)
      height 50px
      padding 0
      font-size 12px
    i
      font-size 20px
      margin-bottom 2px
</style>
