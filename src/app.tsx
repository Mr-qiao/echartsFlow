// 运行时配置
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { useLocation } from '@umijs/max';
import { Link } from 'umi'
import { ConfigProvider, Layout } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

import 'antd/dist/reset.css';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { useState } from 'react';
import './global.less';
import { errorConfig } from './requestErrorConfig';

dayjs.locale('zh-cn');

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate



const { Header } = Layout;

export const layout = () => {
  const [collapsed, setCollapsed] = useState(false);
  return {
    // title: '德力西电气监控视频汇聚平台',
    navTheme: 'light',
    headerTheme: 'light',
    token: {
      sider: {
        colorMenuBackground: '#001529',
        // colorTextMenuTitle: 'rgba(255,255,255,0.95)',
        // colorTextMenu: 'rgba(255,255,255,0.75)',
        // colorTextMenuSelected: '#fff',

        colorBgCollapsedButton: '#fff',
        colorTextCollapsedButtonHover: '#1677ff',
        colorTextCollapsedButton: 'rgba(0,0,0,0.45)',
        // colorMenuBackground: '#fff',
        colorBgMenuItemCollapsedElevated: 'rgba(0,0,0,0.85)',
        colorMenuItemDivider: 'rgba(255,255,255,0.15)',
        colorBgMenuItemHover: 'rgba(0,0,0,0.06)',
        colorBgMenuItemSelected: 'rgba(0,0,0,0.05)',
        colorTextMenuSelected: '#1677ff',
        colorTextMenuItemHover: '#1677ff',
        colorTextMenu: 'rgba(255,255,255,0.75)',
        colorTextMenuSecondary: 'rgba(255,255,255,0.65)',
        colorTextMenuTitle: 'rgba(255,255,255,0.95)',
        colorTextMenuActive: '#1677ff',
        colorTextSubMenuSelected: '#1677ff',

      },
      header: {
        // colorBgHeader: '#fff',
      },
      pageContainer: {
        // colorBgPageContainer: '#fff',
      },
    },
    menu: {
      locale: false,
    },
    collapsed: collapsed,
    collapsedButtonRender: () => (
      <div
        className="u-c__gray u-f__end u-cr__p u-mr8"
        onClick={() => setCollapsed(!collapsed)}
      >
      </div>
    ),
    siderWidth: 200,
  };
};

export const request = {
  ...errorConfig,
};
