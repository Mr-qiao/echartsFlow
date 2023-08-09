/**
 * 报价管理
 */
import { request } from '@umijs/max';

/**
 * 报价列表
 * @param body 
 * @param options 
 * @returns 
 */
export function quotationsList(body: object, options: any) {
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

/**
 * 报价详情
 * @param params 
 * @param options 
 * @returns 
 */
export async function quotationsById(
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

/**
 * 更新报价
 * @param params 
 * @param options 
 * @returns 
 */
export async function quotationsUpdateById(
  params?: any,
  options?: { [key: string]: any },
) {
  return request('/designweb/supplier/answer/update', {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}
