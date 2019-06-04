// 网页 pageLoading

import Vue from 'vue';
import PageLoading from './page-loading';

let instance;
let PageLoadingConstructor = Vue.extend(PageLoading);

const pageLoadingFun = function(type) {
  instance = new PageLoadingConstructor();
  instance.$mount(); // 渲染组件
  this.$nextTick(() => {
    this.$el.appendChild(instance.$el); // 挂载到父组件上
  });
  instance.show(type);
  if (this) {
    instance.onReady = this.onReady;
    this.$once('hook:beforeDestroy', function() {
      instance.hide();
    });
  }
};
pageLoadingFun.hide = function() {
  if (instance) {
    instance.hide();
    instance.onReady && instance.onReady();
  }
};

pageLoadingFun.install = function(Vue) {
  Vue.prototype.$pageLoading = this;
};

export default pageLoadingFun;

// 使用方式
// this.$pageLoading(); // 不传默认是 ball
// this.$pageLoading("rect");
// this.$pageLoading.hide();

// pageLoading("rect");
// pageLoading.hide();
