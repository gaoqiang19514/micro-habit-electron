import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://fc-mp-5fa4a496-0aa2-45a9-b89c-4054536ad7e7.next.bspapp.com',
  timeout: 3000,
});

instance.interceptors.response.use(
  (response) => {
    // 如果响应正常，直接返回响应数据
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      // 1. 退出登录
      // 2. 跳转到登录页面
    }
    // 将错误继续传递，以便其他拦截器或调用者处理
    return Promise.reject(error);
  }
);

const request = (query) => {
  const token = localStorage.getItem('token');

  // TODO: 后台抛出的业务异常在这里处理

  return instance({
    headers: {
      token,
    },
    ...query,
  }).then((res) => res.data);
};

// 发送 GET 请求
// request({
//   method: 'get',
//   url: '/user/list',
//   params: {
//     ID: 12345,
//   },
// });

// 发送 POST 请求
// request({
//   method: 'post',
//   url: '/user/add',
//   data: {
//     firstName: 'Fred',
//     lastName: 'Flintstone',
//   },
// });

export default request;
