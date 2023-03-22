import {
	Col,
	Descriptions,
	Image,
	Input,
	InputNumber,
	message,
	Row,
	Table,
} from 'antd';
import {ProCard} from '@ant-design/pro-components';
import {useEffect, useState} from 'react';
import BottomButton from '@/components/bottomButton';
import {queryById, updateById} from '@/pages/quotation/apis';
import {useParams} from '@umijs/max';
import {history} from "umi";

const DescriptionsItem = Descriptions.Item;

function EditBoom() {
	const [dataSource, setDataSource] = useState([]) as any;
	const hj = (index: any) => {
		const NewArr = [...dataSource];
		const data = NewArr[index];
		const hjs =
			Number(data.productionCost || 0) +
			Number(data.brandPremium || 0) +
			Number(data.ipExpense || 0) +
			Number(data.packagingMaterial || 0) +
			Number(data.expressCharge || 0);
		console.log(hjs, 'hj');
		NewArr[index].price = hjs;
		console.log(NewArr, 'NewArr')
		setDataSource(NewArr);
	};
	const columns: any = [
		{
			title: '规格信息',
			align: 'center',
			dataIndex: 'properties',
		},
		{
			title: '报价项',
			children: [
				{
					title: '生产成本',
					align: 'center',
					dataIndex: 'productionCost',
					render: (_: any, recode: any, index: number) => {
						return (
							<InputNumber
								min={0}
								value={recode.productionCost}
								onChange={(e) => {
									const NewArr = [...dataSource];
									NewArr[index].productionCost = e;
									setDataSource(NewArr);
									hj(index);
								}}
							/>
						);
					},
				},
				{
					title: '品牌溢价',
					align: 'center',
					dataIndex: 'brandPremium',
					render: (_: any, recode: any, index: number) => {
						return (
							<InputNumber
								min={0}
								value={recode.brandPremium}
								onChange={(e) => {
									const NewArr = [...dataSource];
									NewArr[index].brandPremium = e;
									setDataSource(NewArr);
									hj(index);
								}}
							/>
						);
					},
				},
				{
					title: 'Ip费用',
					align: 'center',
					dataIndex: 'ipExpense',
					render: (_: any, recode: any, index: number) => {
						return (
							<InputNumber
								min={0}
								value={recode.ipExpense}
								onChange={(e) => {
									const NewArr = [...dataSource];
									NewArr[index].ipExpense = e;
									setDataSource(NewArr);
									hj(index);
								}}
							/>
						);
					},
				},
				{
					title: '包装材料',
					align: 'center',
					dataIndex: 'packagingMaterial',
					render: (_: any, recode: any, index: number) => {
						return (
							<InputNumber
								min={0}
								value={recode.packagingMaterial}
								onChange={(e) => {
									const NewArr = [...dataSource];
									NewArr[index].packagingMaterial = e;
									setDataSource(NewArr);
									hj(index);
								}}
							/>
						);
					},
				},
				{
					title: '快递费用',
					align: 'center',
					dataIndex: 'expressCharge',
					render: (_: any, recode: any, index: number) => {
						return (
							<InputNumber
								min={0}
								value={recode.expressCharge}
								onChange={(e) => {
									const NewArr = [...dataSource];
									NewArr[index].expressCharge = e;
									setDataSource(NewArr);
									hj(index);
								}}
							/>
						);
					},
				},
			],
		},
		{
			title: '最终报价',
			align: 'center',
			dataIndex: 'price',
			render: (_, recode: any) => {
				console.log(recode, 'recode')
				return recode.price
			}
		},
	];
	const [dataObj, setDataObj] = useState({}) as any;
	const [itemProperties, setItemProperties] = useState([]) as any;
	const {id} = useParams();
	useEffect(() => {
		queryById({id: id}).then((res) => {
			console.log(res, 'res');
			if (res.success) {
				setDataObj(res.entry);
				setItemProperties(res.entry?.itemProperties || []);
				if (res.entry.goodsInfoMap) {
					setDataSource(res.entry.goodsInfoMap.goodsInfoList);
				} else {
					setDataSource([res.entry?.itemSkuList]);
				}
			} else {
				message.error('获取信息失败');
			}
		});
	}, []);
	console.log(dataSource, 'data')
	return (
		<div>
			<ProCard>
				<Row>
					<Image.PreviewGroup>
						<Col>
							<Image
								width={260}
								height={260}
								src={dataObj?.imgUrlList?.length > 0 && dataObj.imgUrlList[0]}
							/>
						</Col>
						<Col style={{marginLeft: 10}}>
							<Row>
								<Col span={24}>
									<Image
										width={80}
										height={80}
										src={
											dataObj?.imgUrlList?.length > 0 && dataObj.imgUrlList[1]
										}
									/>
								</Col>
								<Col span={24} style={{marginTop: 10}}>
									<Image
										width={80}
										height={80}
										src={
											dataObj?.imgUrlList?.length > 0 && dataObj.imgUrlList[2]
										}
									/>
								</Col>
								<Col span={24} style={{marginTop: 10}}>
									<Image
										width={80}
										height={80}
										src={
											dataObj?.imgUrlList?.length > 0 && dataObj.imgUrlList[3]
										}
									/>
								</Col>
							</Row>
						</Col>
						<Col span={12}>
							<h1 style={{margin: 0}}>{dataObj?.itemTitle}</h1>
							<Descriptions column={2}>
								{itemProperties.map((item: any, index: any) => {
									return (
										item.propertyValues && (
											<DescriptionsItem key={index} label={item.propertyName}>
												{item.propertyValues}
											</DescriptionsItem>
										)
									);
								})}
							</Descriptions>
							{/*<Descriptions column={1}>*/}
							{/*	<DescriptionsItem label={'卖点信息'}>*/}
							{/*		啊实打实大师大师大师大苏打手打三打哈开机啊合法抗打击沙发哈师大会计法哈卡随机发干哈刷卡机代发哈索拉卡登记*/}
							{/*	</DescriptionsItem>*/}
							{/*</Descriptions>*/}
						</Col>
					</Image.PreviewGroup>
				</Row>
				<Table
					size={'small'}
					columns={columns}
					dataSource={dataSource}
					pagination={false}
				/>
			</ProCard>
			<BottomButton
				okText={'提交报价'}
				onOk={() => {
					console.log(dataSource, 'dataSource');
					const arg0 = {
						...dataObj,
						goodsInfoMap: {
							goodsInfoList: dataSource
						}
					};
					updateById(arg0).then((res) => {
						console.log(res, 'res');
						if (res.success) {
							message.success('成功')
							history.push('/quotation/list')
						}
					});
				}}
			/>
		</div>
	);
}

export default EditBoom;
