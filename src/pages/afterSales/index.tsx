import {ProTable} from '@ant-design/pro-components';
import {Button, Col, DatePicker, Form, Image, Modal, Row, Select} from 'antd';
import GoodsTableCol from '@/components/goodsTableCol';
import {useRef, useState} from 'react';
import BatchInput from '@/components/batchInput';
import {exprotList, queryList} from '@/pages/afterSales/apis';
import moment from 'moment/moment';
import {filterPageName} from "@/utils";

const {Option} = Select;
const {RangePicker} = DatePicker;

function AfterSales() {
	const [timeSelect, setTimeSelect] = useState(1);
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const ref: any = useRef();
	const columns: any = [
		{
			title: '订单编码',
			dataIndex: 'orderIds',
			hideInTable: true,
			renderFormItem: (item: any, _: any, form: any) => {
				return <BatchInput/>;
			},
		},
		{
			title: 'SKU编码',
			dataIndex: 'skuCodes',
			hideInTable: true,
			renderFormItem: (item: any, _: any, form: any) => {
				return <BatchInput/>;
			},
		},
		{
			title: '款式名称',
			dataIndex: 'ksName',
			hideInTable: true,
		},
		{
			title: '商品ID',
			dataIndex: 'itemIds',
			hideInTable: true,
			renderFormItem: (item: any, _: any, form: any) => {
				return <BatchInput/>;
			},
		},
		{
			title: '售后单号',
			dataIndex: 'refundId',
			hideInTable: true,
			renderFormItem: (item: any, _: any, form: any) => {
				return <BatchInput/>;
			},
		},
		{
			title: '商品信息',
			search: false,
			render: (_: any, recode: any) => {
				return (
					<GoodsTableCol
						footerImg={false}
						imgs={[{src:recode.imgUrl}]}
						nameArr={[
							{
								title: '商品ID',
								key: recode?.itemId4RE,
							},
							{
								title: '款式名称',
								key: recode?.itemName,
							},
							{
								title: 'SKU编码',
								key: recode?.skuCode4RE,
							},
							{
								title: '规格',
								key: recode?.skuSpec4OD,
							},
						]}
					/>
				);
			},
		},
		{
			title: (
				<Select
					defaultValue={timeSelect}
					onChange={(e) => {
						setTimeSelect(e);
					}}
					style={{
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						whiteSpace: 'nowrap',
						width:'140px'
					}}
				>
					<Option value={1} key={1}>
						创建日期
					</Option>
					<Option value={2} key={2}>
						发货日期
					</Option>
					<Option value={3} key={3}>
						售后申请时间
					</Option>
				</Select>
			),
			dataIndex: 'time',
			renderFormItem: () => {
				return <RangePicker showTime placeholder={['请选择开始时间','请选择结束时间']}/>;
			},
			formItemProps: {
				htmlFor: '',
			},
			hideInTable: true,
		},
		{
			title: '售后类型',
			dataIndex: 'refundType',
			hideInTable: true,
			valueEnum: {
				1: '仅退款',
				2: '退货退款',
				3: '换货',
			},
		},
		{
			title: '订单信息',
			search: false,
			render: (_: any, recode: any) => {
				return (
					<GoodsTableCol
						showImg={false}
						nameArr={[
							{
								title: '单号',
								key: recode.orderCode,
							},
							{
								title: '数量',
								key: recode.number4OD,
							},
							{
								title: '金额',
								key: recode.orderPrice4OD,
							},
							{
								title: '时间',
								key: moment(recode.orderTime).format('YYYY-MM-DD HH:mm:ss'),
							},
						]}
					/>
				);
			},
		},
		{
			title: '售后信息',
			search: false,
			dataIndex: 'ddh',
			render: (_: any, recode: any) => {
				return (
					<GoodsTableCol
						showImg={false}
						nameArr={[
							{
								title: '单号',
								key: recode.fundCode,
							},
							{
								title: '数量',
								key: recode.number4RE,
							},
							{
								title: '金额',
								key: recode.refundMoney4RE,
							},
							{
								title: '时间',
								key: moment(recode.refundTime).format('YYYY-MM-DD HH:mm:ss'),
							},
							{
								title: '类型',
								key: recode.refundType4REDs,
							},
						]}
					/>
				);
			},
		},

		{
			title: '发货信息',
			dataIndex: 'fhxx',
			search: false,
			render: (_: any, recode: any) => {
				return (
					<GoodsTableCol
						showImg={false}
						nameArr={[
							{
								title: '快递',
								key: recode.companyName4OD,
							},
							{
								title: '单号',
								key: recode.companyCode4OD,
							},
							{
								title: '时间',
								key: moment().format('YYYY-MM-DD HH:mm:ss'),
							},
						]}
					/>
				);
			},
		},
		{
			title: '退货信息',
			dataIndex: 'shxx',
			search: false,
			render: (_: any, recode: any) => {
				return (
					<GoodsTableCol
						showImg={false}
						nameArr={[
							{
								title: '快递',
								key: recode.companyName4RE,
							},
							{
								title: '单号',
								key: recode.companyCode4RE,
							},
							{
								title: '时间',
								key: moment().format('YYYY-MM-DD HH:mm:ss'),
							},
						]}
					/>
				);
			},
		},
	];
	const dcolumns: any = [
		{
			title: '导入文件名称',
			dataIndex: 'importName',
		},
		{
			title: '导入事件',
			dataIndex: 'importTime',
		},
		{
			title: '导入人',
			dataIndex: 'importPip',
		},
		{
			title: '导入任务状态',
			dataIndex: 'importType',
		},
		{
			title: '导入成功/失败数量',
			dataIndex: 'importName',
		},
		{
			title: '操作',
			dataIndex: 'importName',
			render: () => {
				return <a>下载失败数据</a>;
			},
		},
	];
	const exportListClick = () => {
		ref?.current?.validateFields().then((res: any) => {
			const arg0 = {
				...res,
				ids: selectedRowKeys,
				timeType:timeSelect,
				beginCreateTime:
					res.time?.length > 0 ? moment(res.time[0]).valueOf() : undefined,
				endCreateTime:
					res.time?.length > 0 ? moment(res.time[1]).valueOf() : undefined,
			};
			exprotList(arg0, {responseType: 'blob', getResponse: true}).then(
				(res: any) => {
					let blob = new Blob([res.data]);
					let downloadElement = document.createElement('a');
					let href = window.URL.createObjectURL(blob); //创建下载的链接
					downloadElement.href = href;
					downloadElement.download =
						decodeURI(
							res.headers['content-disposition'].split('filename=')[1],
						) || ''; //下载后文件名
					document.body.appendChild(downloadElement);
					downloadElement.click(); //点击下载
					document.body.removeChild(downloadElement); //下载完成移除元素
					window.URL.revokeObjectURL(href); //释放掉blob对象
				},
			);
		});
	};
	const onSelectChange = (newSelectedRowKeys: any) => {
		setSelectedRowKeys(newSelectedRowKeys);
	};
	const rowSelection = {
		selectedRowKeys,
		onChange: onSelectChange,
	};
	// @ts-ignore
	return (
		<div>
			<ProTable
				columns={columns}
				defaultSize={'small'}
				scroll={{
					x: 'max-content',
				}}
				rowKey={'id'}
				formRef={ref}
				request={async (params, sort, filter) => {
					const arg0 = {
						...filterPageName(params),
						beginCreateTime:
							params.time?.length > 0
								? moment(params.time[0]).valueOf()
								: undefined,
						endCreateTime:
							params.time?.length > 0
								? moment(params.time[1]).valueOf()
								: undefined,
						timeType:timeSelect,
					};
					const res: any = await queryList(arg0, {});
					const data = res?.entry.list;
					return {
						data: data,
						success: res.success,
						// 不传会使用 data 的长度，如果是分页一定要传
						total: res?.entry.totalRecord,
					};
				}}
				search={{
					labelWidth: 140,
					defaultCollapsed: false,
				}}
				form={{
					size: 'small',
				}}
				options={false}
				rowSelection={{...rowSelection}}
				toolBarRender={() => [
					// <Button key="show">导入发货</Button>,
					// <Button key="out" onClick={() => {
					// 	setModalOpen(true)
					// }}>
					// 	导入记录
					// </Button>,
					<Button type="primary" key="primary" onClick={exportListClick}>
						导出
					</Button>,
				]}
			/>
			<Modal
				width={800}
				open={modalOpen}
				title={'导入记录列表'}
				onOk={() => {
					setModalOpen(false);
				}}
				onCancel={() => {
					setModalOpen(false);
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
	);
}

export default AfterSales;
