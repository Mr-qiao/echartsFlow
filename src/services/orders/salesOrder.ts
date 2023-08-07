/**
 * 销售订单
 */
import { httpRequest, request } from '@/utils/request';

/**
 * 查询销售订单
 */
export async function getSaleOrderList(body: object, options: any) {
    return httpRequest.post(
        '/designweb/supplier/order/sale/getFactorySaleOrderList',
        body,
        {
            ...options,
        },
    );
}
/**
 * 导出销售订单
 */
export async function exportSaleOrderList(body: any, options: any) {
    return request.post(
        'designweb/supplier/order/sale/exportSaleOrderList',
        body,
        {
            responseType: 'blob',
            isDownload: true,
        },
    );
}