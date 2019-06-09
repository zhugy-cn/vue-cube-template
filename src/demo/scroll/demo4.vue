<template>
  <zui-page :loading="false" title="scroll/pull-down">
    <zui-scroll
      ref="scroll"
      :data="dataList"
      :options="BScrollOptions"
      @pulling-down="onPullingDown"
      @pulling-up="onPullingUp"
    >
      <div
        class="panel-item-wrap border-bottom-1px"
        v-for="(item, index) in dataList"
        :key="item.id"
        :data-index="index"
      >
        <div class="panel__content" @click="handleClick(item.id)">
          <div class="panel__tags">
            <div class="panel__tag">{{ item.age }}m³</div>
            <div class="panel__tag">{{ item.content_type }}</div>
            <div class="panel__tag" v-if="item.sex == 0">到付</div>
          </div>
          <div class="panel__row">
            <div class="label">代收货款</div>
            ：
            <div class="value">¥{{ item.price1 }}</div>
          </div>
          <div class="panel__row">
            <div class="label">寄件地址</div>
            ：
            <div class="value ellipsis">{{ item.start_addr }}</div>
          </div>
          <div class="panel__row">
            <div class="label">收件地址</div>
            ：
            <div class="value ellipsis">{{ item.end_addr }}</div>
          </div>
          <div class="panel__row">
            <div class="label">取件时间</div>
            ：
            <div class="value">
              {{ item.start_time }} 至 {{ (item.end_time + '').slice(-5) }}
            </div>
          </div>
          <div class="panel__remark border-top-1px">
            <div class="ellipsis">备注：{{ item.words || '暂无' }}</div>
          </div>
        </div>
        <div class="panel__footer">
          <div v-if="item.sex == 1" class="left-price active">
            {{ item.status == 1 ? '未揽件' : '已揽件' }}未支付：¥
            <span>{{ item.price || 0 }}</span>
          </div>
          <div v-else class="left-price">
            已揽件并支付：¥
            <span>{{ item.price || 0 }}</span>
          </div>
          <div class="right-staff">揽件员：{{ item.name }}</div>
        </div>
      </div>
    </zui-scroll>
  </zui-page>
</template>

<script src="./demo4.js"></script>

<style lang="stylus" scoped></style>
