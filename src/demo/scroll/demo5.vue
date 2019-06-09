<template>
  <zui-page :loading="false" title="scroll/ecycle-list">
    <div class="view-wrapper">
      <recycle-list class="list" :size="queryList.limit" :on-fetch="onFetch">
        <template slot="item" slot-scope="{ data }">
          <div class="panel-item-wrap border-bottom-1px">
            <div class="panel__content" @click="handleClick(data.id)">
              <div class="panel__tags">
                <div class="panel__tag">{{ data.age }}m³</div>
                <div class="panel__tag">{{ data.content_type }}</div>
                <div class="panel__tag" v-if="data.sex == 0">到付</div>
              </div>
              <div class="panel__row">
                <div class="label">代收货款</div>
                ：
                <div class="value">¥{{ data.price1 }}</div>
              </div>
              <div class="panel__row">
                <div class="label">寄件地址</div>
                ：
                <div class="value ellipsis">{{ data.start_addr }}</div>
              </div>
              <div class="panel__row">
                <div class="label">收件地址</div>
                ：
                <div class="value ellipsis">{{ data.end_addr }}</div>
              </div>
              <div class="panel__row">
                <div class="label">取件时间</div>
                ：
                <div class="value">
                  {{ data.start_time }} 至 {{ (data.end_time + '').slice(-5) }}
                </div>
              </div>
              <div class="panel__remark border-top-1px">
                <div class="ellipsis">备注：{{ data.words || '暂无' }}</div>
              </div>
            </div>
            <div class="panel__footer">
              <div v-if="data.sex == 1" class="left-price active">
                {{ data.status == 1 ? '未揽件' : '已揽件' }}未支付：¥
                <span>{{ data.price || 0 }}</span>
              </div>
              <div v-else class="left-price">
                已揽件并支付：¥
                <span>{{ data.price || 0 }}</span>
              </div>
              <div class="right-staff">揽件员：{{ data.name }}</div>
            </div>
          </div>
        </template>
      </recycle-list>
    </div>
  </zui-page>
</template>
<script>
import RecycleList from '_com/recycle-list/recycle-list.vue';
import { getList_api } from '_api/common';

export default {
  components: {
    RecycleList,
  },
  data() {
    return {
      queryList: {
        page: 1,
        limit: 20,
      },
    };
  },
  methods: {
    onFetch() {
      return new Promise(async resolve => {
        let { data: list } = await getList_api(this.queryList);
        this.queryList.page++;
        resolve(list);
      });
    },
    handleClick() {
      // console.log('Item:' + data);
    },
  },
};
</script>
<style lang="stylus" scoped>
/* 限制视口 包裹组件 */
.view-wrapper
  position absolute
  top 44px
  left 0
  bottom 0
  width 100%
</style>
