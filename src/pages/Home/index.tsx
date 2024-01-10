
import React from 'react';

import styles from './index.less';

const Home: any = () => {

  return (
    <div className={styles.bg}>
      <div className={styles.content}>
        <div className={styles.content_l}>
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

          <div className={styles.floatBox}></div>

          <div className={styles.floatBox}></div>

        </div>
        <div className={styles.content_main}>

          <div className={styles.content_main_f}>
            <div className={styles.flexBox}>
              <img alt="" src='' />
              <span>园区概况</span>
            </div>

            <div className={styles.flexBox}>
              <img src="" alt="" />
              <span>历史监控</span>
            </div>

            <div className={styles.flexBox}>
              <img src="" alt="" />
              <span>实时监控</span>
            </div>

            <div className={styles.flexBox}>
              <img src="" alt="" />
              <span>安防检测</span>
            </div>
          </div>

        </div>

        <div className={styles.content_r}>
          <span className={styles.content_r_time}>统计截止时间：2023-9-20</span>

          <div className={styles.floatBox}></div>
          <div className={styles.floatBox}></div>

        </div>

      </div>

    </div>
  );
};

export default Home;
