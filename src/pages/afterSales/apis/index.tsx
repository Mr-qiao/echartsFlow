import { request } from '@umijs/max';

export function queryList(body: object, options: any) {
  return request('designweb/background/refund/pageRefundByCondition', {
    method: 'POST',
    data: body,
    ...(options || {
      headers: {
        'content-type': 'application/json',
      },
    }),
  });
}

export function exprotList(body: object, options: any) {
  return request('designweb/background/refund/exportRefundList/fc', {
    method: 'POST',
    data: body,
    ...(options || {
      headers: {
        'content-type': 'application/json',
      },
    }),
  });
}
