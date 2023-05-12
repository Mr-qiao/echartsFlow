import { request } from '@umijs/max';

import { request as requestApi } from '@/utils/request';

export default {
  AfterSales: {
    /**
     * 查询列表
     * @url https://yapi.xinc818.com/project/1025/interface/api/167762
     */
    List: async (body: Recordable<any>) => {
      return requestApi.post(`/designweb/operator/jst/refund/selectList`, body);
    },
    /**
     * 导出
     * @url https://yapi.xinc818.com/project/1025/interface/api/167767
     */
    Export: async (body: Recordable<any>, options: any) => {
      return requestApi.post(
        `/designweb/operator/jst/refund/exportRefund`,
        body,
        options,
      );
    },
    /**
     * 审批
     * @url https://yapi.xinc818.com/project/1025/interface/api/167772
     */
    Audit: async (body: Recordable<any>) => {
      return requestApi.post(
        `/designweb/operator/jst/refund/auditRefund`,
        body,
      );
    },
    /**
     * 审批-获取售后拒绝原因列表
     * @url https://yapi.xinc818.com/project/1025/interface/api/167777
     */
    RejectCode: async (body: { id: number; outerAsId: string }) => {
      return requestApi.post(
        `/designweb/operator/jst/refund/getRejectCode`,
        body,
      );
    },
    /**
     * 审批-获取工厂
     * @url https://yapi.xinc818.com/project/1025/interface/api/167897
     */
    FactoryList: async (body: { id: number }) => {
      return requestApi.post(
        `/designweb/operator/jst/refund/getAddressIdNameList`,
        body,
      );
    },
  },
};

//获取信息审核任务
export async function getAuditTask(body: Recordable<any>) {
  return request(`msp/item/audit/task/page`, {
    method: 'post',
    data: body,
  });
}

//查看状态
export async function getStatusTotal(body: Recordable<any>) {
  return request(`/itemcenter/gaea/first/approve/getStatusTotal`, {
    method: 'get',
    params: body,
  });
}

//售后分页查询列表
export async function getPageRefundByCondition(body: Recordable<any>) {
  return request(`/designweb/operator/refund/pageRefundByCondition`, {
    method: 'post',
    data: body,
  });
}

//售后分页导出
export async function getExportRefundList(body: Recordable<any>) {
  return request(`/designweb/operator/refund/exportRefundList/pt`, {
    method: 'post',
    responseType: 'blob',
    data: body,
    isDownload: true,
  });
}

//售后恢复
export async function getBackCancelById(body: Recordable<any>) {
  return request(`/designweb/operator/refund/backCancelById`, {
    method: 'post',
    data: body,
  });
}

//售后作废
export async function getCancelById(body: Recordable<any>) {
  return request(`/designweb/operator/refund/cancelById`, {
    method: 'post',
    data: body,
  });
}

//售后批量恢复
export async function getBackCancelAll(body: Recordable<any>) {
  return request(`/designweb/operator/refund/backCancel`, {
    method: 'post',
    data: body,
  });
}

//售后作废
export async function getCancelByIdAll(body: Recordable<any>) {
  return request(`/designweb/operator/refund/cancel`, {
    method: 'post',
    data: body,
  });
}

//导出列表
export async function getImporttaskRecords(body: Recordable<any>) {
  return request(`/designweb/operator/importtask/records`, {
    method: 'post',
    data: body,
  });
}

//导出列表
export async function getImportRefundFile(body: Recordable<any>) {
  return request(`/designweb/operator/refund/importRefundFile`, {
    method: 'post',
    data: body,
  });
}

//列表下载失败文件
export async function getImporttaskExportFailLists(body: Recordable<any>) {
  return request(`/designweb/operator/importtask/exportFailList`, {
    method: 'post',
    data: body,
    responseType: 'blob',
    isDownload: true,
  });
}

//导出下载文件
export async function getExportRefundTemplate(body: Recordable<any>) {
  return request(`/designweb/operator/refund/exportRefundTemplate`, {
    method: 'post',
    data: body,
    responseType: 'blob',
    isDownload: true,
  });
}
