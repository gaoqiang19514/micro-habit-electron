import request from '@/shared/request';

/**
 * @typedef {Object} Task
 * @property {string} _id
 * @property {string} name
 * @property {string} username
 * @property {string} target
 */

/**
 * @typedef {Object} ApiResponse
 * @property {number} code
 * @property {any} data
 */

/**
 * @typedef {Object} TaskApiResponse
 * @extends {ApiResponse}
 * @property {Task[]} data
 */

/**
 * 新增任务
 * @param {Object} params
 * @param {string} params.name
 * @param {string} params.username
 * @param {string} params.target
 * @returns {ApiResponse}
 */
export const add = (params) => request({
  method: 'get',
  url: '/task/add',
  params,
});

/**
 * 更新任务
 * @param {Object} params
 * @param {Object} params.query
 * @param {string} [params.query.name]
 * @param {string} [params.query.username]
 * @param {string} [params.query.target]
 * @param {Object} params.payload
 * @param {string} [params.payload.name]
 * @param {string} [params.payload.username]
 * @param {string} [params.payload.target]
 * @returns {ApiResponse}
 */
export const update = (params) => request({
  method: 'get',
  url: '/task/update',
  params,
});

/**
 * 任务列表
 * @param {Object} params
 * @param {string} [params.name]
 * @param {string} [params.username]
 * @param {string} [params.target]
 * @returns {TaskApiResponse}
 */
export const list = (params) => request({
  method: 'get',
  url: '/task/list',
  params,
});
