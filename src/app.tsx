// 运行时配置
import AvatarName from '@/components/AvatarName';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { useLocation } from '@umijs/max';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

import 'antd/dist/reset.css';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { useState } from 'react';
import './global.less';
import { errorConfig } from './requestErrorConfig';
import './style/base.less';

dayjs.locale('zh-cn');

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate

export const layout = () => {
  const [collapsed, setCollapsed] = useState(false);
  return {
    // logo: 'https://s.xinc818.com/assets/images/favicon.ico',
    navTheme: 'light',
    headerTheme: 'light',
    token: {
      sider: {
        colorMenuBackground: '#001529',
        colorTextMenuTitle: 'rgba(255,255,255,0.95)',
        colorTextMenu: 'rgba(255,255,255,0.75)',
        colorTextMenuSelected: '#fff',
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
        {/* <img src={logo} style={{ width: '200px', height: '80px' }} /> */}
        {/* <img src={logo} alt="" style={{ width: '200px', height: '80px' }} /> */}
        <h1 className="u-fs20" style={{ margin: '20px 0 20px 20px' }}>
          可视化监管平台
        </h1>
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
            <MenuFoldOutlined style={{ color: '#C9CDD4' }} />
          </>
        ) : (
          <>
            <span className="u-fs12 u-mr5">展开</span>
            <MenuUnfoldOutlined style={{ color: '#C9CDD4' }} />
          </>
        )}
      </div>
    ),
    siderWidth: 200,
    disableMobile: true, //禁止自动切换到移动页面
    contentStyle: {
      minHeight: '100vh',
    },
    childrenRender: (children: any) => {
      const location = useLocation();
      const isHome = location.pathname === '/home';
      return (
        <div>
          {/* <AvatarName /> */}
          <PageContainer className="PageContainer">
            <ConfigProvider locale={zhCN}>{children}</ConfigProvider>
          </PageContainer>
        </div>
      );
    },
  };
};

export const request = {
  ...errorConfig,
};
