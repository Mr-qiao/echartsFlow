import React from 'react';

import { history } from '@umijs/max'

import MenuBar from '../MenuBar';
import { connect } from 'umi'
import { DEFAULT_NAME } from '@/constants';

import AvatarName from '../AvatarName';


import styles from './index.less'
import SelectItem from '../SelectItem';
import { cx } from '@emotion/css';





const Layout: React.FC<any> = (props) => {

  const { dispatch, time = true, children, } = props;

  const onChangeCity = (city: string) => {
    if (city !== '-1') {
      history.push('/parkOverview');
    }
    dispatch({
      type: 'searchCity/onChangeShowAll',
      payload: {
        showAll: city === '-1'
      }
    })
    dispatch({
      type: 'searchCity/onChangeCityCode',
      payload: {
        cityCode: city
      }
    })
  }


  return (
    <div className={styles.container}>
      {/* 头部导航 */}
      <header className={styles.header}>
        <h3 className={styles.title}>{DEFAULT_NAME}</h3>
        <div className={cx(styles.flexBox, {
          [styles.time]: !time
        })}>
          {
            time &&
            <SelectItem cityCode={props.searchCity.cityCode} showAll={props.searchCity.showAll} onChange={onChangeCity} />
          }
          <AvatarName />
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