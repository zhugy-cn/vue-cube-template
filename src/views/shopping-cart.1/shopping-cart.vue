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
      <!-- <zui-loading
        v-if="dataList.length === 0"
        class="panel-loading"
      ></zui-loading>-->
      <Scroll ref="scroll" @pullingDown="loadRefresh" @pullingUp="loadMore">
        <div class="scroll-wrapper" :style="{ height: scrollHeight + 'px' }">
          <transition :name="'tab-panel-move--' + direction">
            <keep-alive>
              <component
                class="tab-panel-wrapper"
                ref="scrollContent"
                :is="currentComponent"
                :data-list="dataList"
                :is-data="isData"
                :is-more="isMore"
                :is-loading="isLoading"
              ></component>
            </keep-alive>
          </transition>
        </div>
      </Scroll>
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
  // overflow hidden
  overflow auto
.panel-loading
  position absolute
  z-index 9
  top 30px
  left 50%
  transform translateX(-50%)
</style>
