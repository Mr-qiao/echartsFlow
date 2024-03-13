import { request } from '@umijs/max';

// import request from "umi-request";

/**
 * 创建用户
 * @param body 
 * @returns 
 */
export const createUser = (body: any) => {
  return request('/user/create', {
    method: 'POST',
    data: body,
  });
}


/**
 * 用户列表
 * @param data 
 * @returns 
 */
export const userList = (data?: any) => {
  return request('/user/list', {
    method: 'GET',
    params: data,
  });
}

/**
 * 园区列表
 */
export const parkList = () => {
  return request('/zone/list', {
    method: 'GET',
  });
}