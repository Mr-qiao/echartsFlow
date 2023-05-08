/**
 * 公共tabs
 */

import { Tabs } from 'antd';
import React from 'react';

import { TabList } from '@/constants/type';

interface propsType {
  defaultActiveKey: string;
  onChange: (key: string) => void;
  tabList: TabList;
}

const TabPane: React.FC<propsType> = ({
  defaultActiveKey,
  onChange,
  tabList,
  ...rest
}) => {
  const renderLabel = (name: string, val: undefined | number) => {
    return val ? `${name}(${val || 0})` : `${name}`;
  };

  return (
    <Tabs
      defaultActiveKey={defaultActiveKey}
      tabBarStyle={{ paddingLeft: 20 }}
      onChange={onChange}
      {...rest}
    >
      {tabList.map((tab: any) => (
        <Tabs.TabPane tab={renderLabel(tab.label, tab.count)} key={tab.key} />
      ))}
    </Tabs>
  );
};

export default TabPane;
