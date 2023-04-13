import TabList from '@/pages/Orders1/tabList';
import { Tabs } from 'antd';
import { useState } from 'react';

function OrderManagement() {
  const [tabKey, setTabKey] = useState('1') as any;
  const [countNumber, setCountNumber] = useState({}) as any;
  // useEffect(() => {
  // 	statistics({}, {}).then((res: any) => {
  // 		console.log(res, 'res')
  // 		setCountNumber(res.entry)
  // 	})
  // }, [])
  const items: any = [
    {
      key: '1',
      label: `待发货`,
      children: tabKey === '1' && <TabList tabKey={tabKey} />,
    },
    {
      key: '2',
      label: `已发货`,
      children: tabKey === '2' && <TabList tabKey={tabKey} />,
    },
    {
      key: '3',
      label: `全部`,
      children: tabKey === '3' && <TabList tabKey={tabKey} />,
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
        size={'large'}
        tabBarGutter={30}
        tabBarStyle={{ padding: '0 20px' }}
        defaultActiveKey={tabKey}
        onChange={onChange}
        items={items}
      />
      {/*</ProCard>*/}
    </div>
  );
}

export default OrderManagement;
