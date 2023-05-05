import GoodsTableCol from '@/components/goodsTableCol';
import Images from '@/components/Image';
import { winOpen } from '@/utils/index';
import { Table } from 'antd';
import React from 'react';

import styless from './index.less';

interface propsType {
  dataSource: any;
}

const OrderColumns: React.FC<propsType> = ({ dataSource }) => {
  return (
    <Table
      scroll={{ x: 'max-content', y: '300px' }}
      rowKey="itemId"
      columns={[
        {
          title: '',
          dataIndex: 'itemInfoVOList',
          width: 330,
          render: (_: any, info: any) => {
            return (
              <div className={styless.imageBox}>
                <div className={styless.imageStyle}>
                  <Images
                    previewGroup={info.itemImageList}
                    src={
                      info.itemImageList &&
                      info.itemImageList?.length > 0 &&
                      info.itemImageList[0]
                    }
                    width={40}
                    height={40}
                    alt=""
                  />
                </div>

                <GoodsTableCol
                  isMainImg={false}
                  isFooterImg={false}
                  infoList={[
                    {
                      title: '商品编码',
                      key: (
                        <span
                          className={styless.v}
                          onClick={() =>
                            winOpen(`/goods/detail/${info.itemId}`)
                          }
                        >
                          {info.ksItemCode}
                        </span>
                      ),
                    },
                    {
                      title: '商品ID',
                      key: info.ksItemId,
                    },
                    {
                      title: '平台单号',
                      key: info.orderNumber,
                    },
                  ]}
                />
              </div>
            );
          },
        },
        {
          title: '',
          dataIndex: 'itemInfoVOListVOList',
          width: 200,
          render: (_: any, info: any) => {
            return (
              <GoodsTableCol
                isMainImg={false}
                isFooterImg={false}
                infoList={[
                  {
                    title: '名称',
                    key: (
                      <span>
                        {info.gift && (
                          <span
                            style={{
                              color: '#dd3648',
                              marginRight: 5,
                              fontSize: 12,
                              fontWeight: 'bold',
                            }}
                          >
                            赠
                          </span>
                        )}

                        {info.title}
                      </span>
                    ),
                  },
                ]}
              />
            );
          },
        },
        {
          title: '',
          dataIndex: 'itemInfoVOList',
          width: 220,
          render: (_: any, info: any) => {
            return (
              <GoodsTableCol
                isMainImg={false}
                isFooterImg={false}
                infoList={[
                  {
                    title: '规格',
                    key: info.specification,
                  },
                  {
                    title: '数量',
                    key: info.number,
                  },
                ]}
              />
            );
          },
        },
      ]}
      showHeader={false}
      footer={undefined}
      dataSource={dataSource || []}
      rowKey="itemId"
      pagination={false}
      className={styless.tabColumns}
    />
  );
};

export default OrderColumns;
