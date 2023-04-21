import TabList from '@/pages/Orders/SalesOrder';
import { Tabs } from 'antd';
import { useState } from 'react';

function OrderManagement() {
  const [tabKey, setTabKey] = useState('1') as any;
  // const [countNumber, setCountNumber] = useState({}) as any;
  // useEffect(() => {
  // 	statistics({}, {}).then((res: any) => {
  // 		console.log(res, 'res')
  // 		setCountNumber(res.entry)
  // 	})
  // }, [])
  const items: any = [
    // {
    //   key: '1',
    //   label: `待发货`,
    //   children: tabKey === '1' && <TabList tabKey={tabKey} />,
    // },
    {
      key: '1',
      label: `发货中`,
      children: tabKey === '1' && <TabList tabKey={tabKey} />,
    },
    {
      key: '2',
      label: `已发货`,
      children: tabKey === '2' && <TabList tabKey={tabKey} />,
    },
    {
      key: '3',
      label: `异常`,
      children: tabKey === '2' && <TabList tabKey={tabKey} />,
    },
    {
      key: '4',
      label: `已取消`,
      children: tabKey === '2' && <TabList tabKey={tabKey} />,
    },
    {
      key: '5',
      label: `全部`,
      children: tabKey === '3' && <TabList tabKey={tabKey} />,
    },
  ];
  return (
    <div>
      {/*<ProCard>*/}
      <Tabs
        // type="card"
        size={'large'}
        tabBarGutter={30}
        tabBarStyle={{ padding: '0 20px' }}
        defaultActiveKey={tabKey}
        onChange={(key: string) => setTabKey(key)}
        items={items}
      />
      {/*</ProCard>*/}
    </div>
  );
}

export default OrderManagement;
