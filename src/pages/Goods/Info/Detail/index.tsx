import './index.less';

import { math } from '@xlion/utils';
import { Col, Row, Spin, Table, Space } from 'antd';
import { groupBy } from 'lodash-es';
import { Descriptions, GlobalModal, Typography } from '@xlion/component';
import React, { useEffect, useState } from 'react';

import Image from '@/components/Image';
import { formatPriceRange, formatRatioRange, transformFen2Yuan } from '@/utils';

import { useParams } from '@umijs/max';
import { AttrTypes } from '../Create/constants';
// import Api from '../services';
import useColumns from './columns';
import { ModalType, MoreModal } from './components/MoreModal';
import dynamicProps from './DynamicProps';
import { saveViewByIdOnlyDetail } from '@/services/goods';

// import ss from './index.less'

const baseMoreCount = 4;

const GoodsInfo = React.forwardRef(({ id, isSupplier = false }: any, ref) => {
  // const { id } = useParams();

  const [detail, setDetail] = useState<any>({});
  const [dynProps, setDynProps] = useState<any[]>([]);
  const [skus, setSkus] = useState<any[]>([]);

  const [columns] = useColumns(isSupplier)


  //基础信息-查看更多
  const handleBaseMore = () => {
    GlobalModal.show(
      <MoreModal dataSource={dynProps['基本信息'].slice(baseMoreCount)} type={ModalType.BASE} />,
    );
  };

  //获取商品信息
  async function getGoodsDetail(itemId: any) {
    try {
      const { entry } = await saveViewByIdOnlyDetail({ itemId });

      const { item: baseInfo, itemPropertyList = [], skus = [], otherViewProperties = {} } = entry;
      let data: any = {
        ...baseInfo,
        mainImg: baseInfo.images?.[0] || '',
        estimateLivePriceRange: formatPriceRange(otherViewProperties.refEstimateLivePrice),
        originPriceRange: formatPriceRange(otherViewProperties.refOriginPrice),
        salePriceRange: formatPriceRange(otherViewProperties.refSalePrice),
        supplyPriceRange: formatPriceRange(otherViewProperties.refSupplyPrice),
        commissionRatioRange: formatRatioRange(otherViewProperties.refCommissionRatio),
      };
      const itemProperties = itemPropertyList?.reduce((acc: any, cur: any) => {
        return [...acc, ...cur.childList];
      }, []);
      //动态属性

      setDynProps(
        itemPropertyList?.reduce((acc: any, cur: any) => {
          acc[cur.groupName] = cur.childList;
          return acc;
        }, {}),
      );
      setDetail({
        ...data,
        baseProperties: itemProperties,
      });

      //sku值
      setSkus(() =>
        skus.map((sku) => ({
          ...sku,
          itemPrice: {
            ...transformFen2Yuan(sku.itemPrice || {}, [
              'originPrice',
              'salePrice',
              'estimateLivePrice',
              'supplyPrice',
              'purchaseCostPrice',
            ]),
            commissionRatio: math.div(sku?.itemPrice?.commissionRatio, 100),
          },
        })),
      );
    } catch (e) {
      console.log(e);
    }
  }

  //基本信息
  function renderBaseProps() {
    return dynProps['基本信息']
      ?.slice(0, baseMoreCount)
      ?.map((item, i) => {
        return <React.Fragment key={i}>{dynamicProps(item)}</React.Fragment>;
      })
      .concat([
        dynProps['基本信息']?.length > baseMoreCount && (
          <Descriptions.Item key="more">
            <Typography.Link onClick={handleBaseMore}>更多</Typography.Link>
          </Descriptions.Item>
        ),
      ]);
  }

  //除 基本 的其余信息
  function renderDynamicProps() {
    return Object.keys(dynProps)?.map((item) => {
      if (item === '基本信息') {
        return <React.Fragment key={item}></React.Fragment>;
      }
      return (
        <React.Fragment key={item}>
          <h1>{item === '未分组' ? '' : item}</h1>
          <Descriptions
            className="u-ml20"
            column={2}
            labelStyle={{ flexShrink: 0 }}
            contentStyle={{ flex: 1, width: 0, paddingRight: 20, flexDirection: 'column' }}
          >
            {dynProps[item]?.map((component, i) => {
              return <React.Fragment key={i}>{dynamicProps(component)}</React.Fragment>;
            })}
          </Descriptions>
        </React.Fragment>
      );
    });
  }


  React.useImperativeHandle(ref, () => ({
    reload: () => {
      getGoodsDetail(id);
    },
  }));

  useEffect(() => {
    getGoodsDetail(id);
  }, [id]);

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
              ?.filter((_item: any, i: number) => i !== 0 && i <= 3)
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

          <Descriptions
            title={detail.title}
            className="u-ml20"
            column={2}
            labelStyle={{ flexShrink: 0 }}
            contentStyle={{ flex: 1, width: 0, paddingRight: 20, flexDirection: 'column' }}
          >
            <Descriptions.Item label="款式编码"> {detail.sysItemCode}</Descriptions.Item>
            <Descriptions.Item label="品牌信息（中文）"> {detail.brandName}</Descriptions.Item>
            <Descriptions.Item label="商家款式编码">
              {detail.supplierStyleCode || '-'}
            </Descriptions.Item>
            <Descriptions.Item label="品牌信息（英文）">
              {detail.brandNameEn || '-'}
            </Descriptions.Item>
            {/* <Descriptions.Item label="供应商"> {detail.supplierName || '-'}</Descriptions.Item> */}
            <Descriptions.Item label="69码"> {detail.snCode || '-'}</Descriptions.Item>
            <Descriptions.Item label="类目">
              {Array.isArray(detail.categoryNames) ? (
                <span className="u-els" style={{ flex: 1 }}>
                  {detail.categoryNames?.join(' / ')}
                </span>
              ) : (
                '-'
              )}
            </Descriptions.Item>
            <Descriptions.Item label="参考销售价">{detail.salePriceRange}</Descriptions.Item>
            <Descriptions.Item label="来源">
              {detail.source === 8 ? '供应链中台商品' : '成衣款'}
            </Descriptions.Item>
            <Descriptions.Item label="预计佣金比例">
              {detail.commissionRatioRange}
            </Descriptions.Item>
            <Descriptions.Item label="渠道商品编码">
              {detail.outsideItemCode || '-'}
            </Descriptions.Item>
            {renderBaseProps()}

          </Descriptions>
        </Col>
        {detail.contents && detail?.contents.length > 0 && (
          <Col span={24}>
            {detail.contents && detail?.contents.length > 0 ? (
              <Space size={10}>
                {detail?.contents?.map((item, i) => {
                  return <Image width={80} height={80} key={i} src={item.image} />;
                })}
              </Space>
            ) : (
              <span> -</span>
            )}
          </Col>
        )}

      </Row>
      {renderDynamicProps()}
      <h1>SKU信息</h1>
      <Table columns={columns} dataSource={skus} rowKey={'skuId'}></Table>
    </div>
  );

});
export default GoodsInfo;
