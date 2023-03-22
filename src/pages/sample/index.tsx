import {ProTable} from '@ant-design/pro-components';
import {Button, Image, Space} from 'antd';
import {useRef, useState} from 'react';
import {queryList} from '@/pages/sample/apis';
import moment from 'moment';
import {filterPageName} from "@/utils";

function Sample() {
	const [activeKey, setActiveKey] = useState('1');
	const actionRef = useRef() as any;
	const columns: any = [
		{
			title: '样衣图片',
			dataIndex: 'imgs',
			search: false,
			width: 180,
			render: (_: any, recode: any) => {
				return <Image width={60} height={60} src={recode.refImages[0]}/>;
			},
		},
		{
			title: '样衣名称',
			dataIndex: 'refTitle',
		},
		{
			title: '样衣编码',
			dataIndex: 'refSysCode',
		},
		{
			title: '需求单编码',
			dataIndex: 'sysCode',
		},
		{
			title: '品类',
			dataIndex: 'refCategoryName',
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
		},
		{
			title: '尺码',
			search: false,
			dataIndex: 'size',
		},
		{
			title: '颜色',
			search: false,
			dataIndex: 'color',
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
			dataIndex: 'sampleRequirementStatus',
		},
		{
			title: '对接人',
			dataIndex: 'creator',
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
						<a>查看</a>
						<a>备注状态</a>
						<a>交付样衣</a>
					</Space>
				);
			},
		},
	];
	return (
		<ProTable
			columns={columns}
			scroll={{
				x: 2100,
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
		></ProTable>
	);
}

export default Sample;
