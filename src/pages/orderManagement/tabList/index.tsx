import {DownOutlined, UploadOutlined} from '@ant-design/icons';
import {ProTable} from '@ant-design/pro-components';
import {
	Button,
	Col,
	DatePicker,
	Form,
	Image,
	Input,
	message,
	Modal,
	Row,
	Select,
	Table,
	Upload,
} from 'antd';
import GoodsTableCol from '@/components/goodsTableCol';
import {useRef, useState} from 'react';
import {
	deliverItem, exportFailList,
	importList,
	queryList, recordsList,
} from '@/pages/orderManagement/apis';
import moment from 'moment';
import BatchInput from '@/components/batchInput';
import {exportList} from '@/pages/orderManagement/apis';
import {filterPageName} from "@/utils";

const {Option} = Select;
const {RangePicker} = DatePicker;

function TabList(props: any) {
	const {tabKey} = props;
	const [form] = Form.useForm();
	const [timeSelect, setTimeSelect] = useState('1');
	const [modalOpen, setModalOpen] = useState(false);
	const [modalOpenDelivery, setModalOpenDelivery] = useState(false);
	const [modalOpenImport, setModalOpenImport] = useState(false);
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [queryIdList, setQueryIdList] = useState({}) as any;
	const actionRef = useRef() as any;
	const ref: any = useRef();
	const columnsDelivery: any = [
		{
			title: '商品信息',
			search: false,
			width: 300,
			render: (_: any, recode: any) => {
				return (
					<GoodsTableCol
						footerImg={false}
						nameArr={[
							{
								title: '商品ID',
								key: recode.itemId,
							},
							{
								title: '款式名称',
								key: recode.ksName,
							},
							{
								title: 'SKU编码',
								key: recode.skuCodes,
							},
							{
								title: '规格',
								key: recode.skuSpec,
							},
						]}
					/>
				);
			},
		},
		{
			title: '数量',
			dataIndex: 'number',
			width: 80,
			search: false,
		},
	];
	const columns: any = [
		{
			title: '商品信息',
			search: false,
			width: 300,
			render: (_: any, recode: any) => {
				return (
					<GoodsTableCol
						footerImg={false}
						nameArr={[
							{
								title: '商品ID',
								key: recode.itemId,
							},
							{
								title: '款式名称',
								key: recode.itemTitle,
							},
							{
								title: 'SKU编码',
								key: recode.skuCode,
							},
							{
								title: '规格',
								key: recode.skuSpec,
							},
						]}
					/>
				);
			},
		},
		{
			title: '数量',
			dataIndex: 'number',
			width: 80,
			search: false,
		},
		{
			title: '订单编号',
			width: 180,
			dataIndex: 'orderId',
			search: false,
		},
		{
			title: '订单编号',
			width: 180,
			hideInTable: true,
			dataIndex: 'orderIds',
			renderFormItem: (item: any, _: any, form: any) => {
				return <BatchInput/>;
			},
		},
		{
			title: 'Sku编码',
			dataIndex: 'skuCodes',
			hideInTable: true,
			renderFormItem: (item: any, _: any, form: any) => {
				return <BatchInput/>;
			},
		},
		{
			title: '款式名称',
			dataIndex: 'itemTitle',
			hideInTable: true,
		},
		{
			title: '订单状态',
			dataIndex: 'status',
			search: tabKey === '3' ? true : false,
			valueEnum: {
				1: '待发货',
				2: '已发货',
				3: '已收货',
				4: '交易完成',
				5: '订单关闭',
			},
			// hideInTable: true,
		},
		{
			title: '是否作废',
			dataIndex: 'isDeleted',
			valueEnum: {
				0: '未作废',
				1: '已作废',
			},
			hideInTable: true,
		},
		{
			title: '商品id',
			dataIndex: 'itemId',
			hideInTable: true,
		},
		{
			title: '创建时间',
			search: false,
			width: 180,
			dataIndex: 'gmtCreate',
			render: (i: any) => {
				return moment(i).format('YYYY-MM-DD HH:mm:ss');
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
					}}
				>
					<Option value={'1'} key={1}>
						创建日期
					</Option>
					<Option value={'2'} key={1}>
						发货日期
					</Option>
				</Select>
			),
			dataIndex: 'sendTime',
			renderFormItem: () => {
				return <RangePicker showTime placeholder={['请选择开始时间','请选择结束时间']}/>;
			},
			formItemProps: {
				htmlFor: '',
			},
			hideInTable: true,
		},
		{
			title: '收货信息',
			dataIndex: 'shxx',
			search: false,
			render: (_: any, recode: any) => {
				return (
					<GoodsTableCol
						showImg={false}
						nameArr={[
							{
								title: '姓名',
								key: recode.userName,
							},
							{
								title: '手机号',
								key: recode.userPhone,
							},
							{
								title: '地址',
								key: recode.address,
							},
						]}
					/>
				);
			},
		},
		{
			title: '发货信息',
			dataIndex: 'fhxx',
			width: 180,
			search: false,
			render: (_: any, recode: any) => {
				return (
					<GoodsTableCol
						showImg={false}
						nameArr={[
							{
								title: '快递',
								key: recode.buyer,
							},
							{
								title: '单号',
								key: recode.companyCode,
							},
							{
								title: '时间',
								key: moment(recode.sendTime).format('YYYY-MM-DD HH:mm:ss'),
							},
						]}
					/>
				);
			},
		},
		{
			title: '操作',
			fixed: 'right',
			width: 60,
			search: false,
			render: (_: any, recode: any) => {
				return (
					recode.status === '待发货' && (
						<a
							onClick={() => {
								setQueryIdList(recode);
								setModalOpenDelivery(true);
							}}
						>
							发货
						</a>
					)
				);
			},
		},
	];
	// 导入列表
	const dcolumns: any = [
		{
			title: '导入文件名称',
			dataIndex: 'fileName',
		},
		{
			title: '导入时间',
			dataIndex: 'gmtCreate',
			render: (_: any, recode: any) => {
				return moment(recode.gmtCreate).format('YYYY-MM-DD HH:mm:ss')
			}
		},
		{
			title: '导入人',
			dataIndex: 'modifier',
		},
		{
			title: '导入任务状态',
			dataIndex: 'statusDs',
		},
		{
			title: '导入成功/失败数量',
			render: (_: any, recode: any) => {
				return (
					<div>{recode.success}/{recode.fail}</div>
				)
			}
		},
		{
			title: '操作',
			dataIndex: 'importName',
			render: (_: any, recode: any) => {
				return <a onClick={() => {
					exportFailList({id: recode.id}, {responseType: 'blob', getResponse: true}).then(
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
				}}>下载失败数据</a>;
			},
		},
	];
	const exportListClick = () => {
		ref?.current?.validateFields().then((res: any) => {
			const sTime: any = timeSelect === '1' ? 'beginCreateTime' : 'startTime';
			const eTime: any = timeSelect === '1' ? 'endCreateTime' : 'endTime';
			let arg0: any = {
				status: tabKey === '3' ? undefined : tabKey,
				ids: selectedRowKeys,
				timeType:timeSelect,
				...res,
			};
			arg0[sTime] =
				res.sendTime?.length > 0
					? moment(res.sendTime[0]).valueOf()
					: undefined;
			arg0[eTime] =
				res.sendTime?.length > 0
					? moment(res.sendTime[1]).valueOf()
					: undefined;
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
	const beforeUpload = async (file: any): Promise<any> => {
		return false;
	};
	return (
		<div>
			<ProTable
				columns={columns}
				formRef={ref}
				defaultSize={'small'}
				scroll={{x: 1200}}
				rowKey={'id'}
				actionRef={actionRef}
				request={async (params = {}, sort, filter) => {
					const sTime: any =
						timeSelect === '1' ? 'beginCreateTime' : 'startTime';
					const eTime: any = timeSelect === '1' ? 'endCreateTime' : 'endTime';
					let arg0: any = {
						status: tabKey === '3' ? undefined : tabKey,
						timeType:timeSelect,
						...params,
					};
					arg0[sTime] =
						params.sendTime?.length > 0
							? moment(params.sendTime[0]).valueOf()
							: undefined;
					arg0[eTime] =
						params.sendTime?.length > 0
							? moment(params.sendTime[1]).valueOf()
							: undefined;
					const res: any = await queryList(arg0, {});
					const data = res?.entry?.list;
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
				form={{
					size: 'small',
				}}
				options={false}
				rowSelection={{...rowSelection}}
				toolBarRender={() => [
					<Button
						key="show"
						onClick={() => {
							setModalOpenImport(true);
						}}
					>
						导入发货
					</Button>,
					<Button
						key="out"
						onClick={() => {
							setModalOpen(true);
						}}
					>
						导入记录
					</Button>,
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
					size={'small'}
					search={false}
					options={false}
					request={async (params) => {
						const arg0 = {
							...filterPageName(params),
							type: '2'
						}
						const res: any = await recordsList(arg0, {})
						const data = res?.entry?.list;
						return {
							data: data,
							success: res.success,
							// 不传会使用 data 的长度，如果是分页一定要传
							total: res?.entry.totalRecord,
						};
					}}
					columns={dcolumns}
				/>
			</Modal>
			<Modal
				width={400}
				open={modalOpenImport}
				title={'导入发货'}
				onOk={() => {
					form.validateFields().then((values: any) => {
						const arg0 = {
							orderFile: values.file.file,
						};
						// @ts-ignore
						importList(arg0).then((res) => {
							if (res.entry.success) {
								message.success('上传成功');
								setModalOpenImport(false);
								actionRef.current.reload();
							} else {
								message.error('上传失败，请检查文件');
							}
						});
					});
				}}
				onCancel={() => {
					setModalOpenImport(false);
				}}
			>
				<div>
					请先下载<a>导入发货模版</a>
				</div>
				<Form form={form}>
					<Form.Item
						name="file"
						help={'请上传文件'}
						rules={[{required: true, message: '请选择文件'}]}
					>
						<Upload beforeUpload={beforeUpload} maxCount={1}>
							<Button icon={<UploadOutlined/>}>上传文件</Button>
						</Upload>
					</Form.Item>
				</Form>
			</Modal>
			<Modal
				width={500}
				open={modalOpenDelivery}
				title={'发货'}
				onOk={() => {
					form.validateFields().then((values: any) => {
						const arg0 = {
							...values,
							id: queryIdList?.id,
						};
						// @ts-ignore
						deliverItem(arg0).then((res: any) => {
							if (res.success) {
								message.success('发货成功');
								setModalOpenDelivery(false);
								actionRef.current.reload();
							} else {
								message.error('发货失败，请稍后再试');
							}
						});
					});
				}}
				onCancel={() => {
					setModalOpenDelivery(false);
				}}
			>
				<Table
					size={'small'}
					pagination={false}
					columns={columnsDelivery}
					dataSource={[queryIdList]}
				/>
				<Form form={form}>
					<Form.Item
						label={'快递公司'}
						name="companyName"
						rules={[{required: true, message: '请输入快递公司'}]}
					>
						<Input placeholder={'请输入快递公司'}/>
					</Form.Item>
					<Form.Item
						label={'快递单号'}
						name="companyCode"
						rules={[{required: true, message: '请输入快递单号'}]}
					>
						<Input placeholder={'请输入快递单号'}/>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
}

export default TabList;
