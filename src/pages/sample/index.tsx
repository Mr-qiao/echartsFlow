import {ProTable} from '@ant-design/pro-components';
import {Select, Form, Image, Modal, Space, message} from 'antd';
import {useEffect, useRef, useState} from 'react';
import {delivery, mark, queryList} from '@/pages/sample/apis';
import moment from 'moment';
import {filterPageName} from "@/utils";
import {history} from "umi";
import SelectTree from "@/components/selectTree";
import {getCategoryTree} from "@/pages/goods/apis";
import SelectCpt from "@/components/selectCpt";


const {Option} = Select

function Sample() {
	const [optionsTree, setOptionsTree] = useState([]);
	useEffect(() => {
		getCategoryTree({}, {}).then((res) => {
			if (res.success) {
				setOptionsTree(res.entry);
			} else {
				message.error('类目树获取失败，请稍后再试');
			}
		});
	}, []);
	const [form] = Form.useForm()
	const [activeKey, setActiveKey] = useState('1');
	const actionRef = useRef() as any;
	const arrOptions = ['打样中', '样板设计', '设计完成', '物料采购']
	const [open, setOpen] = useState(false)
	const [byId, setbyId] = useState({}) as any
	const columns: any = [
		{
			title: '样衣图片',
			dataIndex: 'imgs',
			search: false,
			width: 180,
			render: (_: any, recode: any) => {
				return <Image width={60} height={60} src={recode?.refImages !== null ? recode?.refImages[0] : ''}/>;
			},
		},
		{
			title: '样衣名称',
			dataIndex: 'refTitle',
		},
		{
			title: '样衣编码',
			dataIndex: 'refSysItemCode',
		},
		{
			title: '需求单编码',
			dataIndex: 'sysItemCode',
		},
		{
			title: '品类',
			dataIndex: 'refCategoryName',
			renderFormItem: (item: any, _: any, form: any) => {
				return (
					<SelectTree
						options={optionsTree}
						fieldNames={{
							label: 'name',
							value: 'categoryId',
							children: 'children',
						}}
					/>
				);
			},
			fieldProps: {
				placeholder: '请选择',
			},
		},
		// {
		// 	title: '品牌',
		// 	search: false,
		// 	dataIndex: 'brandName',
		// },
		{
			title: '商家款式编码',
			dataIndex: 'refSysCode',
		},
		{
			title: '需求时间',
			search: false,
			dataIndex: 'gmtCreate',
			render: (i: any) => moment(i).format('YYYY-MM-DD HH:mm:ss'),
		},
		{
			title: '是否现货',
			search: false,
			dataIndex: 'spotsType',
			valueEnum: {
				1: '有',
				2: '没有'
			}
		},
		{
			title: '尺码',
			search: false,
			dataIndex: 'clothSize',
		},
		{
			title: '颜色',
			search: false,
			dataIndex: 'clothColor',
		},
		{
			title: '吊牌价',
			search: false,
			dataIndex: 'tagPrice',
		},
		{
			title: '预计交付时间',
			search: false,
			dataIndex: 'requirementTime',
		},
		{
			title: '需求状态',
			search: false,
			dataIndex: 'status',
			valueEnum: {
				1: '打样中', 2: '样板设计', 3: '设计完成', 4: '物料采购'
			}
		},
		{
			title: '对接人',
			dataIndex: 'creator',
			search: false
		},
		{
			title: '对接人',
			dataIndex: 'creator',
			hideInTable: true,
			renderFormItem: (item: any, _: any, form: any) => {
				return <SelectCpt/>;
			},
		},
		{
			title: '操作',
			search: false,
			align: 'center',
			fixed: 'right',
			width: 200,
			render: (_: any, recode: any) => {
				return (
					<Space>
						<a onClick={() => {
							history.push(`/goods/sample/detail?sampleId=${recode.itemId}`)
						}}>查看</a>
						<a onClick={() => {
							setbyId(recode)
							setOpen(true)
						}}>备注状态</a>
						<a onClick={() => {
							delivery(
								{status: '3', itemId: recode?.itemId}, {}
							).then((res: any) => {
								if (res.success) {
									message.success('交付完成')
									actionRef.current.reload()
								}
							})
						}}
						>交付样衣</a>
					</Space>
				);
			},
		},
	];
	return (
		<div>
			<ProTable
				columns={columns}
				scroll={{
					x: 'max-content',
				}}
				rowKey={'index'}
				search={{
					labelWidth: 120,
				}}
				actionRef={actionRef}
				request={async (params, sort, filter) => {
					const arg0 = {
						...filterPageName(params),
					};
					const res: any = await queryList(arg0, {});
					const data = res.entry.list;
					return {
						data: data,
						success: res.success,
						// 不传会使用 data 的长度，如果是分页一定要传
						total: res?.entry.totalRecord,
					};
				}}
				defaultSize={'small'}
				form={{
					size: 'small',
				}}
				toolbar={
					{
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
									label: <span>待开始</span>,
								},
								{
									key: '3',
									label: <span>打样中</span>,
								},
								{
									key: '4',
									label: <span>已交付</span>,
								},
							],
							onChange: (key: string) => {
								setActiveKey(key as string);
								actionRef.current.reload();
							},
						},
					} as any
				}
			/>
			<Modal
				title={'备注状态'}
				open={open}
				onOk={() => {
					form.validateFields().then(values => {
						mark(
							{...values, itemId: byId?.itemId}, {}
						).then((res: any) => {
							if (res.success) {
								message.success('备注状态成功')
								actionRef.current.reload()
							}
						})
					})
				}}
				onCancel={() => {
					setOpen(false)
				}}
			>
				<Form form={form}>
					<Form.Item label={'修改状态'} name={'status'}>
						<Select>
							{arrOptions.map((item, index) => (
								<Option key={index + 1}>{item}</Option>
							))}
						</Select>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
}

export default Sample;
