import { request } from '@umijs/max';

export function queryList(body: object, options: any) {
  return request('/item/item/factory/supplierItem/list', {
    method: 'POST',
    data: body,
    // ...(options || {
    headers: {
      'content-type': 'application/json',
    },
    // }),
  });
}

export function getCategoryTree(body: object, options: any) {
  return request('/item/category/getCategoryTree', {
    method: 'POST',
    data: body,
    // ...(options || {
    headers: {
      'content-type': 'application/json',
    },
    // }),
  });
}
