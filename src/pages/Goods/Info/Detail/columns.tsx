import React from 'react';
import { Descriptions, GlobalModal, TableProps, Typography } from '@xlion/component';

import Image from '@/components/Image';

import { IPropsType } from '../Create/types';

import { ModalType, MoreModal } from './components/MoreModal';
import dynamicProps from './DynamicProps';

const tableMoreCount = 4;
function useColumns(isSupplier): [TableProps<IPropsType>['columns']] {
    //sku信息-查看更多
    const handleSkuMore = (dataSource) => {
        GlobalModal.show(<MoreModal dataSource={dataSource} type={ModalType.SKUS} />);
    };
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
                            src={Array.isArray(record.images) && record.images.length > 0 && record.images[0]}
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
            title: '价格/佣金',
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
                            <p className="u-fs12 u-mb5">
                                <span className="u-c888">采购成本价：</span>
                                {record?.itemPrice?.purchaseCostPrice || '-'}
                            </p>
                        ) : (
                            /*  3.30 编辑去掉supplyPrice，改为与供应商一致purchaseCostPrice*/
                            <p className="u-fs12 u-mb5">
                                <span className="u-c888">采购成本价：</span>
                                {record?.itemPrice?.purchaseCostPrice || '-'}
                            </p>
                        )}
                        <p className="u-fs12 u-mb5">
                            <span className="u-c888">预计佣金比例：</span>
                            {record.itemPrice.commissionRatio ? record.itemPrice.commissionRatio + '%' : '-'}
                        </p>
                    </div>
                );
            },
        },
        {
            title: '其他',
            dataIndex: 'skuPropertyInfos',
            width: 280,
            render: (_, record) => {
                const { skuPropertyInfos = [] } = record;
                return skuPropertyInfos?.length > 0 ? (
                    <Descriptions
                        column={1}
                        labelStyle={{ flexShrink: 0 }}
                        contentStyle={{ flex: 1, width: 0, paddingRight: 20, flexDirection: 'column' }}
                    >
                        {skuPropertyInfos
                            ?.slice(0, tableMoreCount)
                            ?.map((item, i) => {
                                return <React.Fragment key={i}>{dynamicProps(item)}</React.Fragment>;
                            })
                            .concat([
                                skuPropertyInfos.length > tableMoreCount && (
                                    <Descriptions.Item key="more" contentStyle={{ fontSize: 12 }}>
                                        <Typography.Link
                                            onClick={handleSkuMore.bind(null, skuPropertyInfos.slice(tableMoreCount))}
                                        >
                                            更多
                                        </Typography.Link>
                                    </Descriptions.Item>
                                ),
                            ])}
                    </Descriptions>
                ) : (
                    '-'
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

    return [columns];
}

export default useColumns;
