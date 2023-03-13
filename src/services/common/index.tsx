import { request } from '@umijs/max';

//合作商服务概况
export async function getProblemTypeTree(
  params?: API.HomeInfo,
  options?: { [key: string]: any },
) {
  return request<API.Result_Home>('customer-manage/type/problemTypeTree', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

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

export function getOssFileUrl(body: object) {
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

//获取用户权限
export function getAccess() {
  return request('/iam/home/menu?appCode=MSP');
}

//获取盖亚一级类目
export function getGaeaCategory() {
  return request('/itemcenter/gaea/cates/tree');
}
