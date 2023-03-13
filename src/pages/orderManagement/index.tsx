import { Tabs } from 'antd';
import { ProCard } from '@ant-design/pro-components';
import TabList from '@/pages/orderManagement/tabList';
import { useState } from 'react';

function OrderManagement() {
  const [tabKey, setTabKey] = useState('1');
  const items: any = [
    {
      key: '1',
      label: `待发货`,
      children: tabKey === '1' && <TabList />,
    },
    {
      key: '2',
      label: `已发货`,
      children: tabKey === '2' && <TabList />,
    },
    {
      key: '3',
      label: `全部`,
      children: tabKey === '3' && <TabList />,
    },
  ];
  const onChange = (key: string) => {
    setTabKey(key);
  };
  return (
    <div>
      {/*<ProCard>*/}
      <Tabs
        type="card"
        size={'large'}
        defaultActiveKey={tabKey}
        onChange={onChange}
        items={items}
      />
      {/*</ProCard>*/}
    </div>
  );
}

export default OrderManagement;
