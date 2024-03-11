

import { request as maxRequest } from '@umijs/max';
// import request from 'umi-request'

import config from '@/config';

const { ajaxBaseUrl } = config;


/**
 * 登录
 */
export const login = (body: any, options?: any) => {
  const formData = new FormData();
  formData.set('uname', body.uname);
  formData.set('passwd', body.passwd);

  return maxRequest(`/user/login`, {
    method: 'POST',
    data: formData,
    ...(options || {
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    }),
  })
}

/**
 * 更改密码
 */
export const changePasswd = (body: any) => {
  return maxRequest(`/user/changePasswd`, {
    method: 'POST',
    data: body,
  })
}

/**
 * 退出登陆
 */
export function logout() {
  return maxRequest('/user/logout', {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': "http://192.168.18.46:9366"
    }
  })
}





