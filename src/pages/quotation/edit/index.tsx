import {ProCard, ProForm} from '@ant-design/pro-components';
import GoodImgEditCheck from '@/components/goodImgEditCheck';
import {
	Button,
	Descriptions,
	Image,
	Input,
	InputNumber, message,
	Select,
	Space,
	Table,
	Tabs,
} from 'antd';
import {useEffect, useState} from 'react';
import RepeatTable from '@/pages/quotation/components/repeatTable';
import BottomButton from '@/components/bottomButton';
import {queryById, updateById} from '@/pages/quotation/apis';
import {useParams} from '@@/exports';
import _ from 'lodash';
import './index.less'
import {history} from "umi";

const {Option} = Select

function QuotationEdit() {
	const params = useParams();
	const [data, setData] = useState({}) as any;
	const [wlbjz, setWlbjz] = useState('')
	const [gybjz, setGybjz] = useState('')
	const [huizong, setHuizong] = useState('')
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
						precision={2}
						value={recode.dj}
						min={0}
						onChange={(e) => {
							const NewArr = [...dataSourcePp[tabKey]?.materialDetailList];
							NewArr[index].dj = e;
							const da = [...dataSourcePp]
							da[tabKey].materialDetailList = NewArr
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
						precision={2}
						value={recode.gydj}
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
			render: (i: any, recode: any, index: number) => {
				return (
					<Select
						style={{width: 200}}
						value={recode.bjsxgg}
						onChange={(e) => {
							const NewArr = [...dataSourceQt];
							const info = NewArr[index]
							NewArr[index].bjsxgg = e
							setDataSourceQt(NewArr);
							const asd = NewArr.filter(item => item.bjsxgg === recode.bjsxgg)
							const qthz = Number(info.jsdj || 0) * Number(info.sysl || 0)
							info.qthz = qthz
							const sumby = _.sumBy(asd, 'qthz')
							zongHz('qitahuizong', sumby, recode.bjsxgg)
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
						precision={2}
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
			render: (_, recode: any) => {
				return recode.qthz
			}
		},
		{
			title: '操作',
			align: 'center',
			render: (i: any, recode: any, index: number) => {
				return (
					<a
						onClick={() => {
							const NewArr = [...dataSourceQt];
							const info = NewArr[index]
							NewArr.splice(index, 1);
							const asd = NewArr.filter(item => item.bjsxgg === recode.bjsxgg)
							const qthz = Number(info.jsdj || 0) * Number(info.sysl || 0)
							info.qthz = qthz
							const sumby = _.sumBy(asd, 'qthz')
							zongHz('qitahuizong', sumby, recode.bjsxgg)
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
			render: (_: any, recode: any) => {
				return recode.wuliaohuizong
			}
		},
		{
			title: '工艺报价',
			align: 'center',
			dataIndex: 'gyhuizong',

		},
		{
			title: '其他报价',
			align: 'center',
			dataIndex: 'qitahuizong',
		},
		{
			title: '汇总',
			align: 'center',
			dataIndex: 'huizong',
		},
	];
	useEffect(() => {
		queryListAll()
	}, []);
	const wuL = (index: any) => {
		const NewArr = [...dataSourcePp[tabKey]?.materialDetailList];
		const da = NewArr[index]
		da.wlhz = _.ceil((Number(da.dj || 0) * Number(da.skuyl || 0)) / (Number(da.shl || 0) / 100), 2)
		const sumby = _.sumBy(NewArr, 'wlhz')
		const datas = [...dataSourcePp]
		datas[tabKey].materialDetailList = NewArr
		datas[tabKey].hz = sumby
		const minby = _.ceil(_.minBy(datas, 'hz').hz, 2)
		const maxby = _.ceil(_.maxBy(datas, 'hz').hz, 2)
		datas[tabKey].minby = minby
		datas[tabKey].maxby = maxby
		setWlbjz(`${minby}-${maxby}`)
		zongHz('wuliaohuizong', sumby,)
		setDataSourcePp(datas);
	}
	const queryListAll = async () => {
		const res = await queryById({id: params.id})
		const entry = res.entry
		const gy = _.cloneDeep(entry?.craftMap?.workmanshipDetailList)
		const wll = _.cloneDeep(entry?.materialMap?.skuMaterialList)
		const wl = _.cloneDeep(entry?.materialMap?.skuMaterialList)
		const qt = _.cloneDeep(entry?.otherMap?.ohterList)
		entry.itemSkuList = entry?.goodsInfoMap?.goodsInfoList
		setGybjz(entry.craftPrice)
		setWlbjz(entry.materialPrice)
		setDataSourcePp(wl)
		setDataSourceGy(gy)
		setData(entry)
		setDataSourceQt(qt)
		setWuTabItems(wll)
	}
	const gongY = (index: any) => {
		const NewArr = [...dataSourceGy];
		const da = NewArr[index]
		da.gyhz = Number(da.gydj || 0)
		const sumby = _.sumBy(NewArr, 'gyhz')
		setGybjz(`${sumby}`)
		setDataSourceGy(NewArr);
		zongHz('gyhuizong', sumby)
	}
	const qiT = (index: any, select = false) => {
		const NewArr = [...dataSourceQt];
		const da: any = NewArr[index]
		const asd = NewArr.filter(item => item.bjsxgg === da.bjsxgg)
		const qthz = Number(da.jsdj || 0) * Number(da.sysl || 0)
		da.qthz = qthz
		const sumby = _.sumBy(asd, 'qthz')
		zongHz('qitahuizong', sumby, da?.bjsxgg,)
		setDataSourceQt(NewArr);
	}
	// 整个汇总
	const zongHz = (lable: any, value: any, sku?: any) => {
		let d = {...data}
		if (lable === 'gyhuizong') {
			const a = d.itemSkuList.map((item: any) => {
				return {
					...item,
					[lable]: value
				}
			})
			d.itemSkuList = a
		} else if (lable === 'qitahuizong') {
			console.log(d.itemSkuList, dataSourceQt, 'd.itemSkuList')
			console.log(Number(sku), 'Number(sku)')
			const a = d.itemSkuList.map((item: any) => {
				console.log(item, 'item')
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
			d.itemSkuList = a
		} else {
			const a = d.itemSkuList[tabKey]
			a[lable] = value
		}
		const asd = d?.itemSkuList?.map((item: any) => {
			const huizong = _.ceil(Number(item?.gyhuizong || 0)
				+ Number(item?.qitahuizong || 0)
				+ Number(item?.wuliaohuizong || 0), 2)
			return ({
				...item,
				huizong: huizong
			})
		})

		const minbyhuizong = _.minBy(asd, 'huizong').huizong
		const maxbyhuizong = _.maxBy(asd, 'huizong').huizong
		setHuizong(`${minbyhuizong}-${maxbyhuizong}`)
		d.itemSkuList = asd
		setData(d)
	}
	// 汇总提交表单
	const submit = () => {
		console.log(dataSourcePp, 'dataWl');
		console.log(dataSourceGy, 'dataGy');
		console.log(dataSourceQt, 'dataQt');
		console.log(data, 'data');
		let arg0: any = {
			...data,
			craftMap: {
				...data.craftMap,
				workmanshipDetailList: dataSourceGy
			},
			otherMap: {
				ohterList: dataSourceQt
			},
			materialMap: {
				...data.materialMap,
				skuMaterialList: dataSourcePp
			},
			goodsInfoMap: {
				...data.goodsInfoMap,
				goodsInfoList: data.itemSkuList
			},
			materialPrice: wlbjz,
			craftPrice: gybjz,
			sumPrice: huizong
		}
		console.log(arg0, 'arg0')
		updateById(arg0).then(res => {
			if (res.success) {
				message.success('成功')
				history.push('/quotation/list')
			}
		})
	};
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
