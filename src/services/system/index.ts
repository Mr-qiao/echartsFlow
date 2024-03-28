import { request } from '@umijs/max';

// import request from "umi-request";

/**
 * 创建用户
 * @param body 
 * @returns 
 */
export const createUserApi = (body: any) => {
  return request('/user/create', {
    method: 'POST',
    data: body,
  });
}

/**
 * 上传文件
 * @param body 
 * @returns 
 */
export const fileUploadApi = (file: any) => {
  const formData = new FormData();
  formData.set('file', file);
  return request('/file/upload', {
    method: 'POST',
    date: formData,
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
  });
}

/**
 * 更改用户状态
 * @param body 
 * @returns 
 */
export const changeUserStatusApi = (id: string) => {
  return request('/user/changeUserStatus', {
    method: 'POST',
    params: { uid: id },
  });
}


/**
 * 用户列表
 * @param data 
 * @returns 
 */
export const userListApi = (data?: any) => {
  return request('/user/list', {
    method: 'GET',
    params: data,
  });
}

/**
 * 用户分页列表
 * @param data 
 * @returns 
 */
export const getUserPageApi = (data?: any) => {
  return request('/user/page', {
    method: 'GET',
    params: data,
  });
}



/**
 * 删除用户
 */
export const delUserApi = (id: string) => {
  return request(`/user/delete`, {
    method: 'DELETE',
    params: { uid: id },
  });
}

/**
 * 创建园区
 * @param body 
 * @returns 
 */
export const createZoneApi = (body: any) => {
  return request('/zone/create', {
    method: 'POST',
    data: body,
  });
}

/**
 * 更新园区
 * @param body 
 * @returns 
 */
export const updateZoneApi = (body: any) => {
  return request('/zone/update', {
    method: 'POST',
    data: body,
  });
}

/**
 * 园区列表
 */
export const getParkListApi = () => {
  return request('/zone/list', {
    method: 'GET',
  });
}

/**
 * 园区分页列表
 */
export const getZonePageListApi = (data?: any) => {
  return request('/zone/page', {
    method: 'GET',
    params: data,
  });
}

/**
 * 删除园区
 */
export const delZoneApi = (id: string) => {
  return request(`/zone/delete`, {
    method: 'DELETE',
    params: { zoneId: id },
  });
}


/**
 * 设备列表
 */
export const getDeviceListApi = (zoneId) => {
  return request(`/device/list/${zoneId}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
  });
}

/**
 * 获取设备动态流地址
 */
export const deviceStreamApi = (deviceId, data: {
  type: 'play' | 'playback';
  streamType?: string;
  endTime?: string;
}) => {
  return request(`/device/stream/${deviceId}`, {
    method: 'GET',
    params: data,
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
  });
}

/**
 * 设备分页列表
 */
export const getDevicePageList = (data?: any) => {
  return request('/device/page', {
    method: 'GET',
    params: data,
  });
}

/**
 * 新增设备
 * @param body 
 * @returns 
 */
export const createDevice = (body: any) => {
  return request('/device/create', {
    method: 'POST',
    data: body,
  });
}

/**
 * 更新设备
 * @param body 
 * @returns 
 */
export const updateDevice = (body: any) => {
  return request('/device/update', {
    method: 'POST',
    data: body,
  });
}

/**
 * 删除设备
 */
export const delDevice = (id: string) => {
  return request(`/device/delete`, {
    method: 'DELETE',
    params: { deviceId: id },
  });
}