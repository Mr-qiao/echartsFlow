import {ProCard, ProForm} from '@ant-design/pro-components';
import GoodImgEditCheck from '@/components/goodImgEditCheck';
import {
	Button,
	Descriptions,
	Image,
	Input,
	InputNumber,
	Select,
	Space,
	Table,
	Tabs,
} from 'antd';
import {useEffect, useState} from 'react';
import RepeatTable from '@/pages/quotation/components/repeatTable';
import BottomButton from '@/components/bottomButton';
import {queryById} from '@/pages/quotation/apis';
import {useParams} from '@@/exports';
import _ from 'lodash';
import './index.less'

const {Option} = Select

function QuotationEdit() {
	const params = useParams();
	const [data, setData] = useState({}) as any;
	const [wlbjz, setWlbjz] = useState('')
	const [gybjz, setGybjz] = useState('')
	const [qtbjz, setQtbjz] = useState('')
	const [hzData, setHzData] = useState([])
	const [tabKey, setTabKey] = useState(0) as any;
	const [wuTabItems, setWuTabItems] = useState([]) as any
	// 物料列表主数据
	const [dataSourcePp, setDataSourcePp] = useState([]) as any;
	// 工艺列表主数据
	const [dataSourceGy, setDataSourceGy] = useState([
		{
			bw: 1,
			gylx: 2,
			zf: '牛',
		},
		{
			bw: 1,
			gylx: 2,
			zf: '牛',
		},
		{
			bw: 1,
			gylx: 2,
			zf: '牛',
		},
	]) as any;
	// // 汇总列表主数据
	// const [dataSourceHz, setDataSourceHz] = useState([
	// 	{
	// 		gg: 1,
	// 		wlbj: 2,
	// 		gybj: '牛',
	// 	},
	// 	{
	// 		gg: 1,
	// 		wlbj: 2,
	// 		gybj: '牛',
	// 	},
	// 	{
	// 		gg: 1,
	// 		wlbj: 2,
	// 		gybj: '牛',
	// 	},
	// ]) as any;
	// 其他列表主数据
	const [dataSourceQt, setDataSourceQt] = useState([]) as any;
	// 图样附图
	const arr = data?.drawingMap?.accessoryImages?.length > 0 ? data?.drawingMap.accessoryImages.map((item: any) => ({src: item})) : []
	// 其他附件
	const qtarr = data?.drawingMap?.accessoryFiles?.length > 0 ? data?.drawingMap?.accessoryFiles.map((item: any) => ({src: item})) : []
	// 尺寸附图
	const ccftarr = data?.craftMap?.workmanshipImages?.length > 0 ? data?.craftMap?.workmanshipImages.map((item: any) => ({src: item})) : []
	// 尺寸列表 Columns
	const columns: any = [
		{
			title: '名称',
			align: 'center',
			dataIndex: 'positionName',
		},
		{
			title: '测量方法',
			align: 'center',
			dataIndex: 'measureType',
		},
		{
			title: '误差范围',
			align: 'center',
			dataIndex: 'errorRange',
		},
		{
			title: '样版值',
			align: 'center',
			dataIndex: 'modelPrice',
		},
		// {
		// 	title: 'L',
		// 	align: 'center',
		// 	dataIndex: 'L',
		// },
	];
	// 物料列表 Columns
	const columnsWl: any = [
		{
			title: '物料类型',
			align: 'center',
			dataIndex: 'materialName',
		},
		{
			title: '供应商',
			align: 'center',
			dataIndex: 'supplierName',
		},
		{
			title: '物料编号',
			align: 'center',
			dataIndex: 'materialNo',
		},
		{
			title: '使用部位',
			align: 'center',
			dataIndex: 'positionName',
		},
		{
			title: '单价',
			align: 'center',
			dataIndex: 'dj',
			width: 100,
			render: (_: any, recode: any, index: number) => {
				return (
					<InputNumber
						value={recode.dj}
						min={0}
						onChange={(e) => {
							const NewArr = [...dataSourcePp[tabKey]?.materialDetailList];
							NewArr[index].dj = e;
							const da = [...dataSourcePp]
							da[tabKey].materialDetailList = NewArr
							console.log(da)
							setDataSourcePp(da);
							wuL(index)
						}}
					/>
				);
			},
		},
		{
			title: 'sku用量',
			dataIndex: 'skuyl',
			width: 100,
			render: (_: any, recode: any, index: number) => {
				return (
					<InputNumber
						min={0}
						value={recode.skuyl}
						onChange={(e) => {
							const NewArr = [...dataSourcePp[tabKey]?.materialDetailList];
							NewArr[index].skuyl = e;
							const da = [...dataSourcePp]
							da[tabKey].materialDetailList = NewArr
							console.log(da)
							setDataSourcePp(da);
							wuL(index)
						}}
					/>
				);
			},
		},
		{
			title: '损耗率',
			dataIndex: 'shl',
			width: 130,
			render: (_: any, recode: any, index: number) => {
				return (
					<InputNumber
						min={0}
						max={100}
						addonAfter={'%'}
						value={recode.shl}
						onChange={(e) => {
							const NewArr = [...dataSourcePp[tabKey]?.materialDetailList];
							NewArr[index].shl = e;
							const da = [...dataSourcePp]
							da[tabKey].materialDetailList = NewArr
							console.log(da)
							setDataSourcePp(da);
							wuL(index)
						}}
					/>
				);
			},
		},
	];
	// 工艺列表 Columns
	const columnsGy: any = [
		{
			title: '部位',
			align: 'center',
			dataIndex: 'positionName',
		},
		{
			title: '工艺类型',
			align: 'center',
			dataIndex: 'processType',
		},
		{
			title: '做法',
			align: 'center',
			dataIndex: 'practice',
		},
		{
			title: '单价',
			align: 'center',
			dataIndex: 'gydj',
			width: 100,
			render: (_: any, recode: any, index: number) => {
				return (
					<InputNumber
						min={0}
						onChange={(e) => {
							const NewArr = [...dataSourceGy];
							NewArr[index].gydj = e;
							setDataSourceGy(NewArr);
							gongY(index)
						}}
					/>
				);
			},
		},
	];
	// 其他列表 Columns
	const columnsQt: any = [
		{
			title: '报价项目',
			align: 'center',
			dataIndex: 'bjxm',
			render: (_: any, recode: any, index: number) => {
				return (
					<Input
						value={recode.bjxm}
						onChange={(e) => {
							const NewArr = [...dataSourceQt];
							NewArr[index].bjxm = e.target.value;
							setDataSourceQt(NewArr);
						}}
					/>
				);
			},
		},
		{
			title: '报价生效规格',
			align: 'center',
			dataIndex: 'bjsxgg',
			render: (_: any, recode: any, index: number) => {
				return (
					<Select
						style={{width: 200}}
						value={recode.bjsxgg}
						onChange={(e) => {
							console.log(e, 'e')
							const NewArr = [...dataSourceQt];
							NewArr[index].bjsxgg = e
							setDataSourceQt(NewArr);
						}}>
						{data?.itemSkuList?.map(item => {
							return (
								<Option key={item.skuId}>{item.properties}</Option>
							)
						})}
					</Select>
				);
			},
		},
		{
			title: '用途',
			align: 'center',
			dataIndex: 'yt',
			render: (_: any, recode: any, index: number) => {
				return (
					<Input
						value={recode.yt}
						onChange={(e) => {
							const NewArr = [...dataSourceQt];
							NewArr[index].yt = e.target.value;
							setDataSourceQt(NewArr);
						}}
					/>
				);
			},
		},
		{
			title: '计算单价',
			align: 'center',
			dataIndex: 'jsdj',
			width: 100,
			render: (_: any, recode: any, index: number) => {
				return (
					<InputNumber
						value={recode.jsdj}
						onChange={(e) => {
							const NewArr = [...dataSourceQt];
							NewArr[index].jsdj = e
							setDataSourceQt(NewArr);
							qiT(index)
						}}
					/>
				);
			},
		},
		{
			title: '使用数量',
			align: 'center',
			dataIndex: 'sysl',
			width: 100,
			render: (_: any, recode: any, index: number) => {
				return (
					<InputNumber
						value={recode.sysl}
						min={0}
						onChange={(e) => {
							const NewArr = [...dataSourceQt];
							NewArr[index].sysl = e;
							setDataSourceQt(NewArr);
							qiT(index)
						}}
					/>
				);
			},
		},
		{
			title: '单个用价',
			align: 'center',
			dataIndex: 'qthz',
		},
		{
			title: '操作',
			align: 'center',
			render: (_: any, recode: any, index: number) => {
				return (
					<a
						onClick={() => {
							const NewArr = [...dataSourceQt];
							NewArr.splice(index, 1);
							setDataSourceQt(NewArr);
						}}
					>
						删除
					</a>
				);
			},
		},
	];
	// 其他列表 Columns
	const columnsHz: any = [
		{
			title: '规格',
			align: 'center',
			dataIndex: 'properties',
		},
		{
			title: '物料报价',
			align: 'center',
			dataIndex: 'wuliaohuizong',
		},
		{
			title: '工艺报价',
			align: 'center',
			dataIndex: 'gyhuizong',
			render: (_: any, recode: any) => {
				console.log(recode.gyhuizong)
				return recode.gyhuizong
			}
		},
		{
			title: '其他报价',
			align: 'center',
			dataIndex: 'qitahuizong',
		},
	];
	useEffect(() => {
		queryListAll()
	}, []);
	const wuL = (index: any) => {
		console.log(dataSourcePp, 'dataSourceWl')
		const NewArr = [...dataSourcePp[tabKey]?.materialDetailList];
		const da = NewArr[index]
		da.wlhz = (Number(da.dj || 0) * Number(da.skuyl || 0)) * (Number(da.shl || 0) / 100);
		const sumby = _.sumBy(NewArr, 'wlhz')
		const datas = [...dataSourcePp]
		datas[tabKey].materialDetailList = NewArr
		datas[tabKey].hz = sumby
		console.log(datas, 'da')
		const minby = _.minBy(datas, 'hz').hz
		const maxby = _.maxBy(datas, 'hz').hz
		datas[tabKey].minby = minby
		datas[tabKey].maxby = maxby
		const dataClone = {...data}
		dataClone.materialPrice = `${minby}-${maxby}`
		zongHz('wuliaohuizong', sumby, 0, dataClone)
		setWlbjz(`${minby}-${maxby}`)
		setDataSourcePp(datas);
	}
	const queryListAll = async () => {
		const res = await queryById({id: params.id})
		const entry = res.entry
		const gy = _.cloneDeep(entry?.craftMap?.workmanshipDetailList)
		const wll = _.cloneDeep(entry?.materialMap?.skuMaterialList)
		const wl = _.cloneDeep(entry?.materialMap?.skuMaterialList)
		setDataSourcePp(wl)
		setDataSourceGy(gy)
		setData(entry)
		setWuTabItems(wll)
	}
	const gongY = (index: any) => {
		const NewArr = [...dataSourceGy];
		const da = NewArr[index]
		da.gyhz = Number(da.gydj || 0)
		const sumby = _.sumBy(NewArr, 'gyhz')
		setGybjz(`${sumby}`)
		const dataClone = {...data}
		dataClone.craft = `${sumby}`
		setDataSourceGy(NewArr);
		zongHz('gyhuizong', sumby, 0, dataClone)
	}
	const qiT = (index: any) => {
		const NewArr = [...dataSourceQt];
		const da: any = NewArr[index]
		da.qthz = Number(da.jsdj || 0) * Number(da.sysl || 0)
		const sumby = _.sumBy(NewArr, 'qthz')
		const dataClone = {...data}
		dataClone.other = `${sumby}`
		zongHz('qitahuizong', sumby, da?.bjsxgg, dataClone)
		setDataSourceQt(NewArr);
	}
	// 整个汇总
	const zongHz = (lable: any, value: any, sku?: any, dataClone?: any) => {
		let d = {...dataClone}
		if (lable === 'gyhuizong') {
			const a = d.itemSkuList.map((item: any) => {
				return {
					...item,
					[lable]: value
				}
			})
			console.log(a, 'a')
			d.itemSkuList = a
		} else if (lable === 'qitahuizong') {
			const a = d.itemSkuList.map((item: any) => {
				if (item.skuId === Number(sku)) {
					return {
						...item,
						[lable]: value
					}
				} else {
					return {
						...item,
					}
				}
			})
			console.log(a, 'a')
			d.itemSkuList = a
		} else {
			const a = d.itemSkuList[tabKey]
			a[lable] = value
		}
		console.log(d, 'd')
		setData(d)
	}
	// 汇总提交表单
	const submit = () => {
		console.log(dataSourcePp, 'dataWl');
		console.log(dataSourceGy, 'dataGy');
		console.log(dataSourceQt, 'dataQt');
		console.log(data, 'data');
	};
	console.log(data, 'data')
	return (
		<div className={'edit-quo'}>
			<ProCard>
				<GoodImgEditCheck data={data}/>
			</ProCard>
			<ProCard title={'图样副图'}>
				<Descriptions column={1}>
					<Descriptions.Item label={'图片附件'}>
						<Image.PreviewGroup>
							{arr.map((item: any, index) => {
								return (
									<span
										key={index}
										style={{marginLeft: index === 0 ? 0 : 20}}
									>
                    <Image src={item.src} width={100} height={100}/>
                  </span>
								);
							})}
						</Image.PreviewGroup>
					</Descriptions.Item>
					<Descriptions.Item label={'其他附件'}>
						{qtarr.map((item: any, index) => {
							return (
								<span
									key={index}
									style={{marginLeft: index === 0 ? 0 : 20}}
								>
                    <Image src={item.src} width={100} height={100}/>
                  </span>
							);
						})}
					</Descriptions.Item>
					<Descriptions.Item label={'尺寸标准'}>
						<Table size={'small'} scroll={{x: 900}} columns={columns} dataSource={data?.sizeMap?.sizeDetailList}/>
					</Descriptions.Item>
					<Descriptions.Item label={'尺寸副图'}>
						{ccftarr.map((item: any, index) => {
							return (
								<span
									key={index}
									style={{marginLeft: index === 0 ? 0 : 20}}
								>
                    <Image src={item.src} width={100} height={100}/>
                  </span>
							);
						})}
					</Descriptions.Item>
					<Descriptions.Item label={'物料报价'}>
						<h1 style={{margin: 0}}>物料报价:{wlbjz}</h1>
						<Tabs defaultActiveKey={tabKey} items={dataSourcePp.map((item: any, index: any) => {
							return ({
								key: index,
								label: item.properties,
								children: (
									tabKey === index && <div>
                      <Table
                          size={'small'}
                          columns={columnsWl}
                          dataSource={dataSourcePp[tabKey].materialDetailList}
                          scroll={{x: 900}}
                          pagination={false}
                      />
                  </div>
								)
							})
						})} onChange={(key: string) => {
							setTabKey(key);
						}}/>
					</Descriptions.Item>
					<Descriptions.Item label={'工艺报价'}>
						<h1 style={{margin: 0}}>工艺报价:{gybjz}</h1>
						<div>裁剪要求：{data?.craftMap?.clippingRequest}</div>
						<div>后道工序：{data?.craftMap?.followingProcess}</div>
						<div>工艺指示：{data?.craftMap?.acceptanceStandard}</div>
						<Table
							size={'small'}
							columns={columnsGy}
							dataSource={dataSourceGy}
							scroll={{x: 900}}
							pagination={false}
						/>
					</Descriptions.Item>
					<Descriptions.Item label={'其他报价'}>
						<RepeatTable
							columns={columnsQt}
							dataSource={dataSourceQt}
							setData={setDataSourceQt}
						/>
					</Descriptions.Item>
					<Descriptions.Item label={'汇总报价'}>
						<Table
							size={'small'}
							scroll={{x: 900}}
							columns={columnsHz}
							dataSource={data?.itemSkuList}
							pagination={false}
						/>
					</Descriptions.Item>
				</Descriptions>
			</ProCard>
			<BottomButton onOk={submit}/>
		</div>
	);
}

export default QuotationEdit;