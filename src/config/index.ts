const host = location.host;

let env = 'daily';


const ajaxBaseUrl = {
  development: 'https://api.dev.xinc818.net',
  daily: 'https://api.daily.xinc818.net',
  gray: 'https://api.gray.xinc818.net',
  production: 'https://api.xinc818.com',
}[env];


export default {
  ajaxBaseUrl,
  env,
};
