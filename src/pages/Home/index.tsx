
import React, { useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import styles from './index.less';


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


// 车辆信息
let diverOption = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    right: 60,
    top: 'center',
    data: ['进出总车辆', '外来车辆'],
    formatter: function (name) {
      return name + ' ' + ' ' + 20
    },
    itemStyle: {
      opacity: 0,

    },
    textStyle: {
      color: '#fff'
    }
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
        show: false
      }
    }
  ]
};

const Home: any = () => {


  const [type, setType] = useState('1')

  const handleHistory = (type: string) => {
    setType(type);
  }

  return (
    <div className={styles.container}>

      <div className={styles.top_tit}>
        <select className={styles.year_chose}>
          <option> 北京市</option>
          <option>自贡市</option>
          <option>攀枝花市</option>
          <option>泸州市</option>
          <option>德阳市</option>
          <option>绵阳市</option>
          <option>广元市</option>
          <option>遂宁市</option>
          <option>内江市</option>
          <option>乐山市</option>
          <option>南充市</option>
          <option>宜宾市</option>
          <option>广安市</option>
          <option>达州市</option>
          <option>巴中市</option>
          <option>雅安市</option>
          <option>眉山市</option>
          <option>资阳市</option>
          <option>阿坝州</option>
          <option>甘孜州</option>
          <option>凉山州</option>
        </select>

        <span className={styles.content_r_time}>统计截止时间：2023-9-20</span>
      </div>

      <div className={styles.main}>

        {
          type === '1' ? (
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
          ) : <div className={styles.m_l_2}>
            <div className={styles.card}>

              <div className={styles.c_t_head}>
                <span className={styles.tit}>
                  总体事件
                </span>
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
                <span className={styles.tit}>
                  月台数据
                </span>

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
                <span className={styles.tit}>
                  车辆信息
                </span>

                <span className={styles.show}>查看》</span>
              </div>


              <div className={styles.diverPie}>
                <ReactEcharts option={diverOption} style={{ height: 100 }} />
              </div>

            </div>
          </div>
        }


        {
          type === '1' ? (
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
          ) : <div className={styles.m_r_2}>

            <div className={styles.countdown}>
              安全运营 <i>24</i> 天
            </div>

            <div className={styles.card}>
              <div className={styles.c_t_head}>
                <span className={styles.tit}>
                  摄像头
                </span>
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
                <span className={styles.tit}>
                  违规上报列表
                </span>
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
        }

        <div className={styles.main_middle}>
          <div className={styles.m_m_f}>
            <div className={styles.flexBox} onClick={() => handleHistory('1')}>
              <img alt="" src="" />
              <span>园区概况</span>
            </div>

            <div className={styles.flexBox} onClick={() => handleHistory('2')}>
              <img src="" alt="" />
              <span>历史监控</span>
            </div>

            <div className={styles.flexBox} onClick={() => handleHistory('3')}>
              <img src="" alt="" />
              <span>实时监控</span>
            </div>

            <div className={styles.flexBox} onClick={() => handleHistory('4')}>
              <img src="" alt="" />
              <span>安防检测</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
