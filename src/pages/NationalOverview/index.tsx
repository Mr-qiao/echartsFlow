/**
 * 全国概况
 */
import React, { useEffect, useRef } from 'react';
import ReactEcharts from 'echarts-for-react';
import ChartPanel from '@/components/ChartPanel'
import { Row, Col } from 'antd';
import { connect } from 'umi'

import { diverOption } from './config';


import styles from './index.less';






const nationalOverview = (props) => {

  // 城市编码
  const { searchCity } = props;


  const mapRef = useRef(null);
  const locaRef = useRef(null);

  const init = () => {
    // init map
    mapRef.current = new AMap.Map("chainMap", {
      zoom: 4.5,
      resizeEnable: true,
      center: [120.19, 30.26], // 杭州 余杭
      viewMode: '3D',//使用3D视图
      skyColor: '#00163e',
      mapStyle: 'amap://styles/darkblue'
    });
    // init loac
    locaRef.current = new Loca.Container({
      map: mapRef.current,
    })



    // 呼吸
    let top10 = {
      type: 'FeatureCollection',
      features: [
        {
          "type": "Feature",
          "properties": {
            "cityName": "韶关市",
            "ratio": 0,
            "rank": 96
          },
          "geometry": {
            "type": "Point",
            "coordinates": [
              113.58052,
              24.760098
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "cityName": "乐山市",
            "ratio": 0,
            "rank": 97
          },
          "geometry": {
            "type": "Point",
            "coordinates": [
              103.75082,
              29.58099
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "cityName": "阜阳市",
            "ratio": 0,
            "rank": 98
          },
          "geometry": {
            "type": "Point",
            "coordinates": [
              115.82654,
              32.889915
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "cityName": "荆门市",
            "ratio": 0,
            "rank": 99
          },
          "geometry": {
            "type": "Point",
            "coordinates": [
              112.209816,
              30.997377
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "cityName": "哈尔滨市",
            "ratio": 0,
            "rank": 100
          },
          "geometry": {
            "type": "Point",
            "coordinates": [
              126.61314,
              45.746685
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "cityName": "达州市",
            "ratio": 0,
            "rank": 101
          },
          "geometry": {
            "type": "Point",
            "coordinates": [
              107.493,
              31.205515
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "cityName": "自贡市",
            "ratio": 0,
            "rank": 102
          },
          "geometry": {
            "type": "Point",
            "coordinates": [
              104.777824,
              29.34555
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "cityName": "陇南市",
            "ratio": 0,
            "rank": 103
          },
          "geometry": {
            "type": "Point",
            "coordinates": [
              104.93356,
              33.388184
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "cityName": "南充市",
            "ratio": 0,
            "rank": 104
          },
          "geometry": {
            "type": "Point",
            "coordinates": [
              106.1188,
              30.800997
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "cityName": "恩施土家族苗族自治州",
            "ratio": 0,
            "rank": 105
          },
          "geometry": {
            "type": "Point",
            "coordinates": [
              109.48512,
              30.298103
            ]
          }
        }
      ]
    };
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
    locaRef.current.add(breath);
    locaRef.current.animate.start();

    let dat = new Loca.Dat();
    dat.addLayer(breath, '呼吸点');
  }

  useEffect(() => {
    init();
    return () => {
      mapRef.current?.destroy();
    };
  }, []);


  return (
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
          {
            searchCity.cityCode === -1 ? (
              <ChartPanel style={{ padding: 0 }}>
                <div id="chainMap" style={{ width: '100%', height: '66vh' }} />
              </ChartPanel>
            ) : <div>园区处理</div>
          }
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
  );
};

export default connect(({ searchCity }: any) => ({
  searchCity
}))(nationalOverview);
