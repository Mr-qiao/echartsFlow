import { getQueryStr } from '@/utils/utils';
import { request } from '@umijs/max';

export async function registerSlide(params?: any) {
  return request(getQueryStr('/iam/gt/register?platForm=IAM', params), {
    method: 'GET',
  });
}

export async function queryApplyInfo(
  params?: any,
  options?: { [key: string]: any },
) {
  return request('/investment-center/supplierplatform/queryApplyInfo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function queryCompanyInfo(
  params?: any,
  options?: { [key: string]: any },
) {
  return request('/investment-center/supplierplatformDesign/queryCompanyInfo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function fakeAccountLogin(params: any, options?: any) {
  return request('/usercenter/corporation/login', {
    method: 'POST',
    data: params,
    ...(options || {
      headers: {
        'content-type': 'application/json',
      },
    }),
  });
}

export async function designerRegister(params: any, options?: any) {
  return request('/iam/designer/register', {
    method: 'POST',
    data: params,
    ...(options || {
      headers: {
        'content-type': 'application/json',
      },
    }),
  });
}

export async function resetPassword(params: any, options?: any) {
  return request('/usercenter/corporation/design/pwd/findBack', {
    method: 'POST',
    data: params,
    ...(options || {
      headers: {
        'content-type': 'application/json',
      },
    }),
  });
}

// 验证码
export async function sendValidateCode(params: any, options?: any) {
  return request('/usercenter/authCode/send', {
    method: 'POST',
    data: params,
    ...(options || {
      headers: {
        'content-type': 'application/json',
      },
    }),
  });
}

// 商家注册
export async function register(params: any, options?: any) {
  return request('/usercenter/corporation/design/register', {
    method: 'POST',
    data: params,
    ...(options || {
      headers: {
        'content-type': 'application/json',
      },
    }),
  });
}

export async function uploadPicture(params: any, options?: any) {
  return request('/usercenter/oss/uploadPicture', {
    method: 'POST',
    data: params,
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
}

export async function checkCompanyName(params: any, options?: any) {
  return request('/investment-center/supplierplatformDesign/checkCompanyName', {
    method: 'POST',
    data: params,
    ...(options || {
      headers: {
        'content-type': 'application/json',
      },
    }),
  });
}

export async function checkUnifyCreditCodeOld(params: any, options?: any) {
  return request(
    '/investment-center/supplierplatformDesign/checkUnifyCreditCodeOld',
    {
      method: 'POST',
      data: params,
      ...(options || {
        headers: {
          'content-type': 'application/json',
        },
      }),
    },
  );
}

export async function applyName(params: any, options?: any) {
  return request('/investment-center/supplierplatformDesign/apply', {
    method: 'POST',
    data: params,
    ...(options || {
      headers: {
        'content-type': 'application/json',
      },
    }),
  });
}

export async function getCiphertext(params: any, options?: any) {
  return request('/strongbox/public/encrypt/getCiphertext', {
    method: 'POST',
    data: params,
    ...(options || {
      headers: {
        'content-type': 'application/json',
      },
    }),
  });
}
