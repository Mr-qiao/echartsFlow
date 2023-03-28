import { request } from '@umijs/max';
import { camelCase } from 'lodash-es';

//合作商服务概况


/** 获取当前系统登录者 用户信息 */

export async function getUserInfo() {
  return request('iam/home/userInfo');
}

export async function userLogout() {
  return request('iam/passport/logout');
}

export async function getSignature(body, options) {
  return request('rss/public/signature/getSignature', {
    method: 'POST',
    data: body,
    ...(options || {
      headers: {
        'content-type': 'application/json',
      },
    }),
  });
}

export function getOssFileUrl(body: object) {
  return request('rss/public/resource/getResourceUrl', {
    method: 'POST',
    data: body,
    ...(options || {
      headers: {
        'content-type': 'application/json',
      },
    }),
  });
}
export function getSelectDict(params: Recordable<any>) {
  return request('/designweb/dict/dropdown/batch', {
    method: 'GET',
    params,
  }).then(({ entry }) => {
    const data: any = {};
    Object.keys(entry).forEach((key: string) => {
      const itemEnum: any[] = entry[key].map((item: any) => {
        return {
          value: Number(item.value),
          key: Number(item.value),
          label: item.name,
          disabled: item.disabled,
        };
      });
      data[camelCase(key)] =
        itemEnum.length > 1
          ? [...itemEnum.filter((item: any) => !item.disabled), ...itemEnum.filter((item: any) => item.disabled)]
          : itemEnum;
    });
    return data;
  });
}

export function getAreaList() {
  return request('/usercenter/location/getLocations/special', {
    method: 'GET',
  });
}

