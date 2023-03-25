import {ProTable} from '@ant-design/pro-components';
import {Button, DatePicker, Modal} from 'antd';
import {useRef, useState} from 'react';
import BatchInput from '@/components/batchInput';
import {history} from 'umi';
import {exportList, queryList} from '@/pages/purchase/apis';
import moment from 'moment';
import {filterPageName} from '@/utils';
import GoodsSearch from '@/components/goodsSearch';
import SelectCpt from "@/components/selectCpt";

const {RangePicker} = DatePicker;

function Purchase(props: any) {
	const {tabKey} = props;
	const actionRef = useRef() as any;
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const ref: any = useRef();
	console.log(tabKey, 'tabKey')
	const columns: any = [
		{
			title: '序号',
			dataIndex: 'index',
			search: false,
		},
		{
			title: '采购单号',
			hideInTable: true,
			dataIndex: 'purNoList',
			renderFormItem: (item: any, _: any, form: any) => {
				return <BatchInput/>;
			},
		},
		{
			title: '货品编码',
			hideInTable: true,
			dataIndex: 'skuCodeList',
			renderFormItem: (item: any, _: any, form: any) => {
				return <BatchInput/>;
			},
		},
		{
			title: '采购订单',
			dataIndex: 'purNo',
			width: 300,
			search: false,
			render: (_: any, recode: any) => {
				return (
					<a
						onClick={() => {
							history.push(`/order/purchase-detail/${recode.id}`);
						}}
					>
						{_}
					</a>
				);
			},
		},
		{
			title: 'SKU数',
			dataIndex: 'skuNumber',
			search: false,
		},
		{
			title: '采购数量',
			dataIndex: 'number',
			search: false,
		},
		{
			title: '采购金额',
			dataIndex: 'amount',
			search: false,
		},
		{
			title: '预计交付日期',
			dataIndex: 'time',
			hideInTable: true,
			valueType: 'dateRange',
			search: {
				transform: (value) => {
					const [startTime, endTime] = value;
					return {
						expectedStartTime: moment(startTime).format('YYYY-MM-DD 00:00:00'),
						expectedEndTime: moment(endTime).format('YYYY-MM-DD 23:59:59'),
					};
				},
			},
		},
		{
			title: '预计交付日期',
			search: false,
			dataIndex: 'expectedTime',
			render: (i: any) => moment(i).format('YYYY-MM-DD'),
		},
		{
			title: '采购状态',
			dataIndex: 'status',
			search: tabKey !== '0' ? false : true,
			valueEnum: {
				2: '待确认', 3: '已确认', 4: '已驳回',
			}
		},
		{
			title: '采购员',
			dataIndex: 'buyer',
			search: false
		},
		{
			title: '采购员',
			dataIndex: 'buyer',
			hideInTable: true,
			renderFormItem: (item: any, _: any, form: any) => {
				return <SelectCpt/>;
			},
		},
		{
			title: '操作',
			fixed: 'right',
			width: 60,
			search: false,
			render: (_: any, recode: any) => {
				return (
					<a
						onClick={() => {
							history.push(`/order/purchase-detail/${recode.id}`);
						}}
					>
						查看
					</a>
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
				status: tabKey === '0' ? res.status : Number(tabKey),
			};
			exportList(arg0, {responseType: 'blob', getResponse: true}).then(
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
	return (
		<div>
			<ProTable
				columns={columns}
				defaultSize={'small'}
				actionRef={actionRef}
				scroll={{
					x: 'max-content',
				}}
				rowKey={'id'}
				formRef={ref}
				request={async (params = {}, sort, filter) => {
					console.log(params, 'params')
					const arg0 = {
						...filterPageName(params),
						status: tabKey === '0' ? params.status : Number(tabKey),
						clientType: 2,
						skuCodeList: params.skuCodeList ? params.skuCodeList?.split(',') : undefined,
						purNoList: params.purNoList ? params.purNoList?.split(',') : undefined,
					};
					const res: any = await queryList(arg0, {});
					const data = res.entry.list.map((item, index) => ({...item, index: index + 1}));
					return {
						data: data,
						success: res.success,
						// 不传会使用 data 的长度，如果是分页一定要传
						total: res?.entry.totalRecord,
					};
				}}
				search={{
					labelWidth: 120,
					defaultCollapsed: false,
				}}
				// rowSelection={{ ...rowSelection }}
				form={{
					size: 'small',
				}}
				options={false}
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

export default Purchase;
