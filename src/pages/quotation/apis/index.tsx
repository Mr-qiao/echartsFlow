import { request } from '@umijs/max';

export function queryList(body: object, options: any) {
  return request('/designweb/supplier/ask/page', {
    method: 'POST',
    data: body,
    // ...(options || {
    headers: {
      'content-type': 'application/json',
    },
    // }),
  });
}

export async function queryById(
  params?: any,
  options?: { [key: string]: any },
) {
  return request('/designweb/supplier/answer/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function updateById(
  params?: any,
  options?: { [key: string]: any },
) {
  return request('/designweb/supplier/answer/update', {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}
