import { request as axios, RequestOptions } from '@umijs/max';

export const request = {
  get(url: string, params?: Recordable<any>, options?: RequestOptions) {
    return axios(url, {
      ...options,
      params,
      method: 'GET',
    });
  },
  post(url: string, data?: Recordable<any>, options?: RequestOptions) {
    return axios(url, {
      ...options,
      data,
      method: 'POST',
    });
  },
};

// export const httpRequest = {
//   get(url: string, params?: Recordable<any>, options?: RequestOptions) {
//     return axios(url, {
//       ...options,
//       hasGateway: true,
//       params,
//       method: 'GET',
//     });
//   },
//   post(url: string, data?: Recordable<any>, options?: RequestOptions) {
//     return axios(url, {
//       ...options,
//       hasGateway: true,
//       data,
//       method: 'POST',
//     });
//   },
// };

import { navigateToLogin } from '@/utils';
import type { KunlunResponseProps } from '@xc/kunlun-request';
import { WebRequest } from '@xc/kunlun-request';
import { message } from 'antd';

export const httpRequest = new WebRequest({
  interceptors: {
    responseInterceptor(response: any) {
      const { data } = response as KunlunResponseProps;
      if (data.code === 401) {
        message.error(data.message);
      }

      if (data.code === 1000010001 || data.code === 1000010031) {
        navigateToLogin();
      }
      return response;
    },
  },
});
