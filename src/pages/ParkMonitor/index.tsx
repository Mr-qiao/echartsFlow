/**
 * 园区监控
 */
import React, { useState } from 'react';
import { Tabs, Col, Row } from 'antd';
import ChartPanel from '@/components/ChartPanel'

import HistoryMonitorCom from './historyMonitorCom';
import RealTimeMonitorCom from './realTimeMonitorCom';

import SliderSearch from './sliderSearch';
import Layouts from '@/components/layouts'

import styles from './index.less';
import { deviceStreamApi } from '@/services/system';

const parkMonitor = () => {

  const [videoUrl, setVideoUrl] = useState<string[]>([])
  const [rightList, setRightList] = useState<{
    name: string
    url: string
  }[]>([])

  const handleSetVideoUrl = (url: string[]) => {
    setVideoUrl(url)
  }

  const handleSetRightList = (obj: {
    name: string
  }) => {
    const list = [...rightList]
    setRightList(list.concat([obj]))
  }

  return (
    <Layouts time={false}>
      <div className={styles.nationalOverviewContainer}>
        <Row gutter={10}>
          <Col span={6}>
            <SliderSearch setDeviceId={handleSetVideoUrl} />
          </Col>
          {/* 中间 */}
          <Col span={12}>
            <ChartPanel>
              {/* tab切换 */}
              <Tabs defaultActiveKey="1" items={[
                {
                  key: '1',
                  label: '实时监控',
                  children: <RealTimeMonitorCom videoUrlList={videoUrl} rightList={rightList} setRightList={handleSetRightList} />,
                },
                {
                  key: '2',
                  label: '历史监控',
                  children: <HistoryMonitorCom />,
                },

              ]} className={styles.h_tabs} tabBarStyle={{ backgroundColor: '#0C0031' }} />
            </ChartPanel>
          </Col>

          {/* 右边 */}
          <Col span={6}>
            <ChartPanel title='视频截图' style={{ height: '80vh' }}>
              <div className={styles.rightList} style={{
                height: '70vh', overflow: 'auto',
              }}>
                {
                  rightList.map((item, index) => {
                    return <div key={index} className={styles.rightItem} style={{
                      marginBottom: '10px'
                    }}>
                      <img src={item.url} width={50} height={50} style={{
                        marginRight: '10px'
                      }} />
                      <span>{item.name}</span>
                    </div>
                  })
                }
              </div>
            </ChartPanel>
          </Col>
        </Row>
      </div>
    </Layouts>
  )
}

export default parkMonitor
