/**
 * 园区概况
 */


import React, { useState } from 'react';


import { Layout, Menu, Input, Tabs, DatePicker, Button } from 'antd';
import type { MenuProps, } from 'antd';
import { LaptopOutlined, NotificationOutlined, UserOutlined, VideoCameraAddOutlined } from '@ant-design/icons';
import styles from './index.less';

const { Sider } = Layout;
const { Search } = Input;
const { RangePicker } = DatePicker;


// mock Json
const contantsPlay = [
  {
    key: 1,
    playVideo: require('@/assets/img/3.jpeg'),
    icon: <VideoCameraAddOutlined />,
    name: '南门摄像头'
  },
  {
    key: 2,
    playVideo: require('@/assets/img/3.jpeg'),
    icon: <VideoCameraAddOutlined />,
    name: '南门摄像头'
  },
  {
    key: 3,
    playVideo: require('@/assets/img/3.jpeg'),
    icon: <VideoCameraAddOutlined />,
    name: '南门摄像头'
  },
  {
    key: 4,
    playVideo: require('@/assets/img/3.jpeg'),
    icon: <VideoCameraAddOutlined />,
    name: '南门摄像头'
  },
  // {
  //   key: 5,
  //   playVideo: require('@/assets/img/3.jpeg'),
  //   icon: <VideoCameraAddOutlined />,
  //   name: '南门摄像头'
  // },
  // {
  //   key: 6,
  //   playVideo: require('@/assets/img/3.jpeg'),
  //   icon: <VideoCameraAddOutlined />,
  //   name: '南门摄像头'
  // },
  // {
  //   key: 7,
  //   playVideo: require('@/assets/img/3.jpeg'),
  //   icon: <VideoCameraAddOutlined />,
  //   name: '南门摄像头'
  // },
  // {
  //   key: 8,
  //   playVideo: require('@/assets/img/3.jpeg'),
  //   icon: <VideoCameraAddOutlined />,
  //   name: '南门摄像头'
  // },
  // {
  //   key: 9,
  //   playVideo: require('@/assets/img/3.jpeg'),
  //   icon: <VideoCameraAddOutlined />,
  //   name: '南门摄像头'
  // },
]

const ParkMonitor = () => {


  const [currentIndex, setCurrentIndex] = useState(0)

  const tabsConfig = [
    {
      key: '1',
      label: '历史监控',
      children: 'Content of Tab Pane 1',
    },
    {
      key: '2',
      label: '实时监控',
      children: 'Content of Tab Pane 2',
    },
  ]

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

  const handleIndex = (idx: number) => {
    setCurrentIndex(idx);
  }

  return (
    <div className={styles.nationalOverviewContainer}>

      <div className={styles.nationalOverviewWarp}>
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

          <Sider style={{ height: '100%' }} width="100%" className={styles.h_sider}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              // style={{ height: '100%' }}
              items={items2}
            />
          </Sider>

        </div>
        {/* 中间 */}
        <div className={styles.h_middle}>
          {/* tab切换 */}
          <Tabs defaultActiveKey="1" items={tabsConfig} onChange={onChangeTabs} className={styles.h_tabs} tabBarStyle={{ backgroundColor: '#0C0031' }} />

          <div className={styles.h_warpper}>
            {/* 时间筛选操作栏 */}
            <div className={styles.h_f}>
              <div className={styles.h_t}>
                <span>时间选择：</span>
                <RangePicker />
              </div>

              <div className={styles.h_play_box}>
                <div className={styles.h_button_group}>
                  {
                    [4, 9].map((item, i) => (
                      <div className={currentIndex === i ? styles.active : null} key={item} onClick={() => handleIndex(i)}>{item}</div>
                    ))
                  }
                </div>
                <Button type="primary">全部播放</Button>
              </div>
            </div>
            {/* 九宫格视屏播放 */}
            <div className={styles.h_flex}>
              {
                contantsPlay.map(item => {
                  return (
                    <div className={styles.h_flex_9} key={item.key}>
                      <div className={styles.h_play}>
                        <img src={item.playVideo} alt="" style={{ width: '100%', height: '100%', borderRadius: '3px' }} />
                        <div className={styles.info}>
                          <div className={styles.icon}>{item.icon}</div>
                          <div className={styles.name}>{item.name}</div>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
              {/* {
                contantsPlay.map(item => {
                  return (
                    <div className={styles.h_flex_4} key={item.key}>
                      <div className={styles.h_play}>
                        <img src={item.playVideo} alt="" />
                        <div className={styles.info}>
                          <div className={styles.icon}>{item.icon}</div>
                          <div className={styles.name}>{item.name}</div>
                        </div>
                      </div>
                    </div>
                  )
                })
              } */}
            </div>

            {/* 底部操作 */}
            <div className={styles.h_footer_handle}>
              <div className={styles.h_handle_box}>
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
              </div>

              <div className={styles.h_handle_play}>
                <div>录视频</div>
                <div>导出</div>
                <div>音量</div>
                <div>抓拍</div>
              </div>
            </div>
          </div>



        </div>
        {/* 右边 */}
        <div className={styles.h_right}>右边</div>
      </div>

    </div>
  )
}

export default ParkMonitor