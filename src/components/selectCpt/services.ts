import { request } from '@umijs/max';

export async function getList(body: any) {
  return request('', { method: 'get', params: body });
}

let Api = {
  Category: {
    Tree: async () => {
      return request(`/item/facadeCategory/tree`, {
        // return request(`/item/category/getCategoryList`, {
        method: 'POST',
        data: {},
      });
    },
    Add: async (body: Recordable<any>) => {
      return request(`/item/facadeCategory/add`, {
        method: 'POST',
        data: body,
      });
    },
    Edit: async (body: Recordable<any>) => {
      return request(`/item/facadeCategory/add`, {
        method: 'POST',
        data: body,
      });
    },
    // Update: async (body: Recordable<any>) => {
    //   return request(`/item/facadeCategory/update`, {
    //     method: 'POST',
    //     data: body,
    //   });
    // },
  },

  Anchor: {
    List: async (body: Recordable<any>) => {
      return request(`/usercenter/liveanchor/listBySupplyChain`, {
        method: 'POST',
        data: body,
      });
    },
    LinkOperate: async (body: Recordable<any>) => {
      return request(`/usercenter/liveanchor/addAnchorLinkUser`, {
        method: 'POST',
        data: body,
      });
    },
    // 取消单个运营主播关联关系
    CancelOperate: async (body: Recordable<any>) => {
      return request(`/usercenter/liveanchor/anchorCancelUser`, {
        method: 'POST',
        data: body,
      });
    },
    OperateList: async (body: Recordable<any>) => {
      return request(`/usercenter/liveanchor/linkUserList`, {
        method: 'POST',
        data: body,
      });
    },
    EditStatus: async (body: Recordable<any>) => {
      return request(`/usercenter/liveanchor/enable`, {
        method: 'POST',
        data: body,
      });
    },
    // appCode=SUPPLY&name=test&orgId=
    OperateSearch: async (params: Recordable<any>) => {
      return request(`/usercenter-backend/employee/getAppOrgEmployee`, {
        method: 'GET',
        params: params,
      });
    },
  },
  Favorite: {
    List: async (body: Recordable<any>) => {
      return request(`/designweb/operator/favorite/listAll`, {
        method: 'POST',
        data: body,
      });
    },
  },
  Live: {
    List: async (body: Recordable<any>) => {
      return request(`/item/LivePlan/list`, {
        method: 'POST',
        data: body,
      });
    },
  },
  LivePlan: {
    List: async (body: Recordable<any>) => {
      return request(`/item/LivePlan/list`, {
        method: 'POST',
        data: body,
      });
    },
  },
};
export default Api;
