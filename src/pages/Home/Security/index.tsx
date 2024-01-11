/**
 * 安防检测
 */

import ReactEcharts from 'echarts-for-react';
import styles from './index.less';

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

const Security = () => {
  return (
    <div className={styles.security_main}>
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

export default Security;
