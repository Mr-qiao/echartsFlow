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

export function exportList(body: object, options: any) {
  return request('/designweb/supplier/purchase/order/export', {
    method: 'POST',
    data: body,
    ...(options || {
      headers: {
        'content-type': 'application/json',
      },
    }),
  });
}

export function queryById(body: object, options: any) {
  return request('/designweb/supplier/purchase/order/get', {
    method: 'GET',
    params: {
      ...body,
    },
  });
}
export function queryByIdLogList(body: object, options: any) {
  return request('/designweb/supplier/purchase/order/log/list', {
    method: 'GET',
    params: {
      ...body,
    },
  });
}

export function updateStatus(body: object, options: any) {
  return request('/designweb/supplier/purchase/order/updateStatus', {
    method: 'POST',
    data: body,
    ...(options || {
      headers: {
        'content-type': 'application/json',
      },
    }),
  });
}
