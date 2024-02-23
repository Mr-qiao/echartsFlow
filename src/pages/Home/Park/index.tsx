/**
 * 安防检测
 */
import React, { useEffect, useRef } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';
import styles from './index.less';
import AMapLoader from "@amap/amap-jsapi-loader";
import Loca from 'Loca';
import AMap from 'AMap';
import events from 'events';

import { data, geoCoordMap } from './contants';

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



const Park = () => {

  const mapRef = useRef(null);
  const locaRef = useRef(null);
  const geoRef = useRef(null);

  const init = () => {
    // init map
    mapRef.current = new AMap.Map("map_e", {
      zoom: 5,
      resizeEnable: true,
      center: [120.19, 30.26], // 杭州 余杭
      skyColor: '#00163e',
      mapStyle: 'amap://styles/darkblue'
    });
    // init loac
    locaRef.current = new Loca.Container({
      map: mapRef.current
    })


    geoRef.current = new Loca.GeoJSONSource({
      // data: [],
      url: 'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/china_traffic_event.json',
    });

    var scatter = new Loca.ScatterLayer({
      // loca,
      zIndex: 10,
      opacity: 1,
      visible: true,
      zooms: [2, 22],
    });

    scatter.setSource(geoRef.current, {
      unit: 'px',
      size: [20, 20],
      texture: 'https://a.amap.com/Loca/static/loca-v2/demos/images/blue.png',
      borderWidth: 0,
    });
    locaRef.current.add(scatter);


    // 呼吸
    var top10 = {
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
    var breath = new Loca.ScatterLayer({
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

    var dat = new Loca.Dat();
    dat.addLayer(breath, '呼吸点');
    dat.addLayer(scatter, '蓝色气泡');


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
      <div className={styles.m_l_2}>
        <div className={styles.card}>
          <div className={styles.c_t_head}>
            <span className={styles.tit}>总体事件</span>
          </div>

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
        </div>

        <div className={styles.card}>
          <div className={styles.c_t_head}>
            <span className={styles.tit}>月台数据</span>

            <span className={styles.show}>查看》</span>
          </div>

          <div className={styles.moonData}>
            <div>
              <span className={styles.moonData_tit}>月台总量</span>
              <span className={styles.nums}>2000</span>
            </div>
            <div>
              <span className={styles.moonData_tit}>空余月台</span>
              <span className={styles.nums}>398</span>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.c_t_head}>
            <span className={styles.tit}>车辆信息</span>

            <span className={styles.show}>查看》</span>
          </div>

          <div className={styles.diverPie}>
            <ReactEcharts option={diverOption} style={{ height: 140 }} />
          </div>
        </div>
      </div>

      {/* 中间内容 */}
      <div id="map_e" className={styles.m_l_m} style={{ width: '70%', height: '450px' }} />

      {/* right */}
      <div className={styles.m_r_2}>
        <div className={styles.countdown}>
          安全运营 <i>24</i> 天
        </div>

        <div className={styles.card}>
          <div className={styles.c_t_head}>
            <span className={styles.tit}>摄像头</span>
            <span className={styles.show}>查看》</span>
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
        </div>

        <div className={styles.card}>
          <div className={styles.c_t_head}>
            <span className={styles.tit}>违规上报列表</span>
          </div>

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
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Park;
