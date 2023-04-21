const host = location.host;

let env = 'production';

if (host.includes('dev') || host.includes('localhost')) {
  // env = 'development';
  env = 'daily';
} else if (host.includes('daily')) {
  env = 'daily';
} else if (host.includes('gray')) {
  env = 'gray';
}

const ajaxBaseUrl = {
  development: 'https://api.dev.xinc818.net',
  daily: 'https://api.daily.xinc818.net',
  gray: 'https://api.gray.xinc818.net',
  production: 'https://api.xinc818.com',
}[env];

const loginUrl: any = {
  development: 'https://dev.xinc818.net/sso-system/',
  daily: 'https://daily.xinc818.net/sso-system/',
  gray: 'https://gray.xinc818.net/sso-system/',
  production: 'https://gaea.xinc818.com/',
}[env];

export default {
  ajaxBaseUrl,
  loginUrl,
  env,
};
