import request from '@/shared/request';

export const list = (query) => {
  return request({
    method: 'get',
    url: '/task/list',
    params: query,
  });
};
