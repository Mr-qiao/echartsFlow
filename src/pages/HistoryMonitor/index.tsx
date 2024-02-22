import React from 'react';


import { Layout, Menu, Input } from 'antd';
import type { MenuProps, } from 'antd';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import styles from './index.less';

const { Sider } = Layout;
const { Search } = Input;



const HistoryMonitor = () => {



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

  return (
    <div className={styles.historyMonitorContainer}>

      <div className={styles.historyMonitorWarp}>
        {/* 左边 */}
        <div className={styles.h_left}>
          <h3>监控列表</h3>

          <Search
            className={styles.search_inp}
            placeholder="请输入设备名称"
            allowClear
            enterButton="搜索"
            size="large"
            onSearch={onSearch}
          />

          <Sider style={{ height: '100%' }} width="100%">
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
              items={items2}
            />
          </Sider>

        </div>
        {/* 中间 */}
        <div className={styles.h_middle}>
          <ul className={styles.h_middle_ul}>
            {
              [1, 2, 3, 4, 5, 6, 7, 8, 9].map(item => (
                <li key={item}>
                  {item}
                </li>
              ))
            }
          </ul>

        </div>
        {/* 右边 */}
        <div className={styles.h_right}>右边</div>
      </div>

    </div>
  )
}

export default HistoryMonitor