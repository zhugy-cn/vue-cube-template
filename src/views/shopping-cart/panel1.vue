<template>
  <div>
    <div
      class="panel-item-wrap border-bottom-1px"
      v-for="item in dataList"
      :key="item.id"
    >
      <div
        class="panel__content"
        @click="$router.push($route.path + '/orderDetail/' + item.id)"
      >
        <div class="panel__tags">
          <div class="panel__tag" v-if="item.weight">{{ item.weight }}kg</div>
          <div class="panel__tag" v-else>{{ item.volume }}m³</div>
          <div class="panel__tag">{{ item.title }}</div>
          <div class="panel__tag" v-if="item.payment == 2">到付</div>
        </div>
        <div class="panel__row">
          <div class="label">代收货款</div>
          ：
          <div class="value">¥{{ item.collecting_money }}</div>
        </div>
        <div class="panel__row">
          <div class="label">寄件地址</div>
          ：
          <div class="value ellipsis">{{ item.addr }}</div>
        </div>
        <div class="panel__row">
          <div class="label">收件地址</div>
          ：
          <div class="value ellipsis">{{ item.re_addr }}</div>
        </div>
        <div class="panel__row">
          <div class="label">取件时间</div>
          ：
          <div class="value">
            {{ item.picking_time }} 至 {{ item.picking_time_en.slice(-5) }}
          </div>
        </div>
        <div class="panel__remark border-top-1px">
          <div class="ellipsis">备注：{{ item.remarks || '暂无' }}</div>
        </div>
      </div>
      <div class="panel__footer">
        <div v-if="item.pay_status == 1" class="left-price active">
          {{ item.status == 1 ? '未揽件' : '已揽件' }}未支付：¥
          <span>{{ item.estimate || 0 }}</span>
        </div>
        <div v-else class="left-price">
          已揽件并支付：¥
          <span>{{ item.estimate || 0 }}</span>
        </div>
        <div class="right-staff">揽件员：{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Panel1',
  data() {
    return {
      dataList: [
        {
          addr: '亚太中心2楼210',
          collecting_money: '0.00',
          id: 170,
          name: '周露',
          pay_status: 2,
          payment: 2,
          phone: '15329331339',
          picking_time: '2019-06-01 08:00',
          picking_time_en: '2019-06-01 09:00',
          price: '29.00',
          re_addr: '小十字',
          remarks: '请带胶带,需要爬楼,',
          status: 10,
          title: '日用品',
          user_id: 1,
          volume: '5',
          weight: null,
        },
      ],
    };
  },
};
</script>
<style lang="stylus" scoped src="./panel.styl"></style>
