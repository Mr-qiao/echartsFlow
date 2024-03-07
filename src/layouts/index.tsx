import React from 'react';

import MenuBar from '../components/MenuBar';
import { Outlet, connect } from 'umi'
import { Select } from 'antd';
import city from 'province-city-china/dist/city.json';
import { DEFAULT_NAME } from '@/constants';

import styles from './index.less'


// handle city json
city?.unshift({
  code: '-1', name: '全国',
  province: '99',
  city: '99'
})



const Layout: React.FC<any> = (props) => {

  const { dispatch, children } = props;


  const onChangeCity = (e) => {
    dispatch({
      type: 'searchCity/onChangeCityCode',
      payload: {
        cityCode: e
      }
    })
  }

  return (
    <div className={styles.container}>
      {/* 头部导航 */}
      <header className={styles.header}>
        <h3 className={styles.title}>{DEFAULT_NAME}</h3>
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
            onChange={onChangeCity}
            options={city || []}
          />

          {/* <span className={styles.h_t}>统计截止时间：{new Date().toLocaleDateString()}</span> */}
        </div>
      </header>

      {/* <Outlet /> */}
      {children}

      {/* 路由导航 */}
      <MenuBar />
    </div>
  )
}



export default connect(({ searchCity }: any) => ({
  searchCity
}))(Layout);