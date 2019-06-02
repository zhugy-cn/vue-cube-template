<template>
  <zui-view :header="false" animation-type="scale">
    <div class="personal-page">
      <section class="user-info-wrapper">
        <div class="left-avatar"></div>
        <div class="right-content">
          <div class="name">王小二</div>
          <div class="phone">18585511152</div>
          <div class="service">贵州省贵阳市南明区</div>
        </div>
        <i class="cubeic-arrow"></i>
      </section>
      <ul class="cell-group">
        <li
          @click="$router.push('/' + item + '')"
          class="cell-item border-bottom-1px"
          v-for="(item, index) in cellList"
          :key="index"
        >
          <span class="cell__label">{{ item }}</span>
          <i class="cubeic-arrow"></i>
        </li>
        <li class="cell-item border-bottom-1px">
          <span class="cell__label">账户余额</span>
          <span class="cell__value">00.00</span>
          <i class="cubeic-arrow"></i>
        </li>
      </ul>
    </div>
  </zui-view>
</template>
<script>
export default {
  name: 'Personal',
  data() {
    return {
      cellList: ['popup', 'loading', 'toast', 'scroll'],
    };
  },
};
</script>
<style lang="stylus" scoped src="./personal.styl"></style>
