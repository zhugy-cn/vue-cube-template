import request from './request';

// 测试
export function test_api() {
  return request.get('/test');
}

// 分页数据
export function getList_api(params, cancelToken) {
  return request.get('/getList', {
    params,
    cancelToken,
    // baseURL: 'https://api.zhugy.cn',
    baseURL: 'http://192.168.1.200:3000',
  });
}
