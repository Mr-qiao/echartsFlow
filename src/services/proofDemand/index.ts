/**
 * 打样需求
 */
import { request } from '@/utils/request';

/**
 * 打样需求分页
 * @url http://yapi.xinc818.com/project/1025/interface/api/165192
 */
export function getProofDemandPage(data: Recordable<any>) {
  return request.post(
    '/item/item/designer/sample/clothes/requirement/list',
    data,
  );
}

/**
 * 创建打样需求
 * @url http://yapi.xinc818.com/project/1025/interface/api/166067
 */
export function addProofDemand(data: Recordable<any>) {
  return request.post(
    '/item/item/designer/sample/clothes/requirement/create',
    data,
  );
}

/**
 * 打样需求详情
 * @url http://yapi.xinc818.com/project/1025/interface/api/166027
 */
export function getProofDemand(data: { itemId: number }) {
  return request.post(
    '/designweb/designer/sample/clothes/requirement/detail',
    data,
  );
}

/**
 * 更新打样需求
 * @url http://yapi.xinc818.com/project/1025/interface/api/166068
 */
export function updateProofDemand(data: Recordable<any>) {
  return request.post(
    '/item/item/designer/sample/clothes/requirement/update',
    data,
  );
}

/**
 * 获取板师列表
 */
export function getPlateDivisionList(data: { name: string }) {
  return request.post('/usercenter-backend/employee/search', data);
}


/**打样需求 */
// 详情
export const proofDemandDetail = (body: { itemId: number }) => {
  return request.post(`/item/item/designer/sample/clothes/requirement/detail`, body);
}
