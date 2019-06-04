<template>
  <zui-page :loading="false">
    <p>
      <load-more></load-more>
    </p>
    <p>
      <load-more :data-list="[1]"></load-more>
    </p>
    <p>
      <load-more :is-more="false"></load-more>
    </p>
  </zui-page>
</template>
<script>
import LoadMore from '_com/load-more/load-more';
export default {
  components: {
    LoadMore,
  },
  data() {
    return {
      loading1: false,
    };
  },
};
</script>
<style lang="stylus" scoped>
p
  margin 20px 0
</style>
