// 运行时配置

import AvatarName from '@/components/AvatarName';
import Breadcrumb from '@/components/Breadcrumb';
import { PageContainer } from '@ant-design/pro-components';
import { useLocation } from '@umijs/max';
import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { useState } from 'react';
import logo from '../public/imglogo.png';
import './global.less';
import { errorConfig } from './requestErrorConfig';

dayjs.locale('zh-cn');

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate

export const layout = () => {
  const [collapsed, setCollapsed] = useState(false);
  return {
    // layout: 'side',
    logo: 'https://s.xinc818.com/assets/images/favicon.ico',
    navTheme: 'light',
    headerTheme: 'light',
    token: {
      sider: {
        colorMenuBackground: '#3D54CC',
        colorTextMenuTitle: 'rgba(255,255,255,0.95)',
        // colorMenuItemDivider: 'transparent',
        colorTextMenu: 'rgba(255,255,255,0.75)',
        // colorTextMenuSecondary: 'rgba(255,255,255,0.65)',
        colorTextMenuSelected: '#fff',
        // colorBgMenuItemSelected: '#e91a00',
        // colorBgMenuItemCollapsedHover: 'rgba(0,0,0,0.06)',
        // colorBgMenuItemCollapsedSelected: 'rgba(0,0,0,0.15)',
        // colorTextCollapsedButtonHover: 'rgba(0,0,0,0.65)',
        // colorTextCollapsedButton: 'rgba(0,0,0,0.45)',
        // colorTextMenuActive: 'rgba(255,255,255,0.95)',
      },
      header: {
        colorBgHeader: '#fff',
      },
      pageContainer: {
        colorBgPageContainer: '#fff',
      },
    },
    menuHeaderRender: () => (
      <div className="u-f__center">
        <img src={logo} style={{ width: '200px', height: '80px' }} />
        {/*{!collapsed && (*/}
        {/*	// <img*/}
        {/*	// 	alt="合作商监管平台"*/}
        {/*	// 	className="u-ml6"*/}
        {/*	// 	style={{width: '128px', height: '31px'}}*/}
        {/*	// 	src="https://s.xinc818.com/files/webcil9xmqi0aolow2y/logo_name@2x.png"*/}
        {/*	// />*/}
        {/*	<h1 style={{color: '#fff', marginTop: 6, marginLeft: 6}}>飓风中台工厂端</h1>*/}
        {/*)}*/}
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
        {/* {!collapsed ? (
          <>
            <span className="u-fs12 u-mr5">收起</span>
            <MenuFoldOutlined style={{ color: '#C9CDD4' }} />
          </>
        ) : (
          <>
            <span className="u-fs12 u-mr5">展开</span>
            <MenuUnfoldOutlined style={{ color: '#C9CDD4' }} />
          </>
        )} */}
      </div>
    ),
    siderWidth: 200,
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
          <AvatarName />
          <PageContainer
            // className="PageContainer"
            breadcrumbRender={(props: any) => {
              return <Breadcrumb {...props} />;
            }}
          >
            <ConfigProvider
              // locale={zhCN}
              theme={{
                token: {
                  colorPrimary: '#3D54CC',
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
