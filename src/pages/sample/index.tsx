import {ProTable} from "@ant-design/pro-components";
import {Button, Image, Space} from "antd";
import {useRef, useState} from "react";
import {TFunction} from "@sinclair/typebox";
import GoodsTableCol from "@/components/goodsTableCol";
import {history} from "umi";


function Sample() {
	const [activeKey, setActiveKey] = useState('1')
	const actionRef = useRef() as any
	const columns: any = [
		{
			title: '样衣图片',
			dataIndex: 'imageUrls',
			search:false,
			width: 180,
			render: (_: any, recode: any) => {
				console.log(recode, 'recode')
				return (
					<Image width={60} height={60} src={'https://img1.baidu.com/it/u=664069914,3928453659&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'}/>
				)
			}
		},
		{
			title: '样衣名称',
			dataIndex: 'sampleClothesName',
		},
		{
			title: '样衣编码',
			dataIndex: 'sampleClothesCode',
		},
		{
			title: '需求单编码',
			dataIndex: 'requirementCode',
		},
		{
			title: '品类',
			dataIndex: 'categoryId',
		},
		// {
		// 	title: '品牌',
		// 	search: false,
		// 	dataIndex: 'brandName',
		// },
		{
			title: '商家款式编码',
			dataIndex: 'supplierStyleCode',
		},
		{
			title: '规格',
			search:false,
			dataIndex: 'specification',
		},
		{
			title: '需求时间',
			search: false,
			dataIndex: 'createTime',
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
			search:false,
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
				)
			}
		},
	]
	return (
		<ProTable
			columns={columns}
			scroll={{
				x: 2100
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
						,
						{
							index: 4,
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
						,
						{
							index: 4,
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
						,
						{
							index: 4,
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
						,
						{
							index: 4,
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
						,
						{
							index: 4,
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
						,
						{
							index: 4,
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
						,
						{
							index: 4,
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
						,
						{
							index: 4,
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

export default Sample