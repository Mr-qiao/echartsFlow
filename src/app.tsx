// 运行时配置

import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
import {useLocation} from '@umijs/max';
import {useState} from 'react';
import {errorConfig} from './requestErrorConfig';
import AvatarName from '@/components/AvatarName';
import Breadcrumb from '@/components/Breadcrumb';
import {PageContainer, ProBreadcrumb} from '@ant-design/pro-components';
import {ConfigProvider} from 'antd';
import 'antd/dist/reset.css';
import 'moment/dist/locale/zh-cn';
import './global.less'

import moment from 'moment';

moment.locale('zh-cn');

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate

export const layout = () => {
	const [collapsed, setCollapsed] = useState(false);
	return {
		// layout: 'side',
		navTheme: 'light',
		headerTheme: 'light',
		token: {
			sider: {
				colorMenuBackground: '#211D29',
				colorTextMenuTitle: 'rgba(255,255,255,0.95)',
				colorMenuItemDivider: 'transparent',
				colorTextMenu: 'rgba(255,255,255,0.75)',
				colorTextMenuSecondary: 'rgba(255,255,255,0.65)',
				colorTextMenuSelected: '#fff',
				colorBgMenuItemSelected: '#e91a00',
				colorBgMenuItemCollapsedHover: 'rgba(0,0,0,0.06)',
				colorBgMenuItemCollapsedSelected: 'rgba(0,0,0,0.15)',
				colorTextCollapsedButtonHover: 'rgba(0,0,0,0.65)',
				colorTextCollapsedButton: 'rgba(0,0,0,0.45)',
				colorTextMenuActive: 'rgba(255,255,255,0.95)',
			},
			header: {
				colorBgHeader: '#211D29',
			},
			pageContainer: {
				colorBgPageContainer: 'rgb(240, 242, 245)',
			},
		},
		menuHeaderRender: () => (
			<div className="u-f__center">
				<img
					src="https://s.xinc818.com/files/webcil9xn91qkpaokns/logo_icon@2x.png"
					style={{width: '32px', height: '32px'}}
				/>
				{!collapsed && (
					// <img
					// 	alt="合作商监管平台"
					// 	className="u-ml6"
					// 	style={{width: '128px', height: '31px'}}
					// 	src="https://s.xinc818.com/files/webcil9xmqi0aolow2y/logo_name@2x.png"
					// />
					<h1 style={{color: '#fff'}}>设计师中台-工厂端</h1>
				)}
			</div>
		),
		menu: {
			locale: false,
		},
		collapsed: collapsed,
		collapsedButtonRender: () => (
			<div
				className="u-c__gray u-f__end u-cr__p u-mr8"
				onClick={() => setCollapsed(!collapsed)}
			>
				{!collapsed ? (
					<>
						<span className="u-fs12 u-mr5">收起</span>
						<MenuFoldOutlined style={{color: '#C9CDD4'}}/>
					</>
				) : (
					<>
						<span className="u-fs12 u-mr5">展开</span>
						<MenuUnfoldOutlined style={{color: '#C9CDD4'}}/>
					</>
				)}
			</div>
		),
		siderWidth: 230,
		disableMobile: true, //禁止自动切换到移动页面
		contentStyle: {
			minHeight: '100vh',
			// overflow: 'auto',
			// overflowX: 'hidden',
			// maxWidth:'100vh',
			// padding: '16px',
			// margin: 0,
			// minWidth: '1080px',
		},
		childrenRender: (children: any) => {
			const location = useLocation();
			const isHome = location.pathname === '/home';
			return (
				<div>
					<AvatarName/>
					<PageContainer
						// className="PageContainer"
						breadcrumbRender={(props: any) => {
							return <Breadcrumb {...props} />;
						}}
					>
						<ConfigProvider
							theme={{
								token: {
									colorPrimary: '#f5222d',
								},
							}}
						>
							{children}
						</ConfigProvider>
					</PageContainer>
				</div>
			);
		},
	};
};

export const request = {
	...errorConfig,
};
