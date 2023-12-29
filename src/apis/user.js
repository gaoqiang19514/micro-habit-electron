import request from '@/shared/request';

/**
 * @typedef {Object} User
 * @property {string} _id
 * @property {string} username
 * @property {string} password
 * @property {string} phone
 * @property {string} email
 * @property {string[]} images
 */

/**
 * @typedef {Object} ApiResponse
 * @property {number} code
 * @property {any} data
 */

/**
 * @typedef {Object} UserApiResponse
 * @extends {ApiResponse}
 * @property {User[]} data
 */

/**
 * 查询用户列表
 * @param {Object} params
 * @param {string} [params._id]
 * @param {string} [params.username]
 * @param {string} [params.password]
 * @param {string} [params.phone]
 * @param {string} [params.email]
 * @returns {UserApiResponse}
 */
export const list = (params) => request({
  method: 'get',
  url: '/user/list',
  params,
});

/**
 * 新增用户
 * @param {Object} params
 * @param {string} params.username
 * @param {string} params.password
 * @returns {ApiResponse}
 */
export const add = (params) => request({
  method: 'get',
  url: '/user/add',
  params,
});

/**
 * 登录
 * @param {Object} params
 * @param {string} params.username
 * @param {string} params.password
 * @returns {ApiResponse}
 */
export const login = (params) => request({
  method: 'get',
  url: '/user/login',
  params,
});

/**
 * 修改密码
 * @param {Object} params
 * @param {string} params.username
 * @param {string} params.password
 * @param {string} params.newPassword
 * @returns {ApiResponse}
 */
export const updatePassword = (params) => request({
  method: 'get',
  url: '/user/updatePassword',
  params,
});