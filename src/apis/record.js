import request from '@/shared/request';

export const get = (query) => request({
  method: 'get',
  url: '/record/list',
  params: query,
});

export const add = (payload) => request({
  method: 'post',
  url: '/record/add',
  data: payload,
});

export const update = (payload) => request({
  method: 'post',
  url: '/record/update',
  data: payload,
});
