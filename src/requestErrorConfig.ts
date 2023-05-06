import config from '@/config';
import { navigateToLogin } from '@/utils';
// import FingerprintJS from '@fingerprintjs/fingerprintjs';
import klRequest from '@/utils/klRequest';
// import FingerprintJS from '@fingerprintjs/fingerprintjs';
import type { RequestConfig } from '@umijs/max';
import { message, notification } from 'antd';
import Cookies from 'js-cookie';

// let visitorId: string;

// async function getVisitorId() {
//   const fpPromise = FingerprintJS.load();

//   const fp = await fpPromise;
//   const result = await fp.get();

//   visitorId = result.visitorId || '';
// }

// getVisitorId();

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

// let visitorId: string;

// async function getVisitorId() {
//   const fpPromise = FingerprintJS.load();

//   const fp = await fpPromise;
//   const result = await fp.get();

//   visitorId = result.visitorId || '';
// }

// getVisitorId();

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
        Cookies.get('supplier-token') ||
        localStorage.getItem('supplier-token') ||
        Cookies.get('token') ||
        localStorage.getItem('token');
      // TODO：目前兼容老API，并后期会依次介入新API
      if (config.kl) {
        klRequest(config, {
          kl_token: 'supplier-token', // 用户token
          kl_os_type: 3, // 操作系统类型：0、空缺（默认：客户端未填，当做0）1、Android 2、iOS 3、PC
          kl_platform: 3, // 平台：0、空缺（默认：客户端未填，当做0）1、APP 2、微信小程序XCX 3、浏览器Browser
          kl_display_type: 1, // 展示类型：0、空缺(默认：客户端未填，当作0) 1、Native 2、H5
        });
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
    (response: any) => {
      // 拦截响应数据，进行个性化处理
      if (
        'isDownload' in response.config &&
        response.headers['content-disposition']
      ) {
        const fileName = response.headers['content-disposition']
          .split(';')[1]
          .split('=')[1]; // 根据接口返回情况拿到文件名
        const blob: Blob = new Blob([response.data as Blob]); // 通过返回的流数据 手动构建blob 流
        const reader = new FileReader();
        reader.readAsDataURL(blob); // 转换为base64，可以直接放入a标签的href （转换base64还可用 window.atob ，未实验过）
        reader.onload = (e) => {
          // 转换完成，创建一个a标签用于下载
          const a = document.createElement('a');
          console.log(decodeURIComponent(fileName));
          a.download = decodeURIComponent(fileName); // 构建 下载的文件名称以及下载的文件格式（可通过传值输入）
          if (typeof e.target?.result === 'string') {
            a.href = e.target.result;
          }
          a.click();
        };
        return false;
      }
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
