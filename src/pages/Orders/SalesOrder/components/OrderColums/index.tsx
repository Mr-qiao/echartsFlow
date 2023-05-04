import { Descriptions, Table, Typography } from 'antd';
import React from 'react';

import Images from '@/components/Image';
import { winOpen } from '@/utils/index';

import styless from './index.less';

interface propsType {
  dataSource: any;
}

const OrderColumns: React.FC<propsType> = ({ dataSource }) => {
  const itemDescriptions = (key: string, val: any) => (
    <Descriptions.Item label={key} labelStyle={{ fontSize: 13 }}>
      <Typography.Paragraph
        ellipsis={{ rows: 1, tooltip: true }}
        style={{ margin: 0, fontSize: 13 }}
      >
        {val || '-'}
      </Typography.Paragraph>
    </Descriptions.Item>
  );

  return (
    <Table
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

                <div className={`u-fs13 ${styless.imageTitle}`}>
                  <div className={styless.f}>
                    <span>商品编码：</span>
                    <span
                      className={styless.v}
                      onClick={() => winOpen(`/goods/detail/${info.itemId}`)}
                    >
                      {info.ksItemCode}
                    </span>
                  </div>
                  <div className={styless.f}>
                    <span>商品ID：</span>
                    <span>{info.ksItemId}</span>
                  </div>
                  <div className={styless.f}>
                    <span>平台单号：</span>
                    <span>{info.orderNumber}</span>
                  </div>
                </div>
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
              <Descriptions column={1}>
                {/* {itemDescriptions('主播', info.anchorNickname)} */}
                {itemDescriptions(
                  '名称',
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
                  </span>,
                )}
              </Descriptions>
            );
          },
        },
        {
          title: '',
          dataIndex: 'itemInfoVOList',
          width: 220,
          render: (_: any, info: any) => {
            return (
              <Descriptions column={1}>
                {itemDescriptions('规格', info.specification)}
                {itemDescriptions('数量', info.number)}
                {itemDescriptions('金额', info.money)}
              </Descriptions>
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
