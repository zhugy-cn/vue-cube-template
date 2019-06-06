<template>
  <div class="index-page">
    <keep-alive>
      <router-view class="index__content"></router-view>
    </keep-alive>
    <cube-tab-bar
      class="tab-bar__custom border-top-1px"
      :class="{ move: isToggle }"
      v-model="activeTab"
    >
      <cube-tab v-for="(item, index) in tabs" :label="item.label" :key="index">
        <i slot="icon" :class="item.icon"></i>
        {{ item.label }}
      </cube-tab>
    </cube-tab-bar>
  </div>
</template>
<script>
export default {
  name: 'Index',
  data() {
    return {
      isToggle: false,
      tabs: [
        {
          label: '首页',
          icon: 'cubeic-home',
        },
        {
          label: '商店',
          icon: 'cubeic-credit-card',
        },
        {
          label: '购物车',
          icon: 'cubeic-mall',
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
          case 'Home':
            return '首页';
          case 'Mall':
            return '商店';
          case 'ShoppingCart':
            return '购物车';
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
          case '商店':
            route = '/mall';
            break;
          case '购物车':
            route = '/shopping-cart';
            break;
          case '我的':
            route = '/personal';
            break;
        }
        this.$router.push(route);
      },
    },
  },
  beforeRouteUpdate(to, from, next) {
    if (to.matched.length == 2) {
      this.isToggle = false;
    } else {
      this.isToggle = true;
    }
    next();
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
  overflow hidden
.tab-bar__custom
  background #fff
  // transition transform 0.4s
  // &.move
  //   transform translateY(100%) translateZ(0)
  .cube-tab
    flex-box-col(center, center)
    height 50px
    padding 0
    font-size 12px
  i
    font-size 20px
    margin-bottom 2px
</style>
