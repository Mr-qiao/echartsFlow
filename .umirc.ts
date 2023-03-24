import {defineConfig} from '@umijs/max';
import {routes} from './src/routes';

export default defineConfig({
	publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
	model: {},
	initialState: {},
	devtool: 'source-map',
	request: {},
	locale: {
		default: 'zh-CN', // 工程默认语言
		antd: true,
		// 默认为true。为true时，会使用`navigator.language`覆盖默认。为false时，则使用默认语言
		baseNavigator: false,
	},
	layout: {
		title: '设计师中台-工厂端',
	},
	history: { type: 'hash' },
	routes,
	npmClient: 'yarn',
	// proxy: {
	//   '/api': {
	//     'target': 'http://192.168.12.124:8080',
	//     'changeOrigin': true,
	//     'pathRewrite': { '^/api' : '' },
	//   }
	// }
});
