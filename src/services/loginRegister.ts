import { request } from '@umijs/max';
import { getQueryStr } from '@/utils/utils';

export async function registerSlide(params?: any) {
  return request(getQueryStr('/iam/gt/register?platForm=IAM', params), {
    method: 'GET',
  });
}
export async function fakeAccountLogin(params: any) {
  return request('/iam/designer/login', {
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

export async function sendValidateCode(params: any) {
  return request(getQueryStr('/iam/sms/sendValidateCode', params), {
    method: 'GET',
  });
}
