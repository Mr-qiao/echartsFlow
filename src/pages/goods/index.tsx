import {ProTable} from '@ant-design/pro-components';
import {Button, message} from 'antd';
import GoodsTableCol from '@/components/goodsTableCol';
import moment from 'moment/moment';
import {getCategoryTree, queryList} from '@/pages/goods/apis';
import {useEffect, useState} from 'react';
import SelectTree from '@/components/selectTree';
import {filterPageName} from '@/utils';
import {history} from '@umijs/max';

function Goods() {
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
	const columns: any = [
		{
			title: '款式编码',
			dataIndex: 'sysItemCode',
		},
		{
			title: '款式名称',
			hideInTable: true,
			dataIndex: 'title',
		},
		{
			title: '商品类目',
			dataIndex: 'categoryId',
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
			hideInTable: true,
		},
		{
			title: '商品品牌',
			dataIndex: 'brandName',
			hideInTable: true,
		},
		{
			title: '商品类型',
			fieldProps: {
				placeholder: '请选择',
			},
			hideInTable: true,
			valueEnum: {
				0: '成衣款',
				1: '设计师款',
			},
			dataIndex: 'hasSample',
			width: 48,
		},
		{
			title: '商品信息',
			search: false,
			// width: 300,
			render: (_: any, recode: any) => {
				return (
					<GoodsTableCol
						nameArr={[
							{
								title: '款式名称',
								key: recode.title,
							},
							{
								title: '类目',
								key: recode?.categoryNames?.join('/'),
							},
							{
								title: '品牌',
								key: recode.brandName,
							},
							{
								title: '颜色',
								key: recode.categoryName,
							},
							{
								title: '尺码',
								key: recode.categoryName,
							},
						]}
						imgs={recode.images.map((item: any) => {
							return {
								src: item,
							};
						})}
					/>
				);
			},
		},
		{
			title: '供应商信息',
			search: false,
			dataIndex: 'userName',
		},
		{
			title: '供应商商品编码',
			search: false,
			dataIndex: 'supplierItemCode',
		},
		{
			title: '快手商品id',
			dataIndex: 'outsideItemCode',
		},
		{
			title: '操作',
			width: 100,
			search: false,
			render: (_: any, recode: any) => {
				return <a>查看</a>;
			},
		},
	];
	return (
		<ProTable
			columns={columns}
			search={{
				labelWidth: 120,
			}}
			defaultSize={'small'}
			form={{
				size: 'small',
			}}
			options={false}
			request={async (
				// 第一个参数 params 查询表单和 params 参数的结合
				// 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
				params,
				sort,
				filter,
			) => {
				const arg0 = {
					...filterPageName(params),
					// startTime: params.time?.length > 0 ? moment(params.time[0]).valueOf() : undefined,
					// endTime: params.time?.length > 0 ? moment(params.time[1]).valueOf() : undefined,
				};
				const res = await queryList(arg0, {});
				const data = res.entry.list;
				return {
					data: data,
					success: res.success,
					// 不传会使用 data 的长度，如果是分页一定要传
					total: res?.entry.totalRecord,
				};
			}}
			headerTitle={
				<Button
					key="primary"
					type="primary"
					onClick={() => {
						history.push('/goods/create')
					}}
				>
					创建供应商款式信息
				</Button>
			}
		></ProTable>
	);
}

export default Goods;