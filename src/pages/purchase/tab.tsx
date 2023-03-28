import { Tabs } from 'antd';
import { useState } from 'react';
import Purchase from '@/pages/purchase/index';

function TabList() {
  const [tabKey, setTabKey] = useState('2') as any;
  const items: any = [
    {
      key: '2',
      label: `待确认`,
      children: tabKey === '2' && <Purchase tabKey={tabKey} />,
    },
    {
      key: '3',
      label: `已确认`,
      children: tabKey === '3' && <Purchase tabKey={tabKey} />,
    },
    {
      key: '4',
      label: `已驳回`,
      children: tabKey === '4' && <Purchase tabKey={tabKey} />,
    },
    {
      key: '0',
      label: `全部`,
      children: tabKey === '0' && <Purchase tabKey={tabKey} />,
    },
  ];
  const onChange = (key: string) => {
    setTabKey(key);
  };
  return (
    <div>
      {/*<ProCard>*/}
      <Tabs
        // type="card"
        tabBarGutter={30}
        tabBarStyle={{padding:'0 20px'}}
        size={'large'}
        defaultActiveKey={tabKey}
        onChange={onChange}
        items={items}
      />
      {/*</ProCard>*/}
    </div>
  );
}

export default TabList;
