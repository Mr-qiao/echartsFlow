import './index.less';

import { math } from '@xlion/utils';
import { Col, Row, Table } from 'antd';
import { groupBy } from 'lodash-es';
import React, { useEffect, useState } from 'react';

import Image from '@/components/Image';
import { formatPriceRange, formatRatioRange } from '@/pages/goods/Info/utils';
import { transformFen2Yuan } from '@/utils';

import { useParams } from '@umijs/max';
import { AttrTypes } from '../Create/constant';
import Api from '../services';

const GoodsInfo = React.forwardRef(({ isSupplier = true }: any, ref) => {
  const { id } = useParams();

  const [detail, setDetail] = useState<any>({});
  const [dynProps, setDynProps] = useState<any[]>([]);
  const [skus, setSkus] = useState<any[]>([]);

  const columns = [
    {
      title: '规格信息',
      dataIndex: 'name',
      width: 300,
      render: (item, record) => {
        return (
          <div className="u-f__center" style={{ justifyContent: 'flex-start' }}>
            <Image
              width={90}
              height={90}
              src={
                Array.isArray(record.images) &&
                record.images.length > 0 &&
                record.images[0]
              }
            />
            <div className="u-ml10" style={{ width: 'calc(100% - 100px)' }}>
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
              {record.itemPrice.originPrice || '-'}
            </p>
            <p className="u-fs12 u-mb5">
              <span className="u-c888">参考销售价：</span>
              {record.itemPrice.salePrice || '-'}
            </p>
            <p className="u-fs12 u-mb5">
              <span className="u-c888">预计直播价：</span>
              {record.itemPrice.estimateLivePrice || '-'}
            </p>
            {/* 注意！！！！！！！ 【供应商 采购成本价】和 【款式商品 采购成本价】字段不一致！！！！！！！！！ */}
            {isSupplier ? (
              /* purchaseCostPrice*/
              <p className="u-fs12 ">
                <span className="u-c888">采购成本价：</span>
                {record?.itemPrice?.purchaseCostPrice || '-'}
              </p>
            ) : (
              /* supplyPrice*/
              <p className="u-fs12 ">
                <span className="u-c888">采购成本价：</span>
                {record?.itemPrice?.supplyPrice || '-'}
              </p>
            )}
          </div>
        );
      },
    },
    {
      title: '佣金',
      dataIndex: 'thirdId',
      width: 180,
      render: (item, record) => {
        console.log(record, 'record');
        return (
          <div className="u-ml10">
            <p className="u-fs12 u-mb5">
              <span className="u-c888">预计佣金比例：</span>
              {`${
                record?.itemPrice?.commissionRatio === 0
                  ? 0
                  : record?.itemPrice?.commissionRatio
              }%` || '-'}
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
    return Api.Goods.Detail({ itemId }).then(({ entry }) => {
      const {
        item: baseInfo,
        baseProperties,
        otherViewProperties,
        skus = [],
      } = entry;
      let data: any = {
        ...baseInfo,
        mainImg: baseInfo.images?.[0] || '',
        estimateLivePriceRange: formatPriceRange(
          otherViewProperties.refEstimateLivePrice,
        ),
        originPriceRange: formatPriceRange(otherViewProperties.refOriginPrice),
        salePriceRange: formatPriceRange(otherViewProperties.refSalePrice),
        supplyPriceRange: formatPriceRange(otherViewProperties.refSupplyPrice),
        commissionRatioRange: formatRatioRange(
          otherViewProperties.refCommissionRatio,
        ),
      };
      //动态属性
      setDynProps(
        groupBy(
          baseProperties.sort((a, b) => a.order - b.order),
          (item) => {
            return item.bizGroupName;
          },
        ),
      );
      setDetail({
        ...data,
        baseProperties: baseProperties?.reduce((acc: Recordable<any>, cur) => {
          let value: any;
          if (Array.isArray(cur.categoryPropertyValues)) {
            switch (cur.type) {
              case AttrTypes.TEXT:
              case AttrTypes.NUMBER:
              case AttrTypes.TEXTAREA:
              case AttrTypes.DATE:
                value = cur.categoryPropertyValues[0];
                break;
              case AttrTypes.SELECT:
              case AttrTypes.MULTIPLE_SELECT:
                value =
                  cur.propertySelectValues
                    .map((itm: any) =>
                      cur.categoryPropertyValues.includes(`${itm.valueId}`)
                        ? itm.value
                        : false,
                    )
                    .filter(Boolean)
                    .join('；') || '-';
                break;
              case AttrTypes.DATE_RANGE:
              case AttrTypes.NUMBER_RANGE:
                value = cur.categoryPropertyValues.join(' - ') || '-';
                break;
              default:
                value = cur.categoryPropertyValues;
            }
          }
          acc[cur.categoryPropertyCode] = value || '-';
          return acc;
        }, {}),
      });

      //sku值
      setSkus(() =>
        skus.map((sku: any) => ({
          ...sku,
          itemPrice: {
            ...transformFen2Yuan(sku.itemPrice, [
              'originPrice',
              'salePrice',
              'estimateLivePrice',
              'supplyPrice',
            ]),
            commissionRatio: math.div(sku?.itemPrice?.commissionRatio, 100),
            purchaseCostPrice: math.div(
              sku?.itemPrice?.purchaseCostPrice,
              1000,
            ),
          },
        })),
      );
    });
  }

  return (
    <div className="goods__detail-wrap">
      <Row className="u-w100">
        <Col>
          <Image
            width={200}
            height={200}
            src={detail?.mainImg}
            style={{ borderRadius: 10 }}
          />
          <div className="u-flex u-mt10">
            {detail.images
              ?.filter((item: any, i: number) => i !== 0 && i <= 3)
              ?.map((item: any, i: number) => {
                return (
                  <Image
                    key={i}
                    width={60}
                    height={60}
                    src={item}
                    style={{ borderRadius: 10 }}
                  />
                );
              })}
          </div>
        </Col>
        <Col span={18}>
          <div className="u-ml20">
            <div className="u-f__start u-els u-w70">
              <p className="u-els u-fs16 u-fw700 u-mt10 u-mb10">
                {detail.title}
              </p>
              {/* {detail.online && ( */}
              {/*<Tag color={dictColor(detail.online, 'ONLINE_OR_OFFLINE')} className="u-ml10">*/}
              {/*	{dict(detail.online, 'ONLINE_OR_OFFLINE')}*/}
              {/*</Tag>*/}
              {/* )} */}
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
                  {detail.supplierStyleCode || '-'}
                </p>
              </Col>
              <Col span={12}>
                <p>
                  <span className="u-c888">品牌信息（英文）：</span>
                  {detail.brandNameEn || '-'}
                </p>
              </Col>
              <Col span={12}>
                <p className="u-flex ">
                  <span className="u-c888">类目：</span>
                  {Array.isArray(detail.categoryNames) ? (
                    <span className="u-els" style={{ flex: 1 }}>
                      {detail.categoryNames?.join(' / ')}
                    </span>
                  ) : (
                    '-'
                  )}
                </p>
              </Col>

              <Col span={12}>
                <p>
                  <span className="u-c888">参考销售价：</span>
                  {detail.salePriceRange}
                </p>
              </Col>
              <Col span={12}>
                <p>
                  <span className="u-c888">69码：</span>
                  {detail.snCode}
                </p>
              </Col>
              {/*<Col span={12}>*/}
              {/*	<p>*/}
              {/*		<span className="u-c888">参考供货价：</span>*/}
              {/*		{detail.supplyPriceRange}*/}
              {/*	</p>*/}
              {/*</Col>*/}
              <Col span={12}>
                <p>
                  <span className="u-c888">来源：</span>
                  成衣款
                </p>
              </Col>
              <Col span={12}>
                <p>
                  <span className="u-c888">预计佣金比例：</span>
                  {detail.commissionRatioRange}
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
                  <span className="u-c888">商品详情：</span>
                  <div className="u-flex u-mt10">
                    {detail.contents
                      ?.filter((item: any, i: number) => i !== 0 && i <= 3)
                      ?.map((item: any, i: number) => {
                        return (
                          <Image
                            key={i}
                            width={60}
                            height={60}
                            src={item.image}
                            style={{ borderRadius: 10 }}
                          />
                        );
                      })}
                  </div>
                </p>
              </Col> */}

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

              {renderDynProps(true)}
              {/* {detail.sellPoint && ( */}

              {/* )} */}
            </Row>
          </div>
        </Col>

        <React.Fragment>
          <Col span={24}>
            <h1>商品详情：</h1>
          </Col>
          <Row gutter={[16, 10]} className="u-w100">
            <Col span={24}>
              <div className="u-flex u-mt10">
                {detail.contents?.map((item: any, i: number) => {
                  return (
                    <div className="u-ml10" key={i}>
                      <Image
                        width={60}
                        height={60}
                        src={item?.image}
                        style={{ borderRadius: 10 }}
                      />
                    </div>
                  );
                })}
              </div>
            </Col>
          </Row>
        </React.Fragment>

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
      rules: [{ required: attr.required === 1 ? true : false }],
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
    const attrGroupKeys = Object.keys(dynProps).filter(
      (key) => key !== '基本信息',
    );
    if (attrGroupKeys.length === 0) return null;

    return attrGroupKeys.map((key, idx: number) => {
      if (isBaseProps) {
        return dynProps[key].map((item: any) => (
          <Col key={item.categoryPropertyName} span={12}>
            {renderAttrItem(item)}
          </Col>
        ));
      }
      return (
        <React.Fragment key={idx}>
          <Col span={24}>
            <h1>{key}</h1>
          </Col>
          <Row gutter={[16, 10]} className="u-w100">
            {dynProps[key].map((item: any) => (
              <Col key={item.categoryPropertyName} span={12}>
                {renderAttrItem(item)}
              </Col>
            ))}
          </Row>
        </React.Fragment>
      );
    });
  }
});
export default GoodsInfo;
