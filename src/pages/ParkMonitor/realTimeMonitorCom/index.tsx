/**
 * 实时监控
 */

import React, { useState } from 'react';
import { DatePicker, Button } from 'antd';

import { ExpandOutlined, AppstoreOutlined, TableOutlined, VideoCameraAddOutlined } from '@ant-design/icons';

import styles from '../index.less';


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
  {
    key: 5,
    playVideo: require('@/assets/img/3.jpeg'),
    icon: <VideoCameraAddOutlined />,
    name: '南门摄像头'
  },
  {
    key: 6,
    playVideo: require('@/assets/img/3.jpeg'),
    icon: <VideoCameraAddOutlined />,
    name: '南门摄像头'
  },
  {
    key: 7,
    playVideo: require('@/assets/img/3.jpeg'),
    icon: <VideoCameraAddOutlined />,
    name: '南门摄像头'
  },
  {
    key: 8,
    playVideo: require('@/assets/img/3.jpeg'),
    icon: <VideoCameraAddOutlined />,
    name: '南门摄像头'
  },
  {
    key: 9,
    playVideo: require('@/assets/img/3.jpeg'),
    icon: <VideoCameraAddOutlined />,
    name: '南门摄像头'
  },
]


const RealTimeMonitorCom = () => {

  const [currentIndex, setCurrentIndex] = useState(9)
  const [playVideoList, setPlayVideoList] = useState(contantsPlay || []);


  const handleIndex = (idx: number) => {

    if (idx === 4) {
      const newplayVideoList = contantsPlay.slice(0, 4);
      setPlayVideoList(newplayVideoList)
    } else {
      setPlayVideoList(contantsPlay)
    }
    setCurrentIndex(idx);
  }


  return (
    <div className={styles.h_warpper} >
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
                <Button style={{ marginRight: 10 }} className={currentIndex === item ? styles.active : null} key={item} onClick={() => handleIndex(item)} icon={item === 4 ? <AppstoreOutlined /> : <TableOutlined />}></Button>
              ))
            }
          </div>
          <Button icon={<ExpandOutlined />}></Button>
        </div>
      </div>
      {/* 4 / 9 */}
      <div className={styles.videogrid_wrapper}>
        {
          <div className={`${styles.videogrid} ${currentIndex === 9 ? styles.videogrid_9 : styles.videogrid_4}`} id="maxView">
            {
              playVideoList.map(item => {
                return (
                  <div className={styles.vgw_player_wrapper} key={item.key}>
                    <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.87)', width: '100%', aspectRatio: 'auto 16 / 9', maxWidth: '100%', height: '0px', paddingTop: '56.25%' }}>
                    </div>
                  </div>
                )
              })
            }
          </div>
        }
      </div>
      {/* 底部操作 */}
      <div className={styles.h_footer_handle}>
        <div className={styles.h_handle_play}>
          <Button icon={<VideoCameraAddOutlined />}></Button>
        </div>
      </div>
    </div>
  )
}


export default RealTimeMonitorCom;


