import React from 'react';


import { Layout, Menu, Input, Tabs, DatePicker, Button } from 'antd';
import type { MenuProps, } from 'antd';
import { LaptopOutlined, NotificationOutlined, UserOutlined, VideoCameraAddOutlined } from '@ant-design/icons';
import styles from './index.less';

const { Sider } = Layout;
const { Search } = Input;
const { RangePicker } = DatePicker;



const HistoryMonitor = () => {

  const tabsConfig = [
    {
      key: '1',
      label: 'Tab 1',
      children: 'Content of Tab Pane 1',
    },
    {
      key: '2',
      label: 'Tab 2',
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
          <Tabs defaultActiveKey="1" items={tabsConfig} onChange={onChangeTabs} />

          <div className={styles.h_warpper}>
            {/* 时间筛选操作栏 */}
            <div className={styles.h_f}>
              <div className={styles.h_t}>
                <span>时间选择：</span>
                <RangePicker />
              </div>

              <Button type="primary">全部播放</Button>
            </div>
            {/* 九宫格视屏播放 */}
            <div className={styles.h_flex}>
              <div className={styles.h_flex_item}>
                <div className={styles.h_device_item}>
                  <img src={require('@/assets/img/1.jpeg')} alt="" />
                  <div className={styles.info}>
                    <div className={styles.icon}><VideoCameraAddOutlined /></div>
                    <div className={styles.name}>南门摄像头</div>
                  </div>
                </div>
              </div>

              <div className={styles.h_flex_item}>
                <div className={styles.h_device_item}>
                  <img src={require('@/assets/img/2.jpeg')} alt="" />
                  <div className={styles.info}>
                    <div className={styles.icon}><VideoCameraAddOutlined /></div>
                    <div className={styles.name}>南门摄像头</div>
                  </div>
                </div>
              </div>

              <div className={styles.h_flex_item}>
                <div className={styles.h_device_item}>
                  <img src={require('@/assets/img/3.jpeg')} alt="" />
                  <div className={styles.info}>
                    <div className={styles.icon}><VideoCameraAddOutlined /></div>
                    <div className={styles.name}>南门摄像头</div>
                  </div>
                </div>
              </div>

              <div className={styles.h_flex_item}>
                <div className={styles.h_device_item}>
                  <img src={require('@/assets/img/3.jpg')} alt="" />
                  <div className={styles.info}>
                    <div className={styles.icon}><VideoCameraAddOutlined /></div>
                    <div className={styles.name}>南门摄像头</div>
                  </div>
                </div>
              </div>

              <div className={styles.h_flex_item}>
                <div className={styles.h_device_item}>
                  <img src={require('@/assets/img/4.jpeg')} alt="" />
                  <div className={styles.info}>
                    <div className={styles.icon}><VideoCameraAddOutlined /></div>
                    <div className={styles.name}>南门摄像头</div>
                  </div>
                </div>
              </div>

              <div className={styles.h_flex_item}>
                <div className={styles.h_device_item}>
                  <img src={require('@/assets/img/5.jpeg')} alt="" />
                  <div className={styles.info}>
                    <div className={styles.icon}><VideoCameraAddOutlined /></div>
                    <div className={styles.name}>南门摄像头</div>
                  </div>
                </div>
              </div>

              <div className={styles.h_flex_item}>
                <div className={styles.h_device_item}>
                  <img src={require('@/assets/img/11.jpeg')} alt="" />
                  <div className={styles.info}>
                    <div className={styles.icon}><VideoCameraAddOutlined /></div>
                    <div className={styles.name}>南门摄像头</div>
                  </div>
                </div>
              </div>

              <div className={styles.h_flex_item}>
                <div className={styles.h_device_item}>
                  <img src={require('@/assets/img/22.webp')} alt="" />
                  <div className={styles.info}>
                    <div className={styles.icon}><VideoCameraAddOutlined /></div>
                    <div className={styles.name}>南门摄像头</div>
                  </div>
                </div>
              </div>

              <div className={styles.h_flex_item}>
                <div className={styles.h_device_item}>
                  <img src={require('@/assets/img/33.webp')} alt="" />
                  <div className={styles.info}>
                    <div className={styles.icon}><VideoCameraAddOutlined /></div>
                    <div className={styles.name}>南门摄像头</div>
                  </div>
                </div>
              </div>


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

export default HistoryMonitor