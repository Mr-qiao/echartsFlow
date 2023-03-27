const host = location.host;

let env = 'production';

if (host.includes('dev') || host.includes('localhost')) {
	env = 'development';
} else if (host.includes('daily')) {
	env = 'daily';
} else if (host.includes('gray')) {
	env = 'gray';
}
// env = 'daily';


const ajaxBaseUrl = {
	development: 'https://api.dev.xinc818.net',
	daily: 'https://api.daily.xinc818.net',
	gray: 'http://192.168.11.185:8080',
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
