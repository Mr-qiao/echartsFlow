











import React from 'react';
import { Outlet } from '@umijs/max';
import { Layout, ConfigProvider, Button } from 'antd';
import AvatarName from '@/components/AvatarName';
import zhCN from 'antd/es/locale/zh_CN';


const { Header } = Layout;

export default () => {





  return (
    <div>
      <Header className="xc-layout-header">
        <div></div>
        <div className="use-info">
          <AvatarName />
        </div>
      </Header>
      <div className="xc-main-wrapper">
        <ConfigProvider locale={zhCN}>
          <Outlet />
        </ConfigProvider>
      </div>
    </div>
  )
}

