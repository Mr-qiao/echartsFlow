import React, { useState } from 'react';
import Footer from './Footer';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import Security from './Security';
import Park from './Park';
import { Layout, theme, Menu } from 'antd'


import styles from './index.less';


const { Header, Content, Sider } = Layout;


const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,

      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  },
);

const Home: any = () => {
  const [type, setType] = useState('park');


  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <div className={styles.container}>

      {/* 头部导航 */}
      <header className={styles.header}>
        <h3 className={styles.title}>{'park' === type ? '可视化数据大屏' : '园区监控系统'} </h3>
        <div className={styles.flexBox}>
          <select className={styles.h_c}>
            <option> 北京市</option>
            <option>自贡市</option>
            <option>攀枝花市</option>
            <option>泸州市</option>
            <option>德阳市</option>
            <option>绵阳市</option>
            <option>广元市</option>
            <option>遂宁市</option>
            <option>内江市</option>
            <option>乐山市</option>
            <option>南充市</option>
            <option>宜宾市</option>
            <option>广安市</option>
            <option>达州市</option>
            <option>巴中市</option>
            <option>雅安市</option>
            <option>眉山市</option>
            <option>资阳市</option>
            <option>阿坝州</option>
            <option>甘孜州</option>
            <option>凉山州</option>
          </select>

          <span className={styles.h_t}>统计截止时间：2023-9-20</span>
        </div>
      </header>


      {'park' === type ? <Park /> : <Security />}

      {/* 底部导航 */}
      {/* <Footer onClick={(key) => setType(key)} /> */}

      {/* <Sider style={{ position: 'absolute', left: '50%', top: '50%' }} width={200}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%' }}
          items={items2}
        />
      </Sider> */}
    </div>
  );
};

export default Home;
