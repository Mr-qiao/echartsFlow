import { request } from '@umijs/max';

//合作商服务概况

/** 获取当前系统登录者 用户信息 */

export async function getUserInfo() {
  return request('iam/home/userInfo');
}

export async function userLogout() {
  return request('iam/passport/logout');
}

export async function getSignature(body, options) {
  return request('rss/public/signature/getSignature', {
    method: 'POST',
    data: body,
    ...(options || {
      headers: {
        'content-type': 'application/json',
      },
    }),
  });
}

export function getOssFileUrl(body: object, options) {
  return request('rss/public/resource/getResourceUrl', {
    method: 'POST',
    data: body,
    ...(options || {
      headers: {
        'content-type': 'application/json',
      },
    }),
  });
}
