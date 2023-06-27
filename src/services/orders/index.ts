import { httpRequest, request } from '@/utils/request';

/**
 * 销售订单 --- 查询销售订单
 */
export function getSaleOrderList(body: object, options: any) {
  return httpRequest.post(
    '/designweb/supplier/order/sale/getFactorySaleOrderList',
    body,
    {
      ...options,
    },
  );
}
/**
 * 销售订单 --- 导出销售订单
 */
export function exportSaleOrderList(body: any, options: any) {
  return request.post(
    'designweb/supplier/order/sale/exportSaleOrderList',
    body,
    {
      responseType: 'blob',
      isDownload: true,
    },
  );
}

export function queryList(body: object, options: any) {
  return request.post('designweb/supplier/order/pageOrderByCondition', {
    ...body,
    ...(options || {
      headers: {
        'content-type': 'application/json',
      },
    }),
  });
}
export function statistics(body: object, options: any) {
  return request.post('/designweb/supplier/order/statistics', {
    ...body,
    ...(options || {
      headers: {
        'content-type': 'application/json',
      },
    }),
  });
}

export function exportList(body: object, options: any) {
  return request.post('designweb/supplier/order/exportOrderList/fc', {
    ...body,
    ...(options || {
      headers: {
        'content-type': 'application/json',
      },
    }),
  });
}

export function importList(body: object, options: any) {
  return request.post('designweb/supplier/order/importOrderFile', {
    ...body,
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
}

// 发货
export function deliverItem(body: object, options: any) {
  return request.post('designweb/supplier/order/deliverItem', {
    ...body,
    ...(options || {
      headers: {
        'content-type': 'application/json',
      },
    }),
  });
}

export function recordsList(body: object, options: any) {
  return request.post('designweb/supplier/importtask/records', {
    ...body,
    ...(options || {
      headers: {
        'content-type': 'application/json',
      },
    }),
  });
}

export function exportFailList(body: object, options: any) {
  return request.post('designweb/supplier/importtask/exportFailList', {
    ...body,
    ...(options || {
      headers: {
        'content-type': 'application/json',
      },
    }),
  });
}
export function exportOrderTemplate(body: object, options: any) {
  return request.post('/designweb/supplier/order/exportOrderTemplate', {
    ...body,
    ...(options || {
      headers: {
        'content-type': 'application/json',
      },
    }),
  });
}

// /** 售后订单 */
export function afterSalesqueryList(body: object, options: any) {
  return request.post('designweb/supplier/refund/pageRefundByCondition', {
    ...body,
    ...(options || {
      headers: {
        'content-type': 'application/json',
      },
    }),
  });
}

export function afterSalesExprotList(body: object, options: any) {
  return request.post(
    'designweb/supplier/refund/exportRefundList/fc',
    // {
    //   data: body,
    //   ...(options || {
    //     headers: {
    //       'content-type': 'application/json',
    //     },
    //   }),
    // }
    body,
    {
      responseType: 'blob',
      isDownload: true,
    },
  );
}
/** 采购订单列表 */
export function purchaseQueryList(body: object, options: any) {
  return request.post('/designweb/supplier/purchase/order/page', {
    ...body,
    ...(options || {
      headers: {
        'content-type': 'application/json',
      },
    }),
  });
}

export function purchaseExportList(body: object, options: any) {
  return request.post(
    '/designweb/supplier/purchase/order/export',
    // {
    //   data: body,
    //   ...(options || {
    //     headers: {
    //       'content-type': 'application/json',
    //     },
    //   }),
    // }
    body,
    {
      responseType: 'blob',
      isDownload: true,
    },
  );
}

export function purchaseQueryById(body: object, options: any) {
  return request.get('/designweb/supplier/purchase/order/get', {
    ...body,
  });
}
export function purchaseQueryByIdLogList(body: object, options: any) {
  return request.get('/designweb/supplier/purchase/order/log/list', {
    ...body,
  });
}

export function purchaseUpdateStatus(body: object, options: any) {
  return request.post('/designweb/supplier/purchase/order/updateStatus', {
    ...body,
    ...(options || {
      headers: {
        'content-type': 'application/json',
      },
    }),
  });
}
