/**
 * 园区监控
 */


import React from 'react';


import { Tabs, Col, Row } from 'antd';

import ChartPanel from '@/components/ChartPanel'


import HistoryMonitorCom from './historyMonitorCom';
import RealTimeMonitorCom from './realTimeMonitorCom';

import SliderSearch from './sliderSearch';
import Layouts from '@/layouts'

import styles from './index.less';





const parkMonitor = () => {

  return (
    <Layouts>
      <div className={styles.nationalOverviewContainer}>
        <Row gutter={10}>
          <Col span={6}>
            <SliderSearch />
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
              ]} className={styles.h_tabs} tabBarStyle={{ backgroundColor: '#0C0031' }} />
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
    </Layouts>
  )
}

export default parkMonitor
