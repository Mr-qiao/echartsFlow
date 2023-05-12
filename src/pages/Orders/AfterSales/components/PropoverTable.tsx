import { Table, TableProps, Typography } from 'antd';

import Image from '@/components/Image';

import { GoodsInfoType } from '../types';

import ItemContainer from './ItemContainer';

const PropoverTable = ({ dataSource = [] }) => {
  const columns: TableProps<GoodsInfoType>['columns'] = [
    {
      title: '基本信息',
      dataIndex: 'properties',
      width: 320,
      render: (item, record) => {
        return (
          <>
            <div className="u-f__start">
              <div className="u-mr10">
                <Image src={record.pic} width={80} height={80}></Image>
              </div>

              <div>
                <ItemContainer
                  options={[
                    {
                      label: '商品编码',
                      value: <span className="t-c__blue">{record.skuId}</span>,
                    },
                    {
                      label: '商品ID',
                      value: record.shopSkuId,
                    },
                    {
                      label: '平台单号',
                      value: record.rawSoId,
                    },
                  ]}
                />
              </div>
            </div>
          </>
        );
      },
    },
    {
      title: '平台信息',
      dataIndex: 'lockStock',
      width: 280,
      render: (item, record) => {
        return (
          <ItemContainer
            options={[
              {
                label: '名称',
                value: (
                  <Typography.Paragraph
                    ellipsis={{ rows: 1, tooltip: true }}
                    style={{ margin: 0 }}
                  >
                    {record.name}
                  </Typography.Paragraph>
                ),
              },
            ]}
          />
        );
      },
    },
    {
      title: '规格',
      dataIndex: 'status',
      width: 180,
      render: (item, record) => {
        return (
          <ItemContainer
            options={[
              { label: '规格', value: record.propertiesValue },
              { label: '退款数量', value: record.qty },
            ]}
          />
        );
      },
    },
    {
      title: '退款信息',
      dataIndex: 'cancelReason',
      width: 180,
      render: (item, record) => {
        return (
          <ItemContainer
            options={[
              { label: '实退数', value: record.rQty },
              { label: '实际单号', value: record.linkOId },
            ]}
          />
        );
      },
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      rowKey="lockDetailId"
      pagination={false}
    ></Table>
  );
};
export default PropoverTable;
