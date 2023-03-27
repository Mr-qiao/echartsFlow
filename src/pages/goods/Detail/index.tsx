import './index.less';

import {Col, Image, Row, Table, Tag} from 'antd';
import {groupBy} from 'lodash-es';
import moment from 'moment';
import React, {useEffect, useState} from 'react';

import {dict, dictColor} from '@/utils';

import {AttrTypes} from '../Create/constant';
import Api from '../services';
import {useParams} from "@umijs/max";

let fallback =
	'data:image/png;base64,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';

const columns = [
	{
		title: '规格信息',
		dataIndex: 'name',
		width: 300,
		render: (item, record) => {
			return (
				<div className="u-f__center" style={{justifyContent: 'flex-start'}}>
					<Image
						width={90}
						height={90}
						src={Array.isArray(record.images) && record.images.length > 0 && record.images[0]}
					/>
					<div className="u-ml10" style={{width: 'calc(100% - 100px)'}}>
						<p className="u-fs12 u-mb5">
							<span className="u-c888">规格：</span>
							{record.properties || '-'}
						</p>
						<p className="u-fs12 u-mb5">
							<span className="u-c888">sku编码：</span>
							{record.sysSkuCode || '-'}
						</p>
						<p className="u-fs12 u-mb5">
							<span className="u-c888">sku商家编码：</span>
							{record.skuCode || '-'}
						</p>
						<p className="u-fs12 u-mb5">
							<span className="u-c888">渠道销售sku编码：</span>
							{record.outsideSkuCode || '-'}
						</p>
					</div>
				</div>
			);
		},
	},
	{
		title: '价格（元）',
		dataIndex: 'thirdId',
		width: 180,
		render: (item, record) => {
			return (
				<div className="u-ml10">
					<p className="u-fs12 u-mb5">
						<span className="u-c888">吊牌价：</span>
						{record.originPrice || '-'}
					</p>
					<p className="u-fs12 u-mb5">
						<span className="u-c888">参考销售价：</span>
						{record.salePrice || '-'}
					</p>
					<p className="u-fs12 ">
						<span className="u-c888">预计直播价：</span>
						{record.estimateLivePrice || '-'}
					</p>
					<p className="u-fs12 ">
						<span className="u-c888">供货价：</span>
						{record?.itemPrice?.supplyPrice || '-'}
					</p>
				</div>
			);
		},
	},
	{
		title: '库存',
		dataIndex: 'thirdId',
		width: 180,
		render: (item, record) => {
			let stock = record?.invSku?.stock || 0;
			let lockStock = record?.invSku?.lockStock || 0;
			let val = stock - lockStock;
			return (
				<div className="u-ml10">
					<p className="u-fs12 u-mb5">
						<span className="u-c888">现货库存：</span>
						{stock}
					</p>
					<p className="u-fs12 u-mb5">
						<span className="u-c888">锁定库存：</span>
						{lockStock}
					</p>
					<p className="u-fs12 ">
						<span className="u-c888">可用库存：</span>
						{val}
					</p>
				</div>
			);
		},
	},
];
const GoodsInfo = React.forwardRef((props: any, ref) => {
	const {id} = useParams();

	const [detail, setDetail] = useState<any>({});
	const [dynProps, setDynProps] = useState<any[]>([]);
	const [skus, setSkus] = useState<any[]>([]);
	React.useImperativeHandle(ref, () => ({
		reload: () => {
			getGoodsDetail(id);
		},
	}));

	useEffect(() => {
		// console.log(id);
		getGoodsDetail(id);
	}, [id]);

	//获取商品信息
	async function getGoodsDetail(itemId: any) {
		return Api.Goods.Detail({itemId}).then(({entry}) => {
			let data: any = {
				...entry.item,
				refSalePrice: entry.refSalePrice,
				refSupplyPrice: entry.refSupplyPrice,
				refCommissionRatio: entry.refCommissionRatio,
			};
			if (data.images && data.images.length > 0) {
				data.mainImg = data.images[0];
			} else {
				data.mainImg = '';
			}
			//动态属性

			setDynProps(
				groupBy(
					entry?.baseProperties.sort((a, b) => a.order - b.order),
					(item) => {
						return item.bizGroupName;
					},
				),
			);
			setDetail({
				...data,
				baseProperties: entry.baseProperties?.reduce((acc: Recordable<any>, cur) => {
					let value: any;
					if (Array.isArray(cur.categoryPropertyValues)) {
						switch (cur.type) {
							case AttrTypes.TEXT:
							case AttrTypes.NUMBER:
							case AttrTypes.SELECT:
							case AttrTypes.TEXTAREA:
								value = cur.categoryPropertyValues[0];
								break;
							case AttrTypes.DATE:
								value = moment(cur.categoryPropertyValues[0]);
								break;
							case AttrTypes.DATE_RANGE:
								value = value.map((item: string) => moment(item));
								break;
							default:
								value = cur.categoryPropertyValues;
						}
					}
					acc[cur.categoryPropertyCode] = value;
					return acc;
				}, {}),
			});

			//sku值
			setSkus(entry?.skus);
		});
	}

	return (
		<div className="goods__detail-wrap">
			<Row className="u-w100">
				<Col>
					<Image width={200} height={200} src={detail?.mainImg} fallback={fallback} style={{borderRadius: 10}}/>
					<div className="u-flex u-mt10">
						{detail.images?.map((item, i) => {
							if (i === 0) return '';
							if (i > 3) return ''
							return (
								<Image key={i} width={60} height={60} src={item} fallback={fallback} style={{borderRadius: 10}}/>
							);
						})}
					</div>
				</Col>
				<Col span={18}>
					<div className="u-ml20">
						<div className="u-f__start u-els u-w70">
							<p className="u-els u-fs16 u-fw700 u-mt10 u-mb10">{detail.title}</p>
							{detail.online}
							<Tag color={dictColor(detail.online, 'ONLINE_OR_OFFLINE')} className="u-ml10">
								{dict(detail.online, 'ONLINE_OR_OFFLINE')}
							</Tag>
						</div>
						<Row className="goods__info-wrap" gutter={[16, 8]}>
							<Col span={12}>
								<p>
									<span className="u-c888">款式编码：</span>
									{detail.sysItemCode}
								</p>
							</Col>
							<Col span={12}>
								<p>
									<span className="u-c888">品牌信息（中文）：</span>
									{detail.brandName}
								</p>
							</Col>
							<Col span={12}>
								<p>
									<span className="u-c888">商家款式编码：</span>
									{detail.itemCode}
								</p>
							</Col>
							<Col span={12}>
								<p>
									<span className="u-c888">品牌信息（英文）：</span>
									{detail.brandNameEn}
								</p>
							</Col>
							<Col span={12}>
								<p>
									<span className="u-c888">类目：</span>
									{detail.categoryName}
								</p>
							</Col>

							<Col span={12}>
								<p>
									<span className="u-c888">采购价：</span>
									{detail?.refSalePrice?.left || 0}-{detail?.refSalePrice?.right || 0}元
								</p>
							</Col>
							<Col span={12}>
								<p>
									<span className="u-c888">69码：</span>
									{detail.snCode}
								</p>
							</Col>
							<Col span={12}>
								<p>
									<span className="u-c888">供货参考价：</span>
									{detail?.refSupplyPrice?.left || 0}-{detail?.refSupplyPrice?.right || 0}元
								</p>
							</Col>
							<Col span={12}>
								<p>
									<span className="u-c888">来源：</span>
									成衣款
								</p>
							</Col>
							<Col span={12}>
								<p>
									<span className="u-c888">参考佣金比例：</span>
									{detail?.refCommissionRatio?.left || 0}%-{detail?.refCommissionRatio?.right || 0}%
								</p>
							</Col>
							<Col span={12}>
								<p>
									<span className="u-c888">渠道商品编码：</span>
									{detail.outsideItemCode}
								</p>
							</Col>

							{/* <Col span={12}>
                <p>
                  <span className="u-c888">销售平台渠道：</span>
                  {dict(detail.supplierStyleCode, 'LIVE_PLATFORM_TYPE')}
                </p>
              </Col> */}

							{/* <Col span={12}>
                <p className="u-els">
                  <span className="u-c888">在售链接：</span>
                  <a href={detail.supplierStyleCode}>{detail.supplierStyleCode}</a>
                </p>
              </Col> */}

							{detail.sellPoint && (
								<Col span={24}>
									<p>
										<span className="u-c888">卖点信息：</span>
										{detail.sellPoint}
									</p>
								</Col>
							)}
						</Row>
					</div>
				</Col>
				{renderDynProps()}

				<Col span={24}>
					<h1>SKU信息</h1>
				</Col>
				<Col span={24}>
					<Table columns={columns} dataSource={skus} rowKey={'skuId'}></Table>
				</Col>
			</Row>
		</div>
	);

	function renderAttrItem(attr: {
		type: number;
		required: 0 | 1;
		categoryPropertyCode: string;
		categoryPropertyName: string;
		unit: string;
		propertySelectValues: any[];
		value: any;
	}) {
		const props = {
			label: attr.categoryPropertyName,
			rules: [{required: attr.required === 1 ? true : false}],
			name: ['baseProperties', `${attr.categoryPropertyCode}`],
			preserve: false,
			value: detail.baseProperties[attr.categoryPropertyCode],
		};

		return (
			<p className="u-els" title={props.label}>
				<span className="u-c888">{props.label}：</span>
				{props.value}
			</p>
		);
	}

	function renderDynProps(isBaseProps = false) {
		if (isBaseProps && dynProps['基本信息']) {
			return dynProps['基本信息'].map((item: any) => (
				<Col key={item.categoryPropertyName} span={12}>
					{renderAttrItem(item)}
				</Col>
			));
		}
		const attrGroupKeys = Object.keys(dynProps).filter((key) => key !== '基本信息');
		if (attrGroupKeys.length === 0) return null;

		return attrGroupKeys.map((key) => {
			if (isBaseProps) {
				return dynProps[key].map((item: any) => (
					<Col key={item.categoryPropertyName} span={12}>
						{renderAttrItem(item)}
					</Col>
				));
			}
			return (
				<>
					<Col span={24}>
						<h1>商品属性</h1>
					</Col>
					<Row gutter={[16, 10]} className="u-w100">
						{dynProps[key].map((item: any) => (
							<Col key={item.categoryPropertyName} span={12}>
								{renderAttrItem(item)}
							</Col>
						))}
					</Row>
				</>
			);
		});
	}
});
export default GoodsInfo;
