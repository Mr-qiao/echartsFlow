import { request } from '@/utils/request';

/**商品管理 */
// 列表
export const goodsList = (body: any) =>
  request.post(`/item/item/platform/style/list`, body);
// 详情
export const goodsDetail = (body: any) =>
  request.post(`/item/item/viewById`, body);
// 商品详情
export const detailSimple = (body: { itemId: string }) =>
  request.post(`/item/item/queryById`, body);
// 新增
export const goodsAdd = (body: { itemId: string }) =>
  request.post(`/item/item/saveItem/v3/forSupplier`, body);
// 上架
export const goodsOnLine = (body: {
  itemId: number;
  facadeCategoryId: number;
}) => request.post(`/item/item/selectItemOnline`, body);
// 下架
export const goodsOffLine = (body: { itemId: number }) =>
  request.post(`/item/item/itemOffline`, body);
// 设计师列表
export const designerList = (body: any) =>
  request.post(`/iam/designer/queryByPage`, body);
// 品牌
export const brandList = (body: any) =>
  request.post(`/itemcenter/gaea/foundation/brand/dropdown`, body);
// 前台类目
export const categoryTree = (body: any, options: any) =>
  request.post(`/item/category/getCategoryTree`, body);

/**打样需求 */
// 详情
export const proofDemandDetail = (body: { itemId: number }) =>
  request.post(`/item/item/designer/sample/clothes/requirement/detail`, body);

/**样衣 */
// 列表
export const sampleList = (body: any) =>
  request.post(`/item/item/platform/sample/list`, body);
// 详情
export const sampleDetail = (body: { itemId: number }) =>
  request.post(`/designweb/designer/sample/clothes/detail`, body);
// 打样列表
export const sampleQueryList = (body: any) =>
  request.post(`/item/item/factory/sample/demand/list`, body);

export const searchForSystem = (body: any) =>
  request.get(`/usercenter-backend/employee/getAppOrgEmployee`, {
    ...body,
    filterBoardFlag: 'true',
  });

export const mark = (body: any) =>
  request.post(`/item/item/factory/sample/demand/mark`, body);

export const delivery = (body: any) =>
  request.post(`/item/item/factory/sample/demand/delivery`, body);

/**供应商 */
// 列表
export const supplierList = (params?: { companyName: string }) =>
  request.get(`/investment-center/design/supplierlist`, params);
// 商品列表
export const supplierGoodsList = (body: any) =>
  request.post(`/item/item/platform/supplierItem/list`, body);

export const supplierItemList = (body: any) =>
  request.post(`/item/item/factory/supplierItem/list`, body);
