import { request } from '@umijs/max';
import { getQueryStr } from '@/utils/utils';

export async function registerSlide(params?: any) {
  return request(getQueryStr('/iam/gt/register?platForm=IAM', params), {
    method: 'GET',
  });
}
export async function queryApplyInfo(params?: any) {
  return request(
    getQueryStr('/investment-center/supplierplatform/queryApplyInfo', params),
    {
      method: 'GET',
    },
  );
}

export async function fakeAccountLogin(params: any) {
  return request('/usercenter/corporation/login', {
    method: 'POST',
    data: params,
  });
}

export async function designerRegister(params: any) {
  return request('/iam/designer/register', {
    method: 'POST',
    data: params,
  });
}
export async function resetPassword(params: any) {
  return request('/usercenter/corporation/pwd/findBack', {
    method: 'POST',
    data: params,
  });
}

export async function sendValidateCode(params: any) {
  return request('/usercenter/authCode/send', {
    method: 'POST',
    data: params,
  });
}
