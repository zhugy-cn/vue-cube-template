<template>
  <div class="demo1-page">
    <cube-tab-bar
      show-slider
      class="cube-tab-bar__custom"
      v-model="tabIndex"
      @change="handleChangeTab"
    >
      <cube-tab v-for="(item, index) in tabs" :label="index" :key="index">
        <div class="zui-tab">{{ item }}</div>
      </cube-tab>
    </cube-tab-bar>
    <div class="tab-panel">
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <ul class="panel-list" id="listWrap">
          <li class="panel-item" v-for="item in dataList" :key="item.id">
            <div class="panel-item__hd border-1px--bottom">
              <span class="left">订单号：{{ item.idCard }}</span>
              <span class="right">待付款</span>
            </div>
            <div class="panel-item__bd border-1px--bottom">
              <ul class="product-list">
                <li class="product-item" v-for="val in item.orderList" :key="val.id">
                  <div class="product-item__left">
                    <img
                      class="picture"
                      :imgurl="val.img"
                      src="../../../assets/images/mescroll-default.png"
                    />
                  </div>
                  <div class="product-item__right">
                    <div class="name">{{ val.name }}</div>
                    <div class="number">数量：{{ val.count }}</div>
                    <div class="price">小计：{{ val.price }}</div>
                  </div>
                </li>
              </ul>
              <div class="panel-bd__ft">
                <div class="left">
                  <span>总计：</span>
                  <span class="price-code">{{ item.price }}</span>
                </div>
                <div class="right">
                  <button class="outline">取消</button>
                  <button class="primary">去付款</button>
                </div>
              </div>
            </div>
            <div class="panel-item__ft">
              <transition name="panel-fade">
                <div class="detail-hd" v-show="!item.isOpen" @click="item.isOpen = !item.isOpen">
                  <span class="label">配送地址：{{ item.start_addr }}</span>
                  <span class="value">详情</span>
                  <i class="cubeic-select"></i>
                </div>
              </transition>
              <transition name="panel-fade">
                <div class="detail-bd" v-show="item.isOpen">
                  <div class="detail__item">
                    <span class="detail__label">联系对象</span>：
                    <span class="detail__value">{{ item.name }}</span>
                  </div>
                  <div class="detail__item">
                    <span class="detail__label">联系电话</span>：
                    <span class="detail__value">{{ item.phone }}</span>
                  </div>
                  <div class="detail__item">
                    <span class="detail__label">配送地址</span>：
                    <span class="detail__value">{{ item.start_addr }}</span>
                  </div>
                  <div class="detail__item">
                    <span class="detail__label">下单时间</span>：
                    <span class="detail__value">{{ item.start_time }}</span>
                  </div>
                  <div class="detail__close" @click="item.isOpen = !item.isOpen">
                    <span>收起</span>
                    <i class="cubeic-select"></i>
                  </div>
                </div>
              </transition>
            </div>
          </li>
        </ul>
      </mescroll-vue>
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="stylus" scoped src="./index.styl"></style>
