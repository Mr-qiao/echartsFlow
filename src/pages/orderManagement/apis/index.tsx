import { request } from '@umijs/max';

export function queryList(body: object, options: any) {
  return request('designweb/background/order/pageOrderByCondition', {
    method: 'POST',
    data: body,
    ...(options || {
      headers: {
        'content-type': 'application/json',
      },
    }),
  });
}

export function exportList(body: object, options: any) {
  return request('designweb/background/order/exportOrderList/fc', {
    method: 'POST',
    data: body,
    ...(options || {
      headers: {
        'content-type': 'application/json',
      },
    }),
  });
}

export function importList(body: object, options: any) {
  return request('designweb/background/order/importOrderFile', {
    method: 'POST',
    data: body,
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
}

// 发货
export function deliverItem(body: object, options: any) {
  return request('designweb/background/order/deliverItem', {
    method: 'POST',
    data: body,
    ...(options || {
      headers: {
        'content-type': 'application/json',
      },
    }),
  });
}
