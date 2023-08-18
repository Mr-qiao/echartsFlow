/**
 * 报价管理
 */
import { httpRequest, request } from '@/utils/request'

/**
 * 报价列表
 * @param body 
 * @param options 
 * @returns 
 */
export function quotationsList(body: object, options: any) {
  return httpRequest.post('/designweb/supplier/ask/page', body, options);
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
  return httpRequest.post('/designweb/supplier/answer/get', params, options);
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
  return httpRequest.post('/designweb/supplier/answer/update', params, options);
}
