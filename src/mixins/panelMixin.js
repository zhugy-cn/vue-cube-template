export default {
  data() {
    return {
      tabIndex: 0,
      direction: 'left',
    };
  },
  watch: {
    tabIndex(newVal, oldVal) {
      if (newVal > oldVal) {
        this.direction = 'left';
      } else {
        this.direction = 'right';
      }
    },
  },
  computed: {
    currentComponent() {
      return 'panel' + (this.tabIndex + 1);
    },
  },
  methods: {
    // 切换tab
    changeTab() {
      this.cancel('请求被取消了');
      this.isData = true;
      this.isMore = true;
      this.dataList = [];
      this.queryList.page = 1;
      this.getDataList('refresh');
    },
  },
};
