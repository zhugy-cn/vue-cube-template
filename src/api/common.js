import request from './request';

// 测试
export function test_api() {
  return request.get('/test');
}

// 分页数据
export function getList_api(params) {
  return request.get('/getList', {
    params,
    baseURL: 'https://api.zhugy.cn',
  });
}
