import React from 'react';

import MenuBar from '../components/MenuBar';

import styles from './index.less'

import { Outlet } from 'umi'



const Layout = ({ children }) => {


  return (
    <div className={styles.container}>
      {/* 头部导航 */}
      <header className={styles.header}>
        <h3 className={styles.title}>园区监控系统</h3>
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

      <Outlet />

      {/* 路由导航 */}
      <MenuBar />

    </div>
  )
}



export default Layout;