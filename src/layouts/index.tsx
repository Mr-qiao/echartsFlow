import React, { useEffect, useMemo, useState } from 'react';

import MenuBar from '../components/MenuBar';
import { Outlet } from 'umi'
import { Select } from 'antd';
import city from 'province-city-china/dist/city.json';

import styles from './index.less'


// handle city json
city?.unshift({
  code: '-1', name: '全部',
  province: '99',
  city: '99'
})


const Layout = () => {
  return (
    <div className={styles.container}>
      {/* 头部导航 */}
      <header className={styles.header}>
        <h3 className={styles.title}>德力西电气监控视频汇聚平台</h3>
        <div className={styles.flexBox}>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="请搜索"
            defaultValue={city[0]?.code}
            filterOption={(input, option) => (option?.code ?? '').includes(input)}
            filterSort={(optionA, optionB) =>
              (optionA?.code ?? '').toLowerCase().localeCompare((optionB?.code ?? '').toLowerCase())
            }
            fieldNames={{
              label: 'name',
              value: 'code',
            }}
            options={city || []}
          />

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