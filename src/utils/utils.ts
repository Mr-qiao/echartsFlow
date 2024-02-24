// @ts-ignore
import Cookies from 'js-cookie';
// 登出地址
export const logoutAddr = (() => {
  const { host } = window.location;
  if (host.indexOf('localhost') > -1 || host.indexOf('dev') > -1) {
    return 'https://dev.xinc818.net/sso-system/#/user/login';
  } else if (host.indexOf('daily') > -1) {
    return 'https://daily.xinc818.net/sso-system/#/user/login';
  } else if (host.indexOf('gray') > -1) {
    return 'https://gray.xinc818.net/sso-system/#/user/login';
  }
  return 'https://gaea.xinc818.com/#/user/login';
})();

export const href = ((): any => {
  const host = window.location.host;
  if (host.indexOf('daily') > -1) {
    return `https://api.daily.xinxuan818.net`;
  } else if (host.indexOf('dev') > -1 || host.indexOf('localhost') > -1) {
    return `https://api.xinxuan818.com`;
  } else if (host.indexOf('gray') > -1) {
    return `https://api.gray.xinxuan818.net`;
  }
  return `https://api.xinxuan818.com`;
})();

//get参数拼接
export const getQueryStr = (url: string, query: any = {}) => {
  const queryStr = Object.keys(query)
    .reduce((ary: any, key: any) => {
      if (query[key]) {
        // @ts-ignore
        ary.push(
          encodeURIComponent(key) + '=' + encodeURIComponent(query[key]),
        );
      }
      return ary;
    }, [])
    .join('&');
  let u = url;
  u += `?${queryStr}`;
  return u;
};

const isObject = (val: any) => {
  return typeof val === 'object' && val !== null;
};
//deepClone
export const deepClone = (obj: any, hash = new WeakMap()) => {
  if (!isObject(obj)) {
    return obj;
  }
  if (hash.has(obj)) {
    return hash.get(obj);
  }
  let target: any = Array.isArray(obj) ? [] : {};
  hash.set(obj, target);
  Reflect.ownKeys(obj).forEach((item) => {
    if (isObject(obj[item])) {
      target[item] = deepClone(obj[item], hash);
    } else {
      target[item] = obj[item];
    }
  });
  return target;
};
// voc看板详情
export const voc = (() => {
  const { host } = window.location;
  if (host.indexOf('localhost') > -1 || host.indexOf('dev') > -1) {
    return 'https://dev.xinc818.net/supply/#/commodity/data/detail';
  } else if (host.indexOf('daily') > -1) {
    return 'https://daily.xinc818.net/supply/#/commodity/data/detail';
  } else if (host.indexOf('gray') > -1) {
    return 'https://gray.xinc818.net/supply/#/commodity/data/detail';
  }
  return 'https://h5.xinc818.com/supply/#/commodity/data/detail';
})();

export const setCookie = (key: any, value: any) => {
  let cookieDomain = '.xinxuan818.com';
  let domain = document.domain;
  let domainArr = domain.split('.');
  if (domain.indexOf('daily.xinc818.net') > -1) {
    cookieDomain = 'daily.xinc818.net';
  } else if (domain.indexOf('dev.xinc818.net') > -1) {
    cookieDomain = 'dev.xinc818.net';
  } else if (domain.indexOf('gray.xinc818.net') > -1) {
    cookieDomain = 'gray.xinc818.net';
  } else if (domainArr.length > 2) {
    cookieDomain =
      '.' +
      domainArr[domainArr.length - 2] +
      '.' +
      domainArr[domainArr.length - 1];
  } else {
    cookieDomain = domain;
  }
  Cookies.set(key, value, {
    expires: 10 * 365,
    domain: cookieDomain,
  });
};
