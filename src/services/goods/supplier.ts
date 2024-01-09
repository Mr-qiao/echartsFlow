/**
 * 商品管理 - 供应商商品列表
 */
import { request } from '@/utils/request'


/**
 * 商品列表
 * @param body 
 * @returns 
 */
export const supplierItemList = async (body: any) => {
    return request.post(`/item/item/factory/supplierItem/list`, body);
}


/**
 * 搜索 - 商品品牌
 * @param body 
 * @returns 
 */
export const brandList = async (body: any) => {
    return request.post(`/itemcenter/gaea/foundation/brand/dropdown`, body)
}

/**
 * 搜索 - 前台类目
 * @param body 
 * @param options 
 * @returns 
 */
export const categoryTree = async (body: any, options: any) => {
    return request.post(`/item/category/getCategoryTree`, body);
}


/**
 * 查询类目动态属性
 * @url https://admin-kunlun-dev.xinc818.com/#/apiDetail?requestPath=/item/categoryProperty/getItemPropertyByCategoryId
 */
export const supplierItemPropertyByCategoryId = async (body: { categoryId: number }) => {
    return request.post(
        `/item/categoryProperty/getItemPropertyByCategoryId`,
        {
            ...body,
            itemType: 3,
        },
    );
};

/**
 * 详情
 * @url https://admin-kunlun-dev.xinc818.com/#/apiDetail?requestPath=/item/item/viewByIdV2
 */
export const supplierViewByIdV2Detail = async (body: Recordable<any>) => {
    return request.post(`/item/item/viewByIdV2`, body);
};

/**
* 保存
* @url https://admin-kunlun-dev.xinc818.com/#/apiDetail?requestPath=/item/item/saveItem
*/
export const supplierSaveItem = async (body: Recordable<any>) => {
    return request.post(`/item/item/saveItem`, body);
};


/**
 * 款式详情
 * @url https://admin-kunlun-dev.xinc818.com/#/apiDetail?requestPath=	/item/item/viewByIdOnlyDetail
 */
export const supplierViewByIdOnlyDetail = async (body: Recordable<any>) => {
    return request.post('/item/item/viewByIdOnlyDetail', body);
}