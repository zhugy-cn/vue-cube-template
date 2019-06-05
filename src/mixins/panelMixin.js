export default {
  data() {
    return {
      tabIndex: 0,
    };
  },
  watch: {
    'dataList.length': {
      handler(newVal) {
        if (newVal > 0) {
          this.$pageLoading.hide();
        } else {
          this.$pageLoading('line');
        }
      },
      immediate: true,
    },
  },
  computed: {
    currentComponent() {
      return 'panel' + (this.tabIndex + 1);
    },
  },
  methods: {
    // 切换tab
    async handleChangeTab() {
      this.showScrollBar = true;
      this.cancel('请求被取消了');
      this.isData = true;
      this.isMore = true;
      this.dataList = [];
      this.queryList.page = 1;
      await this.getDataList('refresh');
      this.$refs.scroll.scrollTo(0, 0);
      this.showScrollBar = false;
    },
  },
};
