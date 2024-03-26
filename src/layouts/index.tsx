import { Outlet } from '@umijs/max';
import { Layout, ConfigProvider, Button } from 'antd';
import AvatarName from '@/components/AvatarName';
import zhCN from 'antd/es/locale/zh_CN';

const { Header } = Layout;

export default () => {

  return (
    <div style={{
      padding: '0',
      margin: '0',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        marginRight: '20px',
      }}>
        <div></div>
        <div className="use-info">
          <AvatarName />
        </div>
      </div>
      <div className="xc-main-wrapper">
        <ConfigProvider locale={zhCN}>
          <Outlet />
        </ConfigProvider>
      </div>
    </div>
  )
}

