import {Tabs} from 'antd';
import {ProCard} from '@ant-design/pro-components';
import TabList from '@/pages/orderManagement/tabList';
import {useEffect, useState} from 'react';
import {statistics} from "@/pages/orderManagement/apis";

function OrderManagement() {
	const [tabKey, setTabKey] = useState('1') as any;
	const [countNumber, setCountNumber] = useState({}) as any;
	useEffect(() => {
		statistics({}, {}).then((res: any) => {
			console.log(res, 'res')
			setCountNumber(res.entry)
		})
	}, [])
	const items: any = [
		{
			key: '1',
			label: `待发货(${countNumber?.noSendCount||0})`,
			children: tabKey === '1' && <TabList tabKey={tabKey}/>,
		},
		{
			key: '2',
			label: `已发货(${countNumber?.sendCount||0})`,
			children: tabKey === '2' && <TabList tabKey={tabKey}/>,
		},
		{
			key: '3',
			label: `全部(${countNumber?.count||0})`,
			children: tabKey === '3' && <TabList tabKey={tabKey}/>,
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
				defaultActiveKey={tabKey}
				onChange={onChange}
				items={items}
			/>
			{/*</ProCard>*/}
		</div>
	);
}

export default OrderManagement;
