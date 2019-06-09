import { getList_api } from '_api/common';
import MyScroll from '_com/my-scroll/my-scroll.vue';
export default {
  components: {
    MyScroll,
  },
  data() {
    return {
      dataList: [],
      isData: true, // 是否有数据
      isLoading: false, // 是否正在加载中
      isMore: true, // 是否还有下一页
      queryList: {
        page: 1,
        limit: 30,
      },
    };
  },
  async mounted() {
    await this.getDataList();
  },
  methods: {
    // 获取数据
    getDataList(type) {
      return new Promise(async resolve => {
        this.isLoading = true;
        let { page, limit } = this.queryList;
        let params = {
          ...this.queryList,
          status: this.status,
        };
        let { data: list } = await getList_api(params);
        if (page === 1 && list.length === 0) {
          // 没数据
          this.isData = false;
        } else {
          // 有数据
          this.isData = true;
          if (list.length < limit) {
            // 没有下一页
            this.isMore = false;
          } else {
            this.isMore = true;
            // 还有下一页
          }
        }
        if (type === 'refresh') {
          this.dataList = [];
          this.dataList = list;
        } else {
          this.dataList = this.dataList.concat(list);
        }
        this.isLoading = false;
        resolve();
      });
    },
    // 上拉加载
    async onPullingUp() {
      console.log('上拉加载');
      this.queryList.page++;
      await this.getDataList();
      console.log('上拉加载成功');
    },
  },
};
