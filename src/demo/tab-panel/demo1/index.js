import axios from 'axios';
import { getList_api } from '_api/common';
import MescrollVue from 'mescroll.js/mescroll.vue';
export default {
  components: {
    MescrollVue,
  },
  data() {
    return {
      isInit: true,
      tabIndex: 0,
      tabs: ['全部', '待付款', '待发货', '待收货'],
      dataList: [],
      mescrollDown: {
        offset: 60,
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
        callback: (page, mescroll) => {
          if (this.isInit) {
            setTimeout(() => {
              this.upCallback(page, mescroll);
              this.isInit = false;
            }, 350);
          } else {
            this.upCallback(page, mescroll);
          }
        },
        noMoreSize: 2,
        isBounce: false,
        lazyLoad: {
          use: true,
        },
        toTop: {
          src: require('../../../assets/images/mescroll-topTop.png'),
        },
        empty: {
          warpId: 'listWrap',
          icon: require('../../../assets/images/mescroll-empty.png'),
          tip: '暂无相关数据 ~', //提示
          btntext: '刷新试试 >', //按钮,默认""
          btnClick: () => {
            this.mescroll.resetUpScroll();
          },
        },
      },
    };
  },
  computed: {
    type() {
      switch (this.tabIndex) {
        case 0:
          return 0;
        case 1:
          return 1;
        case 2:
          return 20;
        case 3:
          return 3;
        default:
          return 0;
      }
    },
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
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
    handleChangeTab() {
      this.cancel('cancel');
      this.dataList = [];
      this.mescroll.resetUpScroll();
      this.mescroll.hideTopBtn();
    },
    async upCallback({ num, size }, mescroll) {
      try {
        let params = {
          page: num,
          limit: size,
          type: this.type,
        };
        let CancelToken = axios.CancelToken;
        let { list } = await getList_api(
          params,
          new CancelToken(c => (this.cancel = c)),
        );
        list.forEach(item => (item.isOpen = false));
        if (num === 1) this.dataList = [];
        this.dataList = this.dataList.concat(list);
        await this.$nextTick();
        mescroll.endSuccess(list.length);
      } catch (error) {
        if (error !== 'cancel') {
          mescroll.endErr();
        }
      }
    },
    downCallback(mescroll) {
      setTimeout(() => {
        mescroll.resetUpScroll();
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
