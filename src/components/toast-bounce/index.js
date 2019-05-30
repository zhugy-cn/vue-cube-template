import Vue from 'vue';
import Toast from './toast-bounce';

let instance;
let ToastConstructor = Vue.extend(Toast);

const ToastBounceFun = function(content = '提示的文字') {
  if (instance) {
    instance.show(content);
  } else {
    instance = new ToastConstructor();
    instance.$mount(); // 渲染组件
    document.body.appendChild(instance.$el); // 挂载到 body 下
    instance.show(content);
  }
  if (this) {
    this.$once('hook:beforeDestroy', function() {
      instance.hide();
    });
  }
};

ToastBounceFun.install = function(Vue) {
  Vue.prototype.$toastBounce = this;
};

ToastBounceFun.hide = function() {
  instance.hide();
};

export default ToastBounceFun;

// 使用方式
// 显示
// this.$toastBounce("自定义内容");
// Toast("组件调用");

// 隐藏
// Toast.hide();
