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

export const httpRequest = {
  get(url: string, params?: Recordable<any>, options?: RequestOptions) {
    return axios(url, {
      ...options,
      hasGateway: true,
      params,
      method: 'GET',
    });
  },
  post(url: string, data?: Recordable<any>, options?: RequestOptions) {
    return axios(url, {
      ...options,
      hasGateway: true,
      data,
      method: 'POST',
    });
  },
};
