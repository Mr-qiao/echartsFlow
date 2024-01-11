
import React, { useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import Park from './Park';
import Security from './Security';

import styles from './index.less';








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

      {
        '1' === type ? (
          <Park />
        ) : <Security />
      }

      {/* footer */}
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
  );
};

export default Home;
