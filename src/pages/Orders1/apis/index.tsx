import { request } from '@umijs/max';

export function queryList(body: object, options: any) {
  return request('designweb/supplier/order/pageOrderByCondition', {
    method: 'POST',
    data: body,
    ...(options || {
      headers: {
        'content-type': 'application/json',
      },
    }),
  });
}
export function statistics(body: object, options: any) {
  return request('/designweb/supplier/order/statistics', {
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
  return request('designweb/supplier/order/exportOrderList/fc', {
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
  return request('designweb/supplier/order/importOrderFile', {
    method: 'POST',
    data: body,
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
}

// 发货
export function deliverItem(body: object, options: any) {
  return request('designweb/supplier/order/deliverItem', {
    method: 'POST',
    data: body,
    ...(options || {
      headers: {
        'content-type': 'application/json',
      },
    }),
  });
}

export function recordsList(body: object, options: any) {
  return request('designweb/supplier/importtask/records', {
    method: 'POST',
    data: body,
    ...(options || {
      headers: {
        'content-type': 'application/json',
      },
    }),
  });
}

export function exportFailList(body: object, options: any) {
  return request('designweb/supplier/importtask/exportFailList', {
    method: 'POST',
    data: body,
    ...(options || {
      headers: {
        'content-type': 'application/json',
      },
    }),
  });
}
export function exportOrderTemplate(body: object, options: any) {
  return request('/designweb/supplier/order/exportOrderTemplate', {
    method: 'POST',
    data: body,
    ...(options || {
      headers: {
        'content-type': 'application/json',
      },
    }),
  });
}

/** 售后订单 */
export function afterSalesqueryList(body: object, options: any) {
  return request('designweb/supplier/refund/pageRefundByCondition', {
    method: 'POST',
    data: body,
    ...(options || {
      headers: {
        'content-type': 'application/json',
      },
    }),
  });
}

export function afterSalesExprotList(body: object, options: any) {
  return request('designweb/supplier/refund/exportRefundList/fc', {
    method: 'POST',
    data: body,
    ...(options || {
      headers: {
        'content-type': 'application/json',
      },
    }),
  });
}
/** 采购订单列表 */
export function purchaseQueryList(body: object, options: any) {
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

export function purchaseExportList(body: object, options: any) {
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

export function purchaseQueryById(body: object, options: any) {
  return request('/designweb/supplier/purchase/order/get', {
    method: 'GET',
    params: {
      ...body,
    },
  });
}
export function purchaseQueryByIdLogList(body: object, options: any) {
  return request('/designweb/supplier/purchase/order/log/list', {
    method: 'GET',
    params: {
      ...body,
    },
  });
}

export function purchaseUpdateStatus(body: object, options: any) {
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
