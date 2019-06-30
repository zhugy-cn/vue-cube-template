<template>
  <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp">
    <slot></slot>
  </mescroll-vue>
</template>
<script>
import MescrollVue from 'mescroll.js/mescroll.vue';
import { getList_api } from '_api/common';

export default {
  name: 'Mall',
  components: {
    MescrollVue,
  },
  data() {
    return {
      goodsList: [],
      mescrollDown: {
        auto: false,
        callback: this.downCallback,
        inited: this._inited,
        afterLoading: this._onAfterLoading,
        beforeLoading: this.beforeLoading,
        htmlContent:
          '<div class="down-loading"><p class="downwarp-progress"></p><p class="downwarp-tip"></p></div><p class="down-success">刷新成功</p>', // 布局内容
      },
      mescrollUp: {
        // 上拉加载的配置.
        callback: this.upCallback,
        isBounce: false,
        lazyLoad: {
          use: true,
        },
        toTop: {
          src: require('./totop.png'),
        },
      },
    };
  },
  beforeRouteEnter(to, from, next) {
    // 如果没有配置回到顶部按钮或isBounce,则beforeRouteEnter不用写
    next(vm => {
      // 找到当前mescroll的ref,调用子组件mescroll-vue的beforeRouteEnter方法
      vm.$refs.mescroll && vm.$refs.mescroll.beforeRouteEnter(); // 进入路由时,滚动到原来的列表位置,恢复回到顶部按钮和isBounce的配置
    });
  },
  beforeRouteLeave(to, from, next) {
    // 如果没有配置回到顶部按钮或isBounce,则beforeRouteLeave不用写
    // 找到当前mescroll的ref,调用子组件mescroll-vue的beforeRouteLeave方法
    this.$refs.mescroll && this.$refs.mescroll.beforeRouteLeave(); // 退出路由时,记录列表滚动的位置,隐藏回到顶部按钮和isBounce的配置
    next();
  },
  methods: {
    async upCallback({ num, size }, mescroll) {
      try {
        let params = {
          page: num,
          limit: size,
        };
        let { list } = await getList_api(params);
        if (num === 1) this.goodsList = [];
        this.goodsList = this.goodsList.concat(list);
        await this.$nextTick();
        mescroll.endSuccess(list.length);
      } catch (error) {
        mescroll.endErr();
      }
    },
    downCallback(mescroll) {
      setTimeout(() => {
        this.upCallback({ num: 1, size: 10 }, mescroll);
      }, 500);
    },
    _inited(mescroll, downwarp) {
      mescroll.downTipDom = downwarp.getElementsByClassName('downwarp-tip')[0];
      mescroll.downProgressDom = downwarp.getElementsByClassName(
        'downwarp-progress',
      )[0];
      mescroll.downLoading = downwarp.getElementsByClassName('down-loading')[0];
      mescroll.downSuccess = downwarp.getElementsByClassName('down-success')[0];
    },
    _onAfterLoading(mescroll) {
      mescroll.downLoading.style.display = 'none';
      mescroll.downSuccess.style.display = 'block';
      setTimeout(() => {
        setTimeout(() => {
          mescroll.downSuccess.style.display = 'none';
          mescroll.downLoading.style.display = 'block';
        }, 300);
      }, 600);
      return 600;
    },
  },
};
</script>
