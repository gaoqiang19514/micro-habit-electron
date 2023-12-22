import request from '@/shared/request';

export const list = (query) => {
  return request({
    method: 'get',
    url: '/user/list',
    params: query,
  });
};

export const add = (payload) => {
  return request({
    method: 'post',
    url: '/user/add',
    data: payload,
  });
};

export const login = (payload) => {
  return request({
    method: 'post',
    url: '/user/login',
    data: payload,
  });
};
