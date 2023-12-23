import request from '@/shared/request';

export const list = (query) => request({
  method: 'get',
  url: '/user/list',
  params: query,
});

export const add = (payload) => request({
  method: 'post',
  url: '/user/add',
  data: payload,
});

export const login = (payload) => request({
  method: 'post',
  url: '/user/login',
  data: payload,
});
