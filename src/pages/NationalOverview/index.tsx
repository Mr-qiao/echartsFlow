/**
 * 全国概况
 */
import React, { useEffect, useRef } from 'react';
import ReactEcharts from 'echarts-for-react';
import ChartPanel from '@/components/ChartPanel'
import { Row, Col } from 'antd';
import { connect } from 'umi'


import { history } from '@umijs/max'
import Layouts from '@/components/layouts';

import { diverOption } from './config';


import styles from './index.less';
import { getParkListApi } from '@/services/system';


const nationalOverview = (props) => {

  const { searchCity, dispatch, } = props
  const mapRef = useRef(null);
  const locaRef = useRef(null);

  // init map
  const init = (data: any) => {
    // init map
    mapRef.current = new AMap.Map("chainMap", {
      zoom: 5,
      resizeEnable: true,
      center: [120.19, 30.26], // 杭州 余杭
      viewMode: '3D',//使用3D视图
      skyColor: '#00163e',
      mapStyle: 'amap://styles/blue'
    });

    // 全国
    locaRef.current = new Loca.Container({
      map: mapRef.current,
    })

    // 呼吸
    let top10 = {
      type: 'FeatureCollection',
      features: data.map((item: any) => {
        return {
          "type": "Feature",
          "properties": {
            "cityName": `${item.name}`,
            'deviceNum': `${item.deviceNum}`,
            'deviceOnlineNum': `${item.deviceOnlineNum}`,
            'id': `${item.id}`,
            "ratio": 0,
            "rank": 96
          },
          "geometry": {
            "type": "Point",
            "coordinates": [
              item.lng,
              item.lat
            ]
          }
        }
      }
      )
    };

    // 初始化呼吸图层，features数据一定要带个空数组，否则报错
    let breath = new Loca.ScatterLayer({
      zIndex: 121,
    });
    breath.setSource(new Loca.GeoJSONSource({
      data: top10,
    }));
    breath.setStyle({
      unit: 'px',
      size: [50, 50],
      texture: 'https://a.amap.com/Loca/static/loca-v2/demos/images/breath_red.png',
      animate: true,
      duration: 1000,
    });

    mapRef.current.on('click', function (e) {
      const feat = breath.queryFeature(e.pixel.toArray())
      if (feat) {
        if (feat.properties.id !== '-1') {
          history.push('/parkOverview');
        }
        dispatch({
          type: 'searchCity/onChangeShowAll',
          payload: {
            showAll: feat.properties.id === '-1'
          }
        })
        dispatch({
          type: 'searchCity/onChangeCityCode',
          payload: {
            cityCode: feat.properties.id
          }
        })
      }
    })
    let infoWindow;
    mapRef.current.on('mousemove', function (e) {
      const feat = breath.queryFeature(e.pixel.toArray())
      infoWindow = new AMap.InfoWindow({
        content: `<div>
          <p>名称：${feat?.properties?.cityName}
          </p>

          <p>设备数量：${feat?.properties?.deviceNum}
          </p>

          <p>在线数量：${feat?.properties?.deviceOnlineNum}
          </p>
          </div>`,
      })
      if (feat) {
        infoWindow.open(mapRef.current, feat.coordinates)
      } else {
        infoWindow.close()
      }
    })

    locaRef.current.add(breath);
    locaRef.current.animate.start();
  }

  const getParkList = async () => {
    const res = await getParkListApi();
    init(res.data);
    dispatch({
      type: 'searchCity/onChangeCityCode',
      payload: {
        cityCode: '-1'
      }
    })
  }

  useEffect(() => {
    try {
      getParkList()
    } catch (e) { console.log(e) }
    return () => {
      mapRef.current?.destroy();
    };
  }, []);

  return (
    <Layouts>
      <div className={styles.park_main}>
        {/* left */}
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
          <Col span={12}>
            <ChartPanel style={{ padding: 0 }} className={styles.mapChart}>
              <div id="chainMap" style={{ width: '100%', height: '66vh' }} />
            </ChartPanel>
          </Col>

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
    </Layouts>
  );
};

export default connect(({ searchCity, }: any) => ({
  searchCity
}))(nationalOverview);
