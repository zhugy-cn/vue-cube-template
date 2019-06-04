import { getList_api } from '_api/common';
import getListMixin from '@/mixins/getListMixin';
import panelMixin from '@/mixins/panelMixin';

const context = require.context(`./`, false, /(?=panel).*?.vue$/);
const modules = {};
context.keys().forEach(item => {
  const fileName = item.slice(2, -4);
  const fileModule = context(item).default;
  modules[fileName] = fileModule;
});

export default {
  name: 'ShoppingCart',
  mixins: [getListMixin, panelMixin],
  components: {
    ...modules,
  },
  data() {
    return {
      tabIndex: 0,
      dataList: [],

      getList_api: getList_api,
      tabs: ['全部', '待付款', '待发货', '待收货'],
    };
  },
  methods: {
    handleChangeTab() {
      this.cancel('请求被取消了');
      this.isData = true;
      this.isMore = true;
      this.dataList = [];
      this.queryList.page = 1;
      this.getDataList('refresh');
    },
  },
};
