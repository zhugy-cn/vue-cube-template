// 网页 loading

import Vue from 'vue';
import Loading from './loading';

let instance;
let LoadingConstructor = Vue.extend(Loading);

const LoadingFun = function(type) {
  instance = new LoadingConstructor();
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
LoadingFun.hide = function() {
  if (instance) {
    instance.hide();
    instance.onReady();
  }
};

LoadingFun.install = function(Vue) {
  Vue.prototype.$loading = this;
};

export default LoadingFun;

// 使用方式
// this.$loading(); // 不传默认是 ball
// this.$loading("rect");
// this.$loading.hide();

// Loading("rect");
// Loading.hide();
