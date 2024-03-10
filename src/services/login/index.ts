

import { request as maxRequest } from '@umijs/max';
import request from 'umi-request'

import ajaxBaseUrl from '@/config';



/**
 * 登录
 */
export const login = (body: any, options?: any) => {
  return request(`${ajaxBaseUrl}/user/login`, {
    method: 'POST',
    data: body,
    requestType: 'form'
  },
  )
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
  })
}





