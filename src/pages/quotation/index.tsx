import {ProTable} from "@ant-design/pro-components";
import {Button} from "antd";
import {useRef, useState} from "react";
import {TFunction} from "@sinclair/typebox";
import GoodsTableCol from "@/components/goodsTableCol";
import {history} from "umi";


function Quotation() {
	const [activeKey, setActiveKey] = useState('1')
	const actionRef = useRef() as any
	const columns: any = [
		{
			title: '商品ID',
			dataIndex: 'index',
		},
		{
			title: '商品信息',
			dataIndex: 'xx',
			width: 400,
			render: (_: any, recode: any) => {
				console.log(recode, 'recode')
				return (
					<GoodsTableCol/>
				)
			}
		},
		{
			title: '询价用途',
			dataIndex: 'gys',
		},
		{
			title: '报价类型',
			dataIndex: 'gysbm',
			valueEnum: {
				1: '成品报价',
				2: 'boom报价'
			},
		},
		{
			title: '预计采购量',
			dataIndex: 'yjcgl',
		},
		{
			title: '报价截止日期',
			dataIndex: 'time',
			valueType: 'dateTime',
		},
		{
			title: '报价状态',
			dataIndex: 'bjzt',
			valueEnum: {
				1: '待报价',
				2: '已报价',
				3: '已采用'
			},
		},
		{
			title: '操作',
			search: false,
			align: 'center',
			fixed: 'right',
			width: 100,
			render: (_: any, recode: any) => {
				return (
					<a onClick={() => {
						if (recode.id === 2) {
							history.push('/quotation/editBoom')
							return
						}
						history.push('/quotation/edit')
					}
					}>填写报价</a>
				)
			}
		},
	]
	return (
		<ProTable
			columns={columns}
			scroll={{
				x: 1440
			}}
			rowKey={'index'}
			search={{
				labelWidth: 120
			}}
			actionRef={actionRef}
			request={async (
				// 第一个参数 params 查询表单和 params 参数的结合
				// 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
				params,
				sort,
				filter,
			) => {
				console.log(activeKey, params, 'ac')
				return {
					data: [
						{
							index: 1,
							id: 2,
							xpmc: '六味地黄丸',
							splm: '药',
							sppp: '六位',
							ys: '黑色',
							cm: 'xxl'
						},
						{
							index: 2,
							xpmc: '六味地黄丸',
							splm: '药',
							sppp: '六位',
							ys: '黑色',
							cm: 'xxl'
						}
						,
						{
							index: 3,
							xpmc: '六味地黄丸',
							splm: '药',
							sppp: '六位',
							ys: '黑色',
							cm: 'xxl'
						}
						,
						{
							index: 4,
							xpmc: '六味地黄丸',
							splm: '药',
							sppp: '六位',
							ys: '黑色',
							cm: 'xxl'
						}
					]
				}

			}}
			defaultSize={'small'}
			form={{
				size: 'small'
			}}
			toolbar={{
				menu: {
					type: 'tab',
					activeKey: activeKey,
					items: [
						{
							key: '1',
							label: <span>全部</span>,
						},
						{
							key: '2',
							label: <span>待报价</span>,
						},
						{
							key: '3',
							label: <span>已报价</span>,
						},
						{
							key: '4',
							label: <span>已采用</span>,
						},
						{
							key: '5',
							label: <span>未采用</span>,
						},
					],
					onChange: (key: string) => {
						console.log(key, actionRef, 'key')
						setActiveKey(key as string);
						actionRef.current.reload()
					},
				},
			} as any}
			headerTitle={
				<Button
					key="1"
					type="primary"
					onClick={() => {
						alert('add');
					}}
				>
					创建供应商款式信息
				</Button>
			}
		>
		</ProTable>
	)
}

export default Quotation