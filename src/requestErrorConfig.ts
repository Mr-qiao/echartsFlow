import config from '@/config';
import { navigateToLogin, uuid } from '@/utils';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import type { RequestConfig } from '@umijs/max';
import { message, notification } from 'antd';
import Cookies from 'js-cookie';

const { ajaxBaseUrl, ajaxBaseUrlKI } = config;

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

let visitorId: string;

async function getVisitorId() {
  const fpPromise = FingerprintJS.load();

  const fp = await fpPromise;
  const result = await fp.get();

  visitorId = result.visitorId || '';
}

getVisitorId();

/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */

export const errorConfig: RequestConfig = {
  //   baseURL: ajaxBaseUrl,
  timeout: 10000,
  withCredentials: true,
  // headers: {
  // 	// 'app-code': 'SCM',
  // 	token: localStorage.getItem('token') || '',
  // },
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
    (config: any) => {
      // 拦截请求配置，进行个性化处理。
      config.baseURL = config.kl ? ajaxBaseUrlKI : ajaxBaseUrl;
      const token =
        Cookies.get('supplier-token') || localStorage.getItem('supplier-token');
      // TODO：目前兼容老API，并后期会依次介入新API
      if (config.kl) {
        Object.assign(config, {
          headers: {
            kl_token: token, // 用户token
            kl_t: Date.parse(new Date()) / 1000, // 请求时间戳，秒
            kl_os_type: 3, // 操作系统类型：0、空缺（默认：客户端未填，当做0）1、Android 2、iOS 3、PC
            kl_platform: 3, // 平台：0、空缺（默认：客户端未填，当做0）1、APP 2、微信小程序XCX 3、浏览器Browser
            kl_display_type: 1, // 展示类型：0、空缺(默认：客户端未填，当作0) 1、Native 2、H5
            kl_device_id: visitorId, // 设备UUID
            kl_trace_id: uuid(32).toLowerCase(), // 字符串，链路跟踪ID，使用UUID 算法生成
          },
        });
        config.data = {
          kl_data: JSON.stringify(config.data),
        };
      } else {
        config.headers = {
          ...config.headers,
          token,
        };
      }

      const url = config?.url;
      return { ...config, url };
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response) => {
      // 拦截响应数据，进行个性化处理
      const { data } = response as unknown as ResponseStructure;
      if (data.code === 401) {
        message.error(data.message);
      }

      if (data.code === 1000010001 || data.code === 1000010031) {
        navigateToLogin();
      }
      return response;
    },
  ],
};
