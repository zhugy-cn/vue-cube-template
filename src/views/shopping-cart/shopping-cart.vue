<template>
  <div class="shopping-cart">
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
    <div class="panel-list">
      <transition :name="'tab-panel-move--' + direction">
        <!-- <transition name="tab-panel-fade"> -->
        <keep-alive>
          <component
            class="tab-panel-wrapper"
            :is="currentComponent"
            :data="dataList"
          ></component>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>
<script src="./shopping-cart.js"></script>
<style lang="stylus" scoped>
.shopping-cart
  position relative
.cube-tab-bar__custom
  .cube-tab
    padding 0
    height 50px
    line-height 50px
    background-color #fff
.panel-list
  position absolute
  z-index 99
  top 50px
  bottom 0
  left 0
  right 0
  overflow hidden
</style>
