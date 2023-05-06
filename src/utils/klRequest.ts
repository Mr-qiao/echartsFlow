import { uuid } from '@/utils';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import Cookies from 'js-cookie';

let visitorId: string;

async function getVisitorId() {
  const fpPromise = FingerprintJS.load();

  const fp = await fpPromise;
  const result = await fp.get();

  visitorId = result.visitorId || '';
}

getVisitorId();

interface propsType {
  kl_token: string; // 用户token
  kl_t?: number; // 请求时间戳，毫秒
  kl_os_type: number; // 操作系统类型：0、空缺（默认：客户端未填，当做0）1、Android 2、iOS 3、PC
  kl_platform: number; // 平台：0、空缺（默认：客户端未填，当做0）1、APP 2、微信小程序XCX 3、浏览器Browser
  kl_display_type: number; // 展示类型：0、空缺(默认：客户端未填，当作0) 1、Native 2、H5
  kl_device_id?: string; // 设备UUID
  kl_trace_id?: string; // 字符串，链路跟踪ID，使用UUID 算法生成
  kl_server_url?: string; // 联调使用
}

const klRequest = (
  config: any, // 拦截请求配置，进行个性化处理
  {
    kl_token,
    kl_os_type,
    kl_platform,
    kl_display_type,
    kl_server_url = '',
    ...rest
  }: propsType,
) => {
  Object.assign(config, {
    headers: {
      kl_token: window.localStorage.getItem(kl_token) || Cookies.get(kl_token),
      kl_t: new Date().getTime(),
      kl_os_type,
      kl_platform,
      kl_display_type,
      kl_device_id: visitorId,
      kl_trace_id: uuid(32).toLowerCase(),
      kl_server_url,
      rest,
    },
  });
  config.data = {
    kl_data: JSON.stringify(config.data),
  };

  return config;
};

export default klRequest;
