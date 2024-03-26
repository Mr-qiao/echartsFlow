/**
 * 园区概况
 */
import React, { useEffect, useRef, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import ChartPanel from '@/components/ChartPanel'
import { Row, Col, Tooltip } from 'antd';

import Layouts from '@/components/layouts';

import styles from './index.less';

import { getDeviceListApi, getParkListApi } from '@/services/system';
import { connect } from '@umijs/max';
import { EnvironmentOutlined } from '@ant-design/icons';


// 车辆信息
let diverOption = {
  tooltip: {
    trigger: 'item',
  },
  legend: {
    orient: 'vertical',
    right: 60,
    top: 'center',
    data: ['进出总车辆', '外来车辆'],
    formatter: function (name) {
      return name + ' ' + ' ' + 20;
    },
    itemStyle: {
      opacity: 0,
    },
    textStyle: {
      color: '#fff',
    },
  },
  series: [
    {
      name: '车辆信息',
      type: 'pie',
      radius: '50%',
      right: 180,
      data: [
        { value: 1048, name: '进出总车辆' },
        { value: 735, name: '外来车辆' },
      ],
      label: {
        show: false,
      },
    },
  ],
};

const parkOverview = (props) => {
  const { searchCity, dispatch } = props;
  const [imgUrl, setImgUrl] = useState('')
  const [translateList, setTranslateList] = useState([])

  const getParkList = async () => {
    const res = await getParkListApi();
    const url = res.data.find((item: any) => item.id === searchCity.cityCode)?.imageUrl
    getDeviceListApi(searchCity.cityCode).then((res) => {
      try {
        setTranslateList(res.data)
      } catch { }
    })

    setImgUrl(`http://121.40.237.64:16816${url}`)
    if (searchCity.cityCode === '-1') {
      dispatch({
        type: 'searchCity/onChangeCityCode',
        payload: {
          cityCode: res.data[0].id
        }
      })
    }
  }

  useEffect(() => {
    try {
      getParkList()
    } catch (e) { console.log(e) }
  }, [imgUrl, searchCity.cityCode]);


  return (
    <Layouts>
      <div className={styles.park_main}>
        {/* left */}
        {/* <div className={styles.m_l_2}> */}
        <Row gutter={10}>
          <Col span={6}>
            <ChartPanel title='总体事件' style={{ height: '25vh' }}>

              <ul className={styles.list}>
                <li>
                  <span className={styles.tit}>
                    <i>30</i>项
                  </span>
                  <span>安全生产</span>
                  <div>
                    <span>已处理</span>
                    <span>20</span>
                  </div>
                  <div>
                    <span>待处理</span>
                    <span>20</span>
                  </div>
                  <div>
                    <span>处理中</span>
                    <span>20</span>
                  </div>
                </li>
                <li>
                  <span className={styles.tit}>
                    <i>30</i>项
                  </span>
                  <span>火灾预警</span>
                  <div>
                    <span>已处理</span>
                    <span>20</span>
                  </div>
                  <div>
                    <span>待处理</span>
                    <span>20</span>
                  </div>
                  <div>
                    <span>处理中</span>
                    <span>20</span>
                  </div>
                </li>
                <li>
                  <span className={styles.tit}>
                    <i>30</i>项
                  </span>
                  <span>违章停靠</span>
                  <div>
                    <span>已处理</span>
                    <span>20</span>
                  </div>
                  <div>
                    <span>待处理</span>
                    <span>20</span>
                  </div>
                  <div>
                    <span>处理中</span>
                    <span>20</span>
                  </div>
                </li>
              </ul>

            </ChartPanel>
            <ChartPanel title='车辆信息' style={{ marginTop: '1vh', height: '60vh' }}>
              <div className={styles.diverPie}>
                <ReactEcharts option={diverOption} />
              </div>
            </ChartPanel>
          </Col>

          {/* 中间内容 */}
          {imgUrl &&
            <Col span={12}>
              <ChartPanel style={{
                position: 'relative',
                padding: 0,
              }}>
                <img src={imgUrl} alt="" style={{
                  width: '100%'
                }} />
                {
                  translateList.map(item => {
                    return <Tooltip key={item.id} placement="topLeft" title={item.name}>
                      <EnvironmentOutlined style={{
                        position: 'absolute',
                        zIndex: 999,
                        left: `${item.lng}px`,
                        top: `${item.lat}px`,
                      }} />
                    </Tooltip>
                  })
                }
              </ChartPanel>
            </Col>
          }
          {/* right */}

          <Col span={6}>
            <ChartPanel title='摄像头' style={{ height: '25vh' }}>
              <div className={styles.countdown}>
                安全运营 <i>24</i> 天
              </div>

              <div className={styles.moonData}>
                <div>
                  <span className={styles.moonData_tit}>总量</span>
                  <span className={styles.nums}>2000</span>
                </div>
                <div>
                  <span className={styles.moonData_tit}>异常数据</span>
                  <span className={styles.nums}>398</span>
                </div>
              </div>
            </ChartPanel>


            <ChartPanel title='违规上报列表' style={{ marginTop: '1vh', height: '60vh' }}>

              <div className={styles.table_box}>
                <table className={styles.t_table}>
                  <thead>
                    <tr>
                      <th>违规类型</th>
                      <th>上报时间</th>
                      <th>报进人</th>
                      <th>处理状态</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>火灾预警</td>
                      <td>09-21 19:30</td>
                      <td>王大锤</td>
                      <td>待处理</td>
                    </tr>
                    <tr>
                      <td>火灾预警</td>
                      <td>09-21 19:30</td>
                      <td>王大锤</td>
                      <td>待处理</td>
                    </tr>
                    <tr>
                      <td>火灾预警</td>
                      <td>09-21 19:30</td>
                      <td>王大锤</td>
                      <td>待处理</td>
                    </tr>
                    <tr>
                      <td>火灾预警</td>
                      <td>09-21 19:30</td>
                      <td>王大锤</td>
                      <td>待处理</td>
                    </tr>
                    <tr>
                      <td>火灾预警</td>
                      <td>09-21 19:30</td>
                      <td>王大锤</td>
                      <td>待处理</td>
                    </tr>
                    <tr>
                      <td>火灾预警</td>
                      <td>09-21 19:30</td>
                      <td>王大锤</td>
                      <td>待处理</td>
                    </tr>
                    <tr>
                      <td>火灾预警</td>
                      <td>09-21 19:30</td>
                      <td>王大锤</td>
                      <td>待处理</td>
                    </tr>
                    <tr>
                      <td>火灾预警</td>
                      <td>09-21 19:30</td>
                      <td>王大锤</td>
                      <td>待处理</td>
                    </tr>
                    <tr>
                      <td>火灾预警</td>
                      <td>09-21 19:30</td>
                      <td>王大锤</td>
                      <td>待处理</td>
                    </tr>
                    <tr>
                      <td>火灾预警</td>
                      <td>09-21 19:30</td>
                      <td>王大锤</td>
                      <td>待处理</td>
                    </tr>
                    <tr>
                      <td>火灾预警</td>
                      <td>09-21 19:30</td>
                      <td>王大锤</td>
                      <td>待处理</td>
                    </tr>
                    <tr>
                      <td>火灾预警</td>
                      <td>09-21 19:30</td>
                      <td>王大锤</td>
                      <td>待处理</td>
                    </tr>
                    <tr>
                      <td>火灾预警</td>
                      <td>09-21 19:30</td>
                      <td>王大锤</td>
                      <td>待处理</td>
                    </tr>
                    <tr>
                      <td>火灾预警</td>
                      <td>09-21 19:30</td>
                      <td>王大锤</td>
                      <td>待处理</td>
                    </tr>
                    <tr>
                      <td>火灾预警</td>
                      <td>09-21 19:30</td>
                      <td>王大锤</td>
                      <td>待处理</td>
                    </tr>
                    <tr>
                      <td>火灾预警</td>
                      <td>09-21 19:30</td>
                      <td>王大锤</td>
                      <td>待处理</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </ChartPanel>
          </Col>
        </Row>
      </div>
    </Layouts >
  );
};


export default connect(({ searchCity, }: any) => ({
  searchCity
}))(parkOverview);
