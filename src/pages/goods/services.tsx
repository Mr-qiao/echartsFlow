import { request } from '@/utils/request';

// export async function getList(body: any) {
//   return request.post('', { method: 'get', params: body });
// }

let Api = {
  Goods: {
    //款式列表
    List: async (body: any) => {
      return request.post(`/item/item/platform/style/list`, body);
    },
    //商品详情
    Detail: async (body?: any) => {
      return request.post(`/item/item/viewById`, body);
    },
    //商品详情
    DetailSimple: async (body: { itemId: string }) => {
      return request.post(`/item/item/queryById`, body);
    },
    //商品-新增
    Add: async (body: { itemId: string }) => {
      return request.post(`/item/item/saveItem/v3/forSupplier`, body);
    },
    //商品--修改
    // Update: async (body: { itemId: string }) => {
    //   return request.post(`/item/item/platform/deleteItem`, {
    //     method: 'POST',
    //     data: body,
    //   });
    // },
    //上架
    OnLine: async (body: { itemId: number; facadeCategoryId: number }) => {
      return request.post(`/item/item/selectItemOnline`, body);
    },
    // 下架
    OffLine: async (body: { itemId: number }) => {
      return request.post(`/item/item/itemOffline`, body);
    },
    // 设计师列表
    DesignerList: async (body?: any) => {
      return request.post(`/iam/designer/queryByPage`, body);
    },
    // 品牌
    BrandList: async (body: any) => {
      return request.post(`/itemcenter/gaea/foundation/brand/dropdown`, body);
    },
    // 前台类目
    Category: async (body: any) => {
      return request.post(`/item/category/getCategoryTree`, body);
    },
  },
  Sample: {
    //样衣列表
    List: async (body: any) => {
      return request.post(`/item/item/platform/sample/list`, body);
    },
  },
  Supplier: {
    //供应商列表
    List: async (params?: { companyName: string }) => {
      return request.get(`/investment-center/design/supplierlist`, params);
    },
    //供应商 商品列表
    Goods: async (body: any) => {
      return request.post(`/item/item/platform/supplierItem/list`, body);
    },
  },
};
export default Api;
