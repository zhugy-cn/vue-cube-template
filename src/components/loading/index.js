import Vue from "vue";
import Loading from "./loading";

let instance;
let LoadingConstructor = Vue.extend(Loading);

const LoadingFun = function(type) {
  if (instance) {
    instance.show(type);
  } else {
    instance = new LoadingConstructor();
    instance.$mount(); // 渲染组件
    document.body.appendChild(instance.$el); // 挂载到 body 下
    instance.show(type);
  }
  if (this) {
    this.$once("hook:beforeDestroy", function() {
      instance.hide();
    });
  }
};

LoadingFun.install = function(Vue) {
  Vue.prototype.$loading = this;
};

LoadingFun.hide = function() {
  instance.hide();
};

export default LoadingFun;

// 使用方式
// this.$loading(); // 不传默认是 ball
// this.$loading("rect");
// this.$loading.hide();

// Loading("rect");
// Loading.hide();
