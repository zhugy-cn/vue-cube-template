import { getList_api } from '_api/common';
import ZuiScroll from '_com/zui-scroll/zui-scroll.vue';

export default {
  components: {
    ZuiScroll,
  },
  data() {
    return {
      BScrollOptions: {
        pullUpLoad: true,
        pullDownRefresh: true,
      },
      dataList: [],
      isData: true, // 是否有数据
      queryList: {
        page: 1,
        limit: 30,
      },

      preRemoveArray: [], // 被移除的当前页面之前的页面
      nextRemoveArray: [], // 被移除的当前页面后面的页面

      // nextRemoveArray.pop(nextRemoveArray.length - 1);
    };
  },
  async mounted() {
    setTimeout(async () => {
      await this.getDataList();
      await this.$nextTick();
      this.$refs.scroll.refresh();
    }, 300);
  },
  methods: {
    // 获取数据
    getDataList(type) {
      return new Promise(async resolve => {
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
        }
        if (type === 'refresh') {
          this.dataList = [];
          this.dataList = list;
        } else {
          this.dataList = this.dataList.concat(list);
        }
        if (list.length < limit) {
          // 没有下一页
          this.$refs.scroll.forceUpdate(false);
        } else {
          // 还有下一页
          this.$refs.scroll.forceUpdate();
        }
        resolve();
      });
    },
    // 下拉刷新
    async onPullingDown() {
      console.log('下拉刷新');
      this.queryList.page = 1;
      await this.getDataList('refresh');
      console.log('下拉刷新成功');
    },
    // 上拉加载
    async onPullingUp() {
      console.log('上拉加载');
      this.queryList.page++;
      await this.getDataList();
      console.log('上拉加载成功');
    },
    handleClick(id) {
      console.log(id);
    },
  },
};
