/**
 * 样衣
 */

import { request } from '@/utils/request';

/**
 * 打样列表
 * @param body 
 * @returns 
 */
export const sampleQueryList = (body: any) => {
    return request.post(`/item/item/factory/sample/demand/list`, body);
}

/**
 * 搜索 - 对接人
 * @param body 
 * @returns 
 */
export const searchForSystem = (body: any) => {
    return request.get(`/usercenter-backend/employee/getAppOrgEmployee`, {
        ...body,
        filterBoardFlag: 'true',
    })
}

/**
 * 开始打样
 * @param body 
 */
export const sampleStartPoor = (body: any) => {
    request.post(`/item/item/factory/sample/demand/mark`, body);
}

/**
 * 交付打样
 * @param body 
 * @returns 
 */
export const sampledDeliverPoor = (body: any) => {
    return request.post(`/item/item/factory/sample/demand/delivery`, body);
}

/**
 * 列表
 * @param body 
 * @returns 
 */
export const sampleList = (body: any) => {
    return request.post(`/item/item/platform/sample/list`, body);
}

/**
 * 详情
 * @param body 
 * @returns 
 */
export const sampleDetail = (body: { itemId: number }) => {
    return request.post(`/designweb/designer/sample/clothes/detail`, body);
}
