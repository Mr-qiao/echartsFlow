import { request } from '@umijs/max';

export function queryList(body: object, options: any) {
  return request('/designweb/supplier/purchase/order/page', {
    method: 'POST',
    data: body,
    ...(options || {
      headers: {
        'content-type': 'application/json',
      },
    }),
  });
}
