import { request as axios, RequestOptions } from '@umijs/max';

export const request = {
  // baseURL: 'https://api.dev.xinc818.net',
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

  KLAPI: {
    post(url: string, data?: Recordable<any>, options?: RequestOptions) {
      return axios(url, {
        ...options,
        data,
        method: 'POST',
        kl: true,
      });
    },
  },
};
