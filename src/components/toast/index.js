import Vue from 'vue';
import Toast from './toast';

let instance;
let ToastConstructor = Vue.extend(Toast);

const ToastFun = function(options) {
  if (!options || typeof options === 'string') {
    // 只传conent时，type默认是 loading
    // this.$toast("自定义内容");
    options = {
      type: 'loading',
      content: options,
    };
  }
  if (instance) {
    instance.show(options);
  } else {
    instance = new ToastConstructor();
    instance.$mount(); // 渲染组件
    document.body.appendChild(instance.$el); // 挂载到 body 下
    instance.show(options);
  }

  // 组件直接调用的时候没有 this
  // Toast("一开始的内容");
  if (this) {
    this.$once('hook:beforeDestroy', function() {
      instance.hide();
    });
  }
};

ToastFun.install = function(Vue) {
  Vue.prototype.$toast = this;
};
ToastFun['hide'] = function() {
  instance.hide();
};
export default ToastFun;

// 使用方式
// this.$toast("自定义内容"); // 不传type，默认是loading
// this.$toast({ type: "", content: "自定义内容" });
// this.$toast({ type: "success", content: "自定义内容" });
// this.$toast({ type: "error", content: "自定义内容" });
// this.$toast({ type: "warn", content: "自定义内容" });
// this.$toast({ type: "error", content: "自定义内容", mask: true });
// this.$toast.hide();

// 组件调用
// Toast("组件调用");
// Toast.hide();
