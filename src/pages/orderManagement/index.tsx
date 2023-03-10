import {Tabs} from "antd";
import {ProCard} from "@ant-design/pro-components";
import TabList from "@/pages/orderManagement/tabList";

function OrderManagement() {
	const items: any = [
		{
			key: '1',
			label: `待发货`,
			children: <TabList/>,
		},
		{
			key: '2',
			label: `已发货`,
			children: <TabList/>,
		},
		{
			key: '3',
			label: `全部`,
			children: <TabList/>,
		},
	];
	return (
		<div>
			{/*<ProCard>*/}
			<Tabs type="card" items={items}/>
			{/*</ProCard>*/}
		</div>
	)

}


export default OrderManagement