import {defineConfig} from '@umijs/max';
import {routes} from './src/routes';

export default defineConfig({
	model: {},
	initialState: {},
	devtool: 'source-map',
	theme: {
		"primary-color": "#f5222d",
	},
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
	// theme: { '@primary-color': '#86909C' },
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
