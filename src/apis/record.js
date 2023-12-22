import request from '@/shared/request';

export const get = (query) => {
  return request({
    method: 'get',
    url: '/record/list',
    params: query,
  });
};

export const add = (payload) => {
  return request({
    method: 'post',
    url: '/record/add',
    data: payload,
  });
};

export const update = (payload) => {
  return request({
    method: 'post',
    url: '/record/update',
    data: payload,
  });
};
