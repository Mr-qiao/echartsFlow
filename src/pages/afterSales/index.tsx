import {ProTable} from "@ant-design/pro-components";
import {Button, Col, DatePicker, Form, Image, Modal, Row, Select} from "antd";
import GoodsTableCol from "@/components/goodsTableCol";
import {useState} from "react";
import BatchInput from "@/components/batchInput";

const {Option} = Select
const {RangePicker} = DatePicker;

function TabList() {
	const [timeSelect, setTimeSelect] = useState(1)
	const [modalOpen, setModalOpen] = useState(false)
	const nameArrSh = [
		{
			title: '姓名',
			key: '张三'
		}, {
			title: '手机号',
			key: '13888888888'
		}, {
			title: '地址',
			key: '浙江省杭州市萧山区盈丰街道博地中心C座 1401A'
		}
	]
	const nameArrfh = [
		{
			title: '快递',
			key: '张三'
		}, {
			title: '单号',
			key: '13888888888'
		}, {
			title: '时间',
			key: '浙江省杭州市萧山区盈丰街道博地中心C座 1401A'
		}
	]
	const columns: any = [
		{
			title: '订单编号',
			dataIndex: 'bh',
			hideInTable: true,
			renderFormItem: (item: any, _: any, form: any) => {
				return (
					<BatchInput/>
				)
			}
		},
		{
			title: 'SKU编码',
			dataIndex: 'Sku',
			hideInTable: true,
			renderFormItem: (item: any, _: any, form: any) => {
				return (
					<BatchInput/>
				)
			}
		},
		{
			title: '款式名称',
			dataIndex: 'ksmc',
			hideInTable: true,
		},
		{
			title: '商品ID',
			dataIndex: 'itemId',
			hideInTable: true,
			renderFormItem: (item: any, _: any, form: any) => {
				return (
					<BatchInput/>
				)
			}
		},
		{
			title: '售后单号',
			dataIndex: 'shdh',
			hideInTable: true,
			renderFormItem: (item: any, _: any, form: any) => {
				return (
					<BatchInput/>
				)
			}
		},
		{
			title: '商品信息',
			dataIndex: 'spxx',
			search: false,
			width: 300,
			render: (_: any, recode: any) => {
				return (
					<GoodsTableCol footerImg={false} nameArr={
						[
							{
								title: '商品ID',
								key: '六位地黄丸'
							}, {
							title: '款式名称',
							key: '药'
						}, {
							title: 'SKU编码',
							key: '六位'
						}, {
							title: '规格',
							key: '黑色'
						}
						]
					}/>
				)
			}
		},
		{
			title: <Select defaultValue={timeSelect} onChange={(e) => {
				setTimeSelect(e)
			}} style={{
				overflow: "hidden",
				textOverflow: "ellipsis",
				whiteSpace: "nowrap"
			}}>
				<Option value={1} key={1}>创建日期</Option>
				<Option value={2} key={2}>发货日期</Option>
			</Select>,
			dataIndex: 'rq',
			renderFormItem: () => {
				return (<RangePicker showTime/>)
			},
			formItemProps: {
				htmlFor: "",
			},
			hideInTable: true
		},
		{
			title: '售后类型',
			dataIndex: 'shlx',
			hideInTable: true,
			valueEnum:{
				1:'仅退款',
				2:'退货退款',
				3:'换货'
			}
		},
		{
			title: '订单信息',
			dataIndex: 'sl',
			search: false,
			render: (_: any, recode: any) => {
				return (
					<GoodsTableCol showImg={false} nameArr={
						[
							{
								title: '单号',
								key: '六位地黄丸'
							}, {
							title: '数量',
							key: '药'
						}, {
							title: '金额',
							key: '六位'
						}, {
							title: '时间',
							key: '黑色'
						}
						]
					}/>
				)
			}
		},
		{
			title: '售后信息',
			search: false,
			dataIndex: 'ddh',
			render: (_: any, recode: any) => {
				return (
					<GoodsTableCol showImg={false} nameArr={
						[
							{
								title: '单号',
								key: '六位地黄丸'
							},
							{
								title: '数量',
								key: '药'
							},
							{
								title: '金额',
								key: '六位'
							},
							{
								title: '时间',
								key: '黑色'
							},
							{
								title: '类型',
								key: '111'
							}
						]
					}/>
				)
			}
		},

		{
			title: '发货信息',
			dataIndex: 'fhxx',
			search: false,
			render: (_: any, recode: any) => {
				return (
					<GoodsTableCol showImg={false} nameArr={
						[
							{
								title: '快递',
								key: '六位地黄丸'
							},
							{
								title: '单号',
								key: '药'
							},
							{
								title: '时间',
								key: '六位'
							},
						]
					}/>
				)
			}
		},
		{
			title: '退货信息',
			dataIndex: 'shxx',
			search: false,
			render: (_: any, recode: any) => {
				return (
					<GoodsTableCol showImg={false} nameArr={
						[
							{
								title: '快递',
								key: '六位地黄丸'
							},
							{
								title: '单号',
								key: '药'
							},
							{
								title: '时间',
								key: '六位'
							},
						]
					}/>
				)
			}
		},
		{
			title: '操作',
			fixed: 'right',
			width: 60,
			search: false,
			render: (_: any, recode: any) => {
				return (
					<a>发货</a>
				)
			}
		},
	]
	const dcolumns: any = [
		{
			title: '导入文件名称',
			dataIndex: 'importName'
		},
		{
			title: '导入事件',
			dataIndex: 'importTime'
		},
		{
			title: '导入人',
			dataIndex: 'importPip'
		},
		{
			title: '导入任务状态',
			dataIndex: 'importType'
		},
		{
			title: '导入成功/失败数量',
			dataIndex: 'importName'
		},
		{
			title: '操作',
			dataIndex: 'importName',
			render: () => {
				return (
					<a>下载失败数据</a>
				)
			}
		},
	]
	return (
		<div>
			<ProTable
				columns={columns}
				defaultSize={'small'}
				scroll={{x: 1000}}
				request={async (params = {}, sort, filter) => {
					return {
						data: [
							{spxx: 1, key: 1}, {spxx: 2, key: 2}, {spxx: 3, key: 3}
						]
					}
				}}
				search={{
					labelWidth: 120
				}}
				form={{
					size: 'small'
				}}
				options={false}
				toolBarRender={() => [
					// <Button key="show">导入发货</Button>,
					// <Button key="out" onClick={() => {
					// 	setModalOpen(true)
					// }}>
					// 	导入记录
					// </Button>,
					<Button type="primary" key="primary">
						导出
					</Button>,
				]}
			/>
			<Modal
				width={800}
				open={modalOpen}
				title={'导入记录列表'}
				onOk={() => {
					setModalOpen(false)
				}}
				onCancel={() => {
					setModalOpen(false)
				}}
			>
				<ProTable
					dataSource={[{id: 1}, {id: 2}, {id: 3}]}

					size={'small'}
					search={false}
					options={false}
					columns={dcolumns}
				/>
			</Modal>
		</div>
	)
}


export default TabList