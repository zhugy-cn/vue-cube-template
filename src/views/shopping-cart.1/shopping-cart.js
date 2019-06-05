import { getList_api } from '_api/common';
import getListMixin from '@/mixins/getListMixin';
import panelMixin from '@/mixins/panelMixin';
import Scroll from 'vue-slim-better-scroll';

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
    Scroll,
  },
  data() {
    return {
      getList_api: getList_api,
      tabs: ['全部', '待付款', '待发货', '待收货'],
    };
  },
  created() {},
  methods: {
    loadRefresh() {
      setTimeout(() => {
        this.$refs.scroll.update();
      }, 1500);
    },
    loadMore() {
      setTimeout(() => {
        this.$refs.scroll.update(false);
      }, 2000);
    },
  },
};
