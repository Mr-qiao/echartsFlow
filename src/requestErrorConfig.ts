import type { RequestOptions } from '@@/plugin-request/request';
import type { RequestConfig } from '@umijs/max';
import { message, notification } from 'antd';
import { navigateToLogin } from '@/utils';
import config from '@/config';

const { ajaxBaseUrl } = config;

// 与后端约定的响应数据格式
interface ResponseStructure {
  entry?: any;
  message?: string;
  hasNext: boolean;
  requestId: number;
  status: boolean;
  timestamp?: number;
  totalRecordSize: number;
  traceId?: string;
  data?: any;
}

const codeMessage: any = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
export const errorConfig: RequestConfig = {
  baseURL: ajaxBaseUrl,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'app-code': 'SCM',
  },
  // 错误处理： umi@3 的错误处理方案。
  errorConfig: {
    errorThrower: (res) => {},
    // 错误接收及处理
    errorHandler: (error: any, opts: any) => {
      if (opts?.skipErrorHandler) throw error;
      // 我们的 errorThrower 抛出的错误。
      if (error.response && error.response.status) {
        const errorText =
          codeMessage[error.response.status] || error.response.statusText;
        const {
          status,
          data: { path },
        } = error.response;
        notification.error({
          message: `请求错误 ${status}: ${ajaxBaseUrl}${path}`,
          description: errorText,
        });
      } else if (!error.response) {
        notification.error({
          description: '您的网络发生异常，无法连接服务器',
          message: '网络异常',
        });
      }
    },
  },

  // 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      // 拦截请求配置，进行个性化处理。
      // const url = config?.url?.concat('?token = 123');
      const url = config?.url;
      return { ...config, url };
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response) => {
      // 拦截响应数据，进行个性化处理
      const { data } = response as unknown as ResponseStructure;
      if (data.responseCode === '1000010001') {
        navigateToLogin();
      }
      return response;
    },
  ],
};
