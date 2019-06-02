import axios from 'axios';
import store from '@/store';
import { baseURL } from '@/config';
import Loading from '_com/loading';
import Toast from '_com/toast';
import ToastBounce from '_com/toast-bounce';

// 打印错误提示
function errorLog(data, config) {
  let errorObj = {
    data,
    url: config.url,
    methods: config.method,
  };
  config.params && (errorObj.params = config.params);
  config.data && (errorObj.params = JSON.parse(config.data));
  console.log(errorObj);
}

// 请求异常
function requestException(message) {
  Loading.hide();
  Toast.hide();
  ToastBounce(message);
  return Promise.reject(message);
}

const ajax = axios.create({
  baseURL,
  timeout: 6000,
});
const reLogin = ['403'];
const whiteList = [0];

// 请求 拦截器
ajax.interceptors.request.use(
  config => {
    let token = store.getters.token;
    if (token) {
      config.headers['token'] = token;
    }
    return config;
  },
  error => {
    console.log('请求拦截器', error);
  },
);

// 响应 拦截器
ajax.interceptors.response.use(
  response => {
    const { data } = response;

    // 测试
    if (data.status) {
      return data.data;
    }

    if (whiteList.includes(data.code)) {
      return data.data;
    } else if (reLogin.includes(data.code)) {
      store.dispatch('logoutAct');
      ToastBounce('登录过期，请重新登录');
    } else {
      errorLog(data, response.config);
      requestException(data.message);
      // return Promise.reject(data);
    }
  },
  error => {
    let message = error.message;
    if (error.response) {
      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      // 自定义的错误信息
      let msg = error.response.data.message;
      if (msg) {
        message = msg;
      }
    } else {
      // 服务器没有响应(超时，断网)
      console.log('Error', message);
    }
    requestException(message);
  },
);
export default ajax;
