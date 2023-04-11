import { request } from '@umijs/max';

export async function getList(body: any) {
  return request('', { method: 'get', params: body });
}

let Api = {
  Goods: {
    //款式列表
    List: async (body: Recordable<any>) => {
      return request(`/item/item/platform/style/list`, {
        method: 'POST',
        data: body,
      });
    },
    //商品详情
    Detail: async (body?: any) => {
      return request(`/item/item/viewById`, {
        method: 'POST',
        data: body,
      });
    },
    //商品详情
    DetailSimple: async (body: { itemId: string }) => {
      return request(`/item/item/queryById`, {
        method: 'POST',
        data: body,
      });
    },
    //商品详情
    CommonQueryByItemId: async (body: { itemId: string }) => {
      return request(`/item/item/commonQueryByItemId`, {
        method: 'POST',
        data: body,
      });
    },
    //商品-新增
    Add: async (body: { itemId: string }) => {
      return request(`/item/item/saveItem/v3`, {
        method: 'POST',
        data: body,
      });
    },
    //商品--修改
    // Update: async (body: { itemId: string }) => {
    //   return request(`/item/item/platform/deleteItem`, {
    //     method: 'POST',
    //     data: body,
    //   });
    // },
    //上架
    OnLine: async (body: { itemId: number; facadeCategoryId: number }) => {
      return request(`/item/item/selectItemOnline`, {
        method: 'POST',
        data: body,
      });
    },
    // 下架
    OffLine: async (body: { itemId: number }) => {
      return request(`/item/item/itemOffline`, {
        method: 'POST',
        data: body,
      });
    },
    // 设计师列表
    DesignerList: async (body?: any) => {
      return request(`/iam/designer/queryByPage`, {
        method: 'POST',
        data: body,
      });
    },
    // 品牌
    BrandList: async (body) => {
      return request(`/itemcenter/gaea/foundation/brand/dropdown`, {
        method: 'POST',
        data: body,
      });
    },
    // 类目
    Category: async (body?: any) => {
      return request(`/item/category/getCategoryTree`, {
        method: 'POST',
        data: body,
      });
    },
    // 查询商品询价状态
    IsAskType: async (body?: any) => {
      return request(`/designweb/operator/ask/getAskType`, {
        method: 'POST',
        data: body,
      });
    },
  },
  Sample: {
    //样衣列表
    List: async (body: Recordable<any>) => {
      return request(`/item/item/platform/sample/list`, {
        method: 'POST',
        data: body,
      });
    },
    // 样衣详情
    Detail: (body: { itemId: number }) => {
      return request('/designweb/designer/sample/clothes/detail', {
        method: 'POST',
        data: body,
      });
    },
  },
  ProofDemand: {
    // 打样需求详情
    Detail: (body: { itemId: number }) => {
      return request('/item/item/designer/sample/clothes/requirement/detail', {
        method: 'POST',
        data: body,
      });
    },
  },
  Supplier: {
    //供应商列表
    List: async (params?: { companyName: string }) => {
      return request(`/investment-center/design/supplierlist`, {
        method: 'GET',
        params: params,
      });
    },
    //供应商 商品列表
    Goods: async (body: Recordable<any>) => {
      return request(`/item/item/platform/supplierItem/list`, {
        method: 'POST',
        data: body,
      });
    },
  },
};
export default Api;
