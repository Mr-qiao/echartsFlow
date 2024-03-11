import { request } from '@umijs/max';

// import request from "umi-request";

/**
 * 创建用户
 * @param body 
 * @returns 
 */
export const createUser = (body: any) => {
  return request('/user/createUser', {
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
    // params: data,
    // headers: {
    //   'Access-Control-Allow-Origin': "*"
    // }
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  });
}