import { useState } from 'react';
import Footer from './Footer';


import Security from './Security';
import Park from './Park';

import styles from './index.less';


const Home: any = () => {
  const [type, setType] = useState('park');

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h3 className={styles.title}>{'park' === type ? '可视化数据大屏' : '园区监控系统'} </h3>
        <div className={styles.flexBox}>
          <select className={styles.h_c}>
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

          <span className={styles.h_t}>统计截止时间：2023-9-20</span>
        </div>
      </header>

      {'park' === type ? <Park /> : <Security />}

      {/* 底部导航 */}
      <Footer onClick={(key) => setType(key)} />
    </div>
  );
};

export default Home;
