import React from 'react';

import List from './List';

export enum AFTER_ORDER_REFUND_STATUS {
  // 收货售后待审核,其他状态
  COMNFIRM_WAIT_AUDIT = 'NEED_AUDIT',
  OTHER = 'ONLY_QUERY',
  ALL = '',
}

const GoodsInfo: React.FC = () => {
  return (
    <div>
      {/* <Tabs
        defaultActiveKey="1"
        items={items}
        activeKey={tabsId}
        onChange={onChange}
        tabBarGutter={40}
        tabBarStyle={{ marginBottom: 0, padding: '5px 20px 0' }}
        destroyInactiveTabPane={true}
      /> */}
      <List />
    </div>
  );
};
export default GoodsInfo;
