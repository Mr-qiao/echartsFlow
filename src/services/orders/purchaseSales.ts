/**
 * 采购订单
 */
import { request } from '@/utils/request';

/**
 * 列表
 * @param body 
 * @param options 
 * @returns 
 */
export async function purchaseQueryList(body: object, options: any) {
  return request.post('/designweb/supplier/purchase/order/page', {
    ...body,
    ...(options || {
      headers: {
        'content-type': 'application/json',
      },
    }),
  });
}

/**
 * 导出
 * @param body 
 * @param options 
 * @returns 
 */
export async function purchaseExportList(body: object, options: any) {
  return request.post(
    '/designweb/supplier/purchase/order/export',
    body,
    {
      responseType: 'blob',
      isDownload: true,
    },
  );
}

/**
 * 获取详情信息 --- 采购明细
 * @param body 
 * @param options 
 * @returns 
 */
export async function purchaseQueryById(body: object, options: any) {
  return request.get('/designweb/supplier/purchase/order/get', {
    ...body,
  });
}

/**
 * 获取操作日志
 * @param body 
 * @param options 
 * @returns 
 */
export async function purchaseQueryByIdLogList(body: object, options: any) {
  return request.get('/designweb/supplier/purchase/order/log/list', {
    ...body,
  });
}

/**
 * 更新详情状态
 * @param body 
 * @param options 
 * @returns 
 */
export async function purchaseUpdateStatus(body: object, options: any) {
  return request.post('/designweb/supplier/purchase/order/updateStatus', {
    ...body,
    ...(options || {
      headers: {
        'content-type': 'application/json',
      },
    }),
  });
}

// export function queryList(body: object, options: any) {
//   return request.post('designweb/supplier/order/pageOrderByCondition', {
//     ...body,
//     ...(options || {
//       headers: {
//         'content-type': 'application/json',
//       },
//     }),
//   });
// }
// export function statistics(body: object, options: any) {
//   return request.post('/designweb/supplier/order/statistics', {
//     ...body,
//     ...(options || {
//       headers: {
//         'content-type': 'application/json',
//       },
//     }),
//   });
// }

// export function exportList(body: object, options: any) {
//   return request.post('designweb/supplier/order/exportOrderList/fc', {
//     ...body,
//     ...(options || {
//       headers: {
//         'content-type': 'application/json',
//       },
//     }),
//   });
// }

// export function importList(body: object, options: any) {
//   return request.post('designweb/supplier/order/importOrderFile', {
//     ...body,
//     headers: {
//       'content-type': 'multipart/form-data',
//     },
//   });
// }

// 发货
// export function deliverItem(body: object, options: any) {
//   return request.post('designweb/supplier/order/deliverItem', {
//     ...body,
//     ...(options || {
//       headers: {
//         'content-type': 'application/json',
//       },
//     }),
//   });
// }

// export function recordsList(body: object, options: any) {
//   return request.post('designweb/supplier/importtask/records', {
//     ...body,
//     ...(options || {
//       headers: {
//         'content-type': 'application/json',
//       },
//     }),
//   });
// }

// export function exportFailList(body: object, options: any) {
//   return request.post('designweb/supplier/importtask/exportFailList', {
//     ...body,
//     ...(options || {
//       headers: {
//         'content-type': 'application/json',
//       },
//     }),
//   });
// }
// export function exportOrderTemplate(body: object, options: any) {
//   return request.post('/designweb/supplier/order/exportOrderTemplate', {
//     ...body,
//     ...(options || {
//       headers: {
//         'content-type': 'application/json',
//       },
//     }),
//   });
// }

// /** 售后订单 */
// export function afterSalesqueryList(body: object, options: any) {
//   return request.post('designweb/supplier/refund/pageRefundByCondition', {
//     ...body,
//     ...(options || {
//       headers: {
//         'content-type': 'application/json',
//       },
//     }),
//   });
// }

// export function afterSalesExprotList(body: object, options: any) {
//   return request.post(
//     'designweb/supplier/refund/exportRefundList/fc',
//     body,
//     {
//       responseType: 'blob',
//       isDownload: true,
//     },
//   );
// }




