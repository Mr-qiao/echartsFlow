/**
 * 实时监控
 */
import React, { useState, useEffect, useRef, RefObject } from 'react';
import { Button } from 'antd';

import close from '@/assets/img/close.png'

import { AppstoreOutlined, TableOutlined, BorderOutlined } from '@ant-design/icons';
import { cx } from '@emotion/css';

import styles from '../index.less';
import { VideoPlay } from '@/components/videoPlay';
import { deviceStreamApi } from '@/services/system';

const buttonList = [{
  icon: < BorderOutlined />,
  id: 1
}, {
  icon: <AppstoreOutlined />,
  id: 4
}, {
  icon: <TableOutlined />,
  id: 9
},]

type Props = {
  videoUrlList: string[]
  rightList: {
    name: string
    url: string
  }[]
  setRightList: (obj: {
    name: string
    url: string
  }) => void
}
const RealTimeMonitorCom = (props: Props) => {
  const { videoUrlList } = props;
  const [currentIndex, setCurrentIndex] = useState(4)
  const [playVideoList, setPlayVideoList] = useState<{
    id: string,
    streamUrl: string
  }[]>
    ([{
      id: '',
      streamUrl: ''
    }]);

  const [maxView, setMaxView] = useState(false);

  const handleFullScreen = async (videoIdList: string[]) => {
    if (videoIdList.length === 0) {
      setPlayVideoList([{
        id: '',
        streamUrl: ''
      }])
      return;
    };
    Promise.all(
      videoIdList.map((id) => {
        return deviceStreamApi(id, {
          type: 'play'
        })
      })
    ).then(res => {
      setPlayVideoList(res.map((item, i) => {
        return {
          id: videoIdList[i],
          streamUrl: item.data.streamUrl
        }
      }))
    })
  }

  const handleIndex = (idx: number) => {
    if (idx === 1 && videoUrlList.length >= 1) {
      handleFullScreen(videoUrlList.slice(-1))
    } else if (idx === 4 && videoUrlList.length >= 4) {
      handleFullScreen(videoUrlList.slice(-4))
    } else {
      handleFullScreen(videoUrlList)
    }
    setCurrentIndex(idx);
  }

  const handleClose = (id) => () => {
    setPlayVideoList((origin) => {
      if (origin.length === 1) {
        return [{
          id: '',
          streamUrl: ''
        }]
      }
      return origin.filter(item => item.id !== id)
    })
  }

  const handleDoubleClick = (id: string) => () => {
    if (!id) return
    setCurrentIndex(1)
    handleFullScreen([id])
  }


  useEffect(() => {
    handleIndex(currentIndex)
  }, [videoUrlList])



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

  return (
    <div className={styles.h_warpper} >
      {/* 时间筛选操作栏 */}
      <div className={cx(styles.h_f)}>
        <div className={styles.h_t}>
          {/* <span>时间选择：</span>
          <RangePicker /> */}
        </div>
        <div className={styles.h_play_box}>
          <div className={styles.h_button_group}>
            {
              buttonList.map((item, i) => (
                <Button style={{ marginRight: 10 }}
                  className={currentIndex === item.id ? styles.active : ''}
                  key={item.id}
                  onClick={() => handleIndex(item.id)}
                  icon={item.icon}>
                </Button>
              ))
            }
          </div>
          {/* <Button icon={<ExpandOutlined />} style={{ marginRight: 10 }} onClick={() => setMaxView(true)}></Button> */}
        </div>
      </div>
      {/* 4 / 9 */}
      <div className={`${styles.videogrid_wrapper} ${maxView ? styles.fullscreen : null}`}>
        {
          <div
            style={{
              marginBottom: '8px',
            }}
            className={cx(styles.videogrid, {
              [styles.videogrid_9]: currentIndex === 9,
              [styles.videogrid_4]: currentIndex === 4,
            })}
            id="maxView">
            {
              Array.from({ length: currentIndex }).map((_, index) => {
                const item = playVideoList[index] || {
                  id: '',
                  streamUrl: ''
                };
                return (
                  <div className={styles.vgw_player_wrapper} key={item.id || index}>
                    <div style={{
                      border: '1px solid #e8e8e8',
                      color: 'red',
                      width: '100%',
                      aspectRatio: 'auto 16 / 9',
                      maxWidth: '100%',
                      height: '0px',
                      paddingTop: '56.25%',
                      position: 'relative',
                    }}
                      onDoubleClick={handleDoubleClick(item.id)}
                    >
                      {item.id &&
                        <img src={close} alt=''
                          className={cx(styles.close)}
                          onClick={handleClose(item.id)}
                          style={{
                            width: '20px',
                            display: 'none',
                            height: '20px',
                            position: 'absolute',
                            zIndex: 999,
                            top: '0px',
                            right: 0,
                          }}
                        />
                      }
                      <VideoPlay playerUrl={item.streamUrl} id={item.id} key={item.id} {...props}
                      />
                    </div>
                  </div>
                )
              })
            }
          </div>
        }
      </div>
    </div >
  )
}


export default RealTimeMonitorCom;


