import request from '@/shared/request';

/**
 * @typedef {Object} Record
 * @property {string} _id
 * @property {string} username
 * @property {string} date
 * @property {string} name
 * @property {string} value
 * @property {string} target
 */

/**
 * @typedef {Object} ApiResponse
 * @property {number} code
 * @property {any} data
 */

/**
 * @typedef {Object} RecordApiResponse
 * @extends {ApiResponse}
 * @property {Record[]} data
 */

/**
 * 新增记录
 * @param {Object} params
 * @param {string} params.username
 * @param {string} params.date
 * @param {string} params.name
 * @param {string} params.value
 * @param {string} params.target
 * @returns {ApiResponse}
 */
export const add = (params) => request({
  method: 'get',
  url: '/record/add',
  params,
});

/**
 * 更新记录
 * @param {Object} params
 * @param {Object} params.query
 * @param {string} [params.query.username]
 * @param {string} [params.query.date]
 * @param {string} [params.query.name]
 * @param {string} [params.query.value]
 * @param {string} [params.query.target]
 * @param {Object} params.payload
 * @param {string} [params.payload.username]
 * @param {string} [params.payload.date]
 * @param {string} [params.payload.name]
 * @param {string} [params.payload.value]
 * @param {string} [params.payload.target]
 * @returns {ApiResponse}
 */
export const update = (params) => request({
  method: 'get',
  url: '/record/update',
  params,
});

/**
 * 记录列表
 * @param {Object} params
 * @param {string} [params.username]
 * @param {string} [params.date]
 * @param {string} [params.name]
 * @param {string} [params.value]
 * @param {string} [params.target]
 * @returns {RecordApiResponse}
 */
export const list = (params) => request({
  method: 'get',
  url: '/record/list',
  params,
});