import request from '@/shared/request';

export const list = (query) => request({
  method: 'get',
  url: '/task/list',
  params: query,
});

export const update = (payload) => request({
  method: 'post',
  url: '/task/update',
  data: payload,
});
