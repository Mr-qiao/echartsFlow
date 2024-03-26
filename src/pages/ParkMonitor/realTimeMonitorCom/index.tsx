/**
 * 实时监控
 */

import React, { useState, useEffect, useRef, RefObject } from 'react';
import { Button } from 'antd';

import recordScreen from '@/assets/img/recordScreen.png'
import screenshot from '@/assets/img/screenshot.png'
import close from '@/assets/img/close.png'

import { ExpandOutlined, AppstoreOutlined, TableOutlined, BorderOutlined } from '@ant-design/icons';
import { cx } from '@emotion/css';

import styles from '../index.less';
import { VideoPlay } from '../videoPlay';
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
}
const RealTimeMonitorCom = (props: Props) => {
  const { videoUrlList } = props;

  const [currentIndex, setCurrentIndex] = useState(1)
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
    const arr = []
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
  let recorder

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

  const handleStart = () => {
    navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: true
    }).then(stream => {
      recorder = new MediaRecorder(stream);
      let data = [];
      recorder.ondataavailable = (e) => {
        data.push(e.data as never)
      }
      recorder.onstop = () => {
        stream.getTracks().forEach(track => track.stop());
        let blob = new Blob(data, { type: 'video/mp4' });
        let link = document.createElement('a');
        link.href = URL.createObjectURL(blob); //创建下载的链接
        link.download = new Date().getTime() + '.mp4'; //下载后文件名
        document.body.appendChild(link);
        link.click()
        URL.revokeObjectURL(link.href); // 释放通过URL.createObjectURL()创建的URL
        link.remove()
      }
      recorder.start();
    }).catch(err => {
      console.log(err)
    })
  }

  const handleStop = () => {
    recorder.stop();
  }

  const handleRecord = (id: string) => () => {
    let video = document.getElementById(`video_render_${id}`) as any;
    const canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    let url = '';
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    console.log(ctx, video.width)
    ctx.drawImage(video, 0, 0);
    url = canvas.toDataURL('image/jpg');
    const a = document.createElement('a');
    const event = new MouseEvent('click');
    a.download = 'screen_shot';
    a.href = url;
    a.dispatchEvent(event);
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
                  className={currentIndex === item.id ? styles.active : null}
                  key={item.id}
                  onClick={() => handleIndex(item.id)}
                  icon={item.icon}>
                </Button>
              ))
            }
          </div>
          <Button icon={<ExpandOutlined />} style={{ marginRight: 10 }} onClick={() => setMaxView(true)}></Button>
          {/* <Button style={{ marginRight: 10 }} > 录屏</Button>
          <Button onClick={handleStop}>停止录屏</Button> */}
        </div>
      </div>
      {/* 4 / 9 */}
      <div className={`${styles.videogrid_wrapper} ${maxView ? styles.fullscreen : null}`}>
        {
          <div
            className={cx(styles.videogrid, {
              [styles.videogrid_9]: currentIndex === 9,
              [styles.videogrid_4]: currentIndex === 4,
            })}
            id="maxView">
            {
              playVideoList.map(item => {
                return (
                  <div className={styles.vgw_player_wrapper} key={item.id}>
                    <div style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.87)',
                      color: 'red',
                      width: '100%',
                      aspectRatio: 'auto 16 / 9',
                      maxWidth: '100%',
                      height: '0px',
                      paddingTop: '56.25%',
                      position: 'relative',
                    }}>
                      <img src={close} alt=''
                        onClick={handleClose(item.id)}
                        style={{
                          width: '30px',
                          height: '30px',
                          position: 'absolute',
                          // background: '#000',
                          zIndex: 999,
                          top: '0px',
                          right: 0,
                        }}
                      />
                      <VideoPlay playerUrl={item.streamUrl} id={item.id} key={item.id}
                      />
                      <div
                        style={{
                          width: '100%',
                          height: '30px',
                          position: 'absolute',
                          // background: '#000',
                          zIndex: 999,
                          bottom: '14px',
                          left: 0,
                        }}
                      >
                        {currentIndex === 1 &&
                          <div style={{
                            display: 'flex'
                          }}>
                            <img
                              style={{
                                width: '30px',
                                height: '30px',
                                marginRight: '10px'
                              }}
                              onClick={handleStart}
                              src={recordScreen} alt="" />
                            <div
                              onClick={handleRecord(item.id)}
                              style={{
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                background: '#fff'
                              }}>
                              <img src={screenshot}
                                style={{
                                  width: '20px',
                                  height: '20px',
                                }}
                                alt='' />
                            </div>
                          </div>
                        }
                      </div>
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


