import {ProCard, ProForm} from '@ant-design/pro-components';
import GoodImgEditCheck from '@/components/goodImgEditCheck';
import {
	Button,
	Descriptions,
	Image,
	Input,
	InputNumber,
	Space,
	Table,
} from 'antd';
import {useEffect, useState} from 'react';
import RepeatTable from '@/pages/quotation/components/repeatTable';
import BottomButton from '@/components/bottomButton';
import {queryById} from '@/pages/quotation/apis';
import {useParams} from '@@/exports';
import _ from 'lodash';
import './index.less'

function QuotationEdit() {
	const params = useParams();
	const [data, setData] = useState({}) as any;
	const [wlbjz, setWlbjz] = useState('')
	const [gybjz, setGybjz] = useState('')
	// 物料列表主数据
	const [dataSourceWl, setDataSourceWl] = useState([
		{
			wllx: 1,
			gys: 2,
			wlbh: 3,
			sybw: '牛',
		},
		{
			wllx: 1,
			gys: 2,
			wlbh: 3,
			sybw: '牛',
		},
		{
			wllx: 1,
			gys: 2,
			wlbh: 3,
			sybw: '牛',
		},
	]) as any;
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
	// 汇总列表主数据
	const [dataSourceHz, setDataSourceHz] = useState([
		{
			gg: 1,
			wlbj: 2,
			gybj: '牛',
		},
		{
			gg: 1,
			wlbj: 2,
			gybj: '牛',
		},
		{
			gg: 1,
			wlbj: 2,
			gybj: '牛',
		},
	]) as any;
	// 其他列表主数据
	const [dataSourceQt, setDataSourceQt] = useState([]) as any;
	// 图样附图
	const arr = data?.images?.length > 0 ? data?.images.map((item: any) => ({src: item})) : []
	// 其他附件
	const qtarr = data?.accessoryFiles?.length > 0 ? data?.accessoryFiles.map((item: any) => ({src: item})) : []
	// 尺寸附图
	const ccftarr = data?.workmanshipImages?.length > 0 ? data?.workmanshipImages.map((item: any) => ({src: item})) : []
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
						min={0}
						onChange={(e) => {
							const NewArr = [...dataSourceWl];
							NewArr[index].dj = e;
							setDataSourceWl(NewArr);
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
						onChange={(e) => {
							const NewArr = [...dataSourceWl];
							NewArr[index].skuyl = e;
							setDataSourceWl(NewArr);
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
						onChange={(e) => {
							const NewArr = [...dataSourceWl];
							NewArr[index].shl = e;
							setDataSourceWl(NewArr);
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
			title: '计算单位',
			align: 'center',
			dataIndex: 'jsdw',
			width: 100,
			render: (_: any, recode: any, index: number) => {
				return (
					<Input
						value={recode.jsdw}
						onChange={(e) => {
							const NewArr = [...dataSourceQt];
							NewArr[index].jsdw = e.target.value;
							setDataSourceQt(NewArr);
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
						}}
					/>
				);
			},
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
			dataIndex: 'gg',
		},
		{
			title: '物料报价',
			align: 'center',
			dataIndex: 'wlbj',
		},
		{
			title: '工艺报价',
			align: 'center',
			dataIndex: 'gybj',
		},
		{
			title: '其他报价',
			align: 'center',
			dataIndex: 'qtbj',
		},
	];
	useEffect(() => {
		queryById({id: params.id}).then((res) => {
			const entry = JSON.parse(res.entry.extra || '')
			console.log(entry, 'entry')
			setDataSourceWl(entry.materialDetailList)
			setDataSourceGy(entry.workmanshipDetailList)
			setData(entry)
		});
	}, []);
	const wuL = (index: any) => {
		const NewArr = [...dataSourceWl];
		const da = NewArr[index]
		da.wlhz = (Number(da.dj || 0) * Number(da.skuyl || 0)) * (Number(da.shl || 0) / 100);
		const minby = _.minBy(NewArr, 'wlhz').wlhz
		const maxby = _.maxBy(NewArr, 'wlhz').wlhz
		console.log(minby, maxby)
		setWlbjz(`${minby}元~${maxby}元`)
		setDataSourceWl(NewArr);
	}
	const gongY = (index: any) => {
		const NewArr = [...dataSourceGy];
		const da = NewArr[index]
		da.gyhz = Number(da.gydj || 0)
		const minby = _.minBy(NewArr, 'gyhz').gyhz
		const maxby = _.maxBy(NewArr, 'gyhz').gyhz
		console.log(minby, maxby)
		setGybjz(`${minby}元~${maxby}元`)
		setDataSourceGy(NewArr);
	}
	// 汇总提交表单
	const submit = () => {
		console.log(dataSourceWl, 'dataWl');
		console.log(dataSourceGy, 'dataGy');
	};

	return (
		<div className={'edit-quo'}>
			<ProCard>
				<GoodImgEditCheck/>
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
						<Table size={'small'} scroll={{x: 900}} columns={columns} dataSource={data.sizeDetailList}/>
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
						<Table
							size={'small'}
							columns={columnsWl}
							dataSource={dataSourceWl}
							scroll={{x: 900}}
							pagination={false}
						/>
					</Descriptions.Item>
					<Descriptions.Item label={'工艺报价'}>
						<h1 style={{margin: 0}}>工艺报价:{gybjz}</h1>
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
							dataSource={dataSourceHz}
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
