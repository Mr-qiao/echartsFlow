/**
 * 历史监控
 */

import React, { useEffect, useState } from 'react';
import { Layout, Menu, Input, Tabs, DatePicker, Button, Col, Row } from 'antd';

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


const HistoryMonitorCom = () => {
  const [currentIndex, setCurrentIndex] = useState(9)
  const [playVideoList, setPlayVideoList] = useState(contantsPlay || []);
  const [maxView, setMaxView] = useState(false);

  const [activeIndex, setActiveIndex] = useState(1)


  const handleIndex = (idx: number) => {
    if (idx === 4) {
      const newplayVideoList = contantsPlay.slice(0, 4);
      setPlayVideoList(newplayVideoList)
    } else {
      setPlayVideoList(contantsPlay)
    }
    setCurrentIndex(idx);
  }


  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e?.keyCode === 27) {
        setMaxView(false);
      }
    });

    return () => {
      document.removeEventListener('keydown', (e) => {
        setMaxView(false);
      })
    }

  }, [])

  // active click
  const handleActive = (key: number) => {
    setActiveIndex(key);
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
          <Button icon={<ExpandOutlined />} onClick={() => setMaxView(true)}></Button>
        </div>
      </div>
      {/* 4 / 9 */}
      <div className={`${styles.videogrid_wrapper} ${maxView ? styles.fullscreen : null}`} >
        {
          <div className={`${styles.videogrid} ${currentIndex === 9 ? styles.videogrid_9 : styles.videogrid_4} ${maxView ? styles.fullscreen : null}`} id="maxView">
            {
              playVideoList.map(item => {
                return (
                  <div className={`${styles.player_wrapper} ${item.key === activeIndex ? styles.activeIndex : null}`} key={item.key} onClick={() => handleActive(item.key)}>
                    <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.87)', width: '100%', aspectRatio: 'auto 16 / 9', maxWidth: '100%', height: '0px', paddingTop: '56.25%' }}>
                      {/* <video controls style={{ width: '100%', aspectRatio: 'auto 16 / 9', maxWidth: '100%', height: '0px', paddingTop: '56.25%' }}>
                        <source src="/media/cc0-videos/flower.webm" type="video/webm" />

                        <source src="/media/cc0-videos/flower.mp4" type="video/mp4" />

                        Download the
                        <a href="/media/cc0-videos/flower.webm">WEBM</a>
                        or
                        <a href="/media/cc0-videos/flower.mp4">MP4</a>
                        video.
                      </video> */}

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


export default HistoryMonitorCom;


