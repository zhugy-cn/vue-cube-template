import axios from 'axios';

export default {
  data() {
    return {
      autoList: true,
      dataList: [],
      isData: true, // 是否有数据
      isLoading: false, // 是否正在加载中
      isMore: true, // 是否还有下一页
      queryList: {
        page: 1,
        limit: 10,
      },
    };
  },
  async created() {
    if (this.autoList) {
      await this.getDataList();
      this.$nextTick(() => {
        this.$refs.scroll && this.$refs.scroll.refresh();
      });
    }
  },
  methods: {
    // 加载下一页
    onLoadNextPage() {
      this.queryList.page++;
      this.getDataList();
    },
    // 获取数据
    getDataList(type) {
      return new Promise(async resolve => {
        this.isLoading = true;
        let CancelToken = axios.CancelToken;
        let { page, pagesize } = this.queryList;
        let params = {
          ...this.queryList,
          status: this.status,
        };
        // 请求之前钩子
        if (this._beforeGetList) {
          this._beforeGetList();
        }
        let { data: list } = await this.getList_api(
          params,
          new CancelToken(c => (this.cancel = c)),
        );
        if (page === 1 && list.length === 0) {
          // 没数据
          this.isData = false;
        } else {
          // 有数据
          this.isData = true;
          if (list.length < pagesize) {
            // 没有下一页
            this.isMore = false;
          } else {
            this.isMore = true;
            // 还有下一页
          }
        }
        // 请求之后钩子
        if (this._afterGetList) {
          this._afterGetList(list);
        }
        if (type === 'refresh') {
          this.dataList = [];
          this.dataList = list;
        } else {
          this.dataList = this.dataList.concat(list);
        }
        this.isLoading = false;
        // 赋值之后钩子
        if (this._afterData) {
          this._afterData();
        }
        resolve();
      });
    },
  },
};
