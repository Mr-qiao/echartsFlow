/**
 * 园区监控
 */


import React from 'react';


import { Layout, Menu, Input, Tabs, Col, Row } from 'antd';
import type { MenuProps, } from 'antd';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';

import ChartPanel from '@/components/ChartPanel'


import HistoryMonitorCom from './historyMonitorCom';
import RealTimeMonitorCom from './realTimeMonitorCom';

import styles from './index.less';

const { Sider } = Layout;
const { Search } = Input;



const parkMonitor = () => {

  // 侧边拦
  const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
    (icon, index) => {
      const key = String(index + 1);
      return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: `北京大兴 ${key}`,
        children: new Array(4).fill(null).map((_, j) => {
          const subKey = index * 4 + j + 1;
          return {
            key: subKey,
            label: `摄像头${subKey}`,
          };
        }),
      };
    },
  );


  const onSearch = (e) => {
    console.log(e, '----')
  }

  const onChangeTabs = (e) => {
    console.log(e, '===----')
  }

  return (
    <div className={styles.nationalOverviewContainer}>
      <Row gutter={10}>
        <Col span={6}>
          <ChartPanel title='监控列表' style={{ minHeight: '80vh', overFlow: 'hiddle' }}>
            <Search
              className={styles.search_inp}
              placeholder="请输入设备名称"
              allowClear
              enterButton="搜索"
              size="large"
              onSearch={onSearch}
            />

            <Sider style={{ height: '100%' }} width="100%" className={styles.h_sider}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                items={items2}
              />
            </Sider>
          </ChartPanel>
        </Col>
        {/* 中间 */}
        <Col span={12}>
          <ChartPanel>
            {/* tab切换 */}
            <Tabs defaultActiveKey="1" items={[
              {
                key: '1',
                label: '历史监控',
                children: <HistoryMonitorCom />,
              },
              {
                key: '2',
                label: '实时监控',
                children: <RealTimeMonitorCom />,
              },
            ]} onChange={onChangeTabs} className={styles.h_tabs} tabBarStyle={{ backgroundColor: '#0C0031' }} />
          </ChartPanel>
        </Col>

        {/* 右边 */}
        <Col span={6}>
          <ChartPanel title='AI信息' style={{ height: '80vh' }}>
            <div className={styles.h_right}></div>
          </ChartPanel>
        </Col>
      </Row>
    </div>
  )
}

export default parkMonitor
