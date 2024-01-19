/**
 * 园区概况
 */

import React from 'react';
import ReactEcharts from 'echarts-for-react';
import styles from './index.less'

let option = {
  legend: [
    {
      show: false,
    },
  ],
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['0', '60%'],
      data: [
        { value: 2, name: '报警' },
        { value: 156, name: '正常' },
        { value: 145, name: '离线' },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
};


const Security = () => {
  return (
    <div className={styles.security_main}>
      <div className={styles.m_l_1}>
        <div className={styles.card}>
          <div className={styles.barsBox}>
            <span className={styles.tit}>火灾预警</span>
            <ReactEcharts
              option={option}
              style={{ width: 180, height: 140 }}
            />
          </div>
          <div className={styles.table_box}>
            <table className={styles.t_table}>
              <thead>
                <tr>
                  <th>区域</th>
                  <th>上报时间</th>
                  <th>跟进人</th>
                  <th>处理状态</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>A区</td>
                  <td>09-21 19:30</td>
                  <td>王大锤</td>
                  <td>待处理</td>
                  <td>详情</td>
                </tr>
                <tr>
                  <td>A区</td>
                  <td>09-21 19:30</td>
                  <td>王大锤</td>
                  <td>待处理</td>
                  <td>详情</td>
                </tr>
                <tr>
                  <td>A区</td>
                  <td>09-21 19:30</td>
                  <td>王大锤</td>
                  <td>待处理</td>
                  <td>详情</td>
                </tr>
                <tr>
                  <td>A区</td>
                  <td>09-21 19:30</td>
                  <td>王大锤</td>
                  <td>待处理</td>
                  <td>详情</td>
                </tr>
                <tr>
                  <td>A区</td>
                  <td>09-21 19:30</td>
                  <td>王大锤</td>
                  <td>待处理</td>
                  <td>详情</td>
                </tr>
                <tr>
                  <td>A区</td>
                  <td>09-21 19:30</td>
                  <td>王大锤</td>
                  <td>待处理</td>
                  <td>详情</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.barsBox}>
            <span className={styles.tit}>园区巡警</span>
            <ReactEcharts
              option={option}
              style={{ width: 180, height: 140 }}
            />
          </div>
          <div className={styles.table_box}>
            <table className={styles.t_table}>
              <thead>
                <tr>
                  <th>区域</th>
                  <th>上报时间</th>
                  <th>跟进人</th>
                  <th>处理状态</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>A区</td>
                  <td>09-21 19:30</td>
                  <td>王大锤</td>
                  <td>待处理</td>
                  <td>详情</td>
                </tr>
                <tr>
                  <td>A区</td>
                  <td>09-21 19:30</td>
                  <td>王大锤</td>
                  <td>待处理</td>
                  <td>详情</td>
                </tr>
                <tr>
                  <td>A区</td>
                  <td>09-21 19:30</td>
                  <td>王大锤</td>
                  <td>待处理</td>
                  <td>详情</td>
                </tr>
                <tr>
                  <td>A区</td>
                  <td>09-21 19:30</td>
                  <td>王大锤</td>
                  <td>待处理</td>
                  <td>详情</td>
                </tr>
                <tr>
                  <td>A区</td>
                  <td>09-21 19:30</td>
                  <td>王大锤</td>
                  <td>待处理</td>
                  <td>详情</td>
                </tr>
                <tr>
                  <td>A区</td>
                  <td>09-21 19:30</td>
                  <td>王大锤</td>
                  <td>待处理</td>
                  <td>详情</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className={styles.m_r_1}>
        <div className={styles.card}>
          <div className={styles.barsBox}>
            <span className={styles.tit}>安全生产</span>
            <ReactEcharts
              option={option}
              style={{ width: 180, height: 140 }}
            />
          </div>
          <div className={styles.table_box}>
            <table className={styles.t_table}>
              <thead>
                <tr>
                  <th>区域</th>
                  <th>上报时间</th>
                  <th>跟进人</th>
                  <th>处理状态</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>A区</td>
                  <td>09-21 19:30</td>
                  <td>王大锤</td>
                  <td>待处理</td>
                  <td>详情</td>
                </tr>
                <tr>
                  <td>A区</td>
                  <td>09-21 19:30</td>
                  <td>王大锤</td>
                  <td>待处理</td>
                  <td>详情</td>
                </tr>
                <tr>
                  <td>A区</td>
                  <td>09-21 19:30</td>
                  <td>王大锤</td>
                  <td>待处理</td>
                  <td>详情</td>
                </tr>
                <tr>
                  <td>A区</td>
                  <td>09-21 19:30</td>
                  <td>王大锤</td>
                  <td>待处理</td>
                  <td>详情</td>
                </tr>
                <tr>
                  <td>A区</td>
                  <td>09-21 19:30</td>
                  <td>王大锤</td>
                  <td>待处理</td>
                  <td>详情</td>
                </tr>
                <tr>
                  <td>A区</td>
                  <td>09-21 19:30</td>
                  <td>王大锤</td>
                  <td>待处理</td>
                  <td>详情</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.barsBox}>
            <span className={styles.tit}>事件总量</span>
            <ReactEcharts
              option={option}
              style={{ width: 180, height: 140 }}
            />
          </div>
          <div className={styles.table_box}>
            <table className={styles.t_table}>
              <thead>
                <tr>
                  <th>区域</th>
                  <th>上报时间</th>
                  <th>跟进人</th>
                  <th>处理状态</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>A区</td>
                  <td>09-21 19:30</td>
                  <td>王大锤</td>
                  <td>待处理</td>
                  <td>详情</td>
                </tr>
                <tr>
                  <td>A区</td>
                  <td>09-21 19:30</td>
                  <td>王大锤</td>
                  <td>待处理</td>
                  <td>详情</td>
                </tr>
                <tr>
                  <td>A区</td>
                  <td>09-21 19:30</td>
                  <td>王大锤</td>
                  <td>待处理</td>
                  <td>详情</td>
                </tr>
                <tr>
                  <td>A区</td>
                  <td>09-21 19:30</td>
                  <td>王大锤</td>
                  <td>待处理</td>
                  <td>详情</td>
                </tr>
                <tr>
                  <td>A区</td>
                  <td>09-21 19:30</td>
                  <td>王大锤</td>
                  <td>待处理</td>
                  <td>详情</td>
                </tr>
                <tr>
                  <td>A区</td>
                  <td>09-21 19:30</td>
                  <td>王大锤</td>
                  <td>待处理</td>
                  <td>详情</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Security;