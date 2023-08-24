import { useState } from 'react';

// import { XTableColumns, XTableColumnType } from '@ant-design/pro-components';
import { Badge, Popover, Select, Tag } from '@xlion/component';
import { XTableColumns } from '@xlion/component/dist/x-table';
// import { Badge, Popover, Select } from 'antd';
// import Tag from 'antd/lib/tag';
import dayjs from 'dayjs';

import BatchInput from '@/components/batchInput';
import Image from '@/components/Image';

import {
  AFTER_SALES_DICT,
  AFTER_SALES_TYPE,
  ORDER_SHOP_STATUS_DICT,
  ORDER_STATUS_DICT,
  PLATFORM_DICT,
  PLATFORM_STATUS,
} from './constants';
import { useSearchColumns, useSelectDict } from './hooks';
import { DataType } from './types';

import {
  XTableColumnType,
  XTableSearchItem,
} from '@xlion/component/dist/x-table/interface';
import ItemContainer from './components/ItemContainer';
import PropoverTable from './components/PropoverTable';
enum SELECT_TYPE {
  TYPE = 'type',
  SHOP_STATUS = 'shopStatus',
  ORDER_STATUS = 'orderStatus',
}
// const ORDER_TYPE_DICT = [
//   { label: '售后单号', value: 'asIds' },
//   { label: '平台售后单', value: 'outerAsIds' },
//   { label: '平台订单号', value: 'soIds' },
//   { label: '系统订单号', value: 'oIds' },
// ];
const ORDER_TYPE_DICT = {
  asIds: '售后单号',
  outerAsIds: '平台售后单',
  soIds: '平台订单号',
  oIds: '系统订单号',
};
// export const AFTER_SALES_TIME_TYPE_DICT = [
//   { label: '申请日期', value: 'AS_DATE' },
//   { label: '付款日期', value: 'PAY_DATE' },
//   { label: '下单日期', value: 'ORDER_DATE' },
//   { label: '更新日期', value: 'MODIFIED_DATE' },
//   { label: '入仓时间选择', value: 'RECEIVE_DATE' },
//   { label: '发货日期', value: 'SEND_DATE' },
// ];
export const AFTER_SALES_TIME_TYPE_DICT = {
  AS_DATE: '申请日期',
  PAY_DATE: '付款日期',
  ORDER_DATE: '下单日期',
  MODIFIED_DATE: '更新日期',
  RECEIVE_DATE: '入仓时间选择',
  SEND_DATE: '发货日期',
};
// const SELECT_TYPE_DICT = [
//   { label: '售后类型', value: SELECT_TYPE.TYPE },
//   { label: '平台状态', value: SELECT_TYPE.SHOP_STATUS },
//   { label: '原订单状态', value: SELECT_TYPE.ORDER_STATUS },
// ];
const SELECT_TYPE_DICT = {
  [SELECT_TYPE.TYPE]: '售后类型',
  [SELECT_TYPE.SHOP_STATUS]: '平台状态',
  [SELECT_TYPE.ORDER_STATUS]: '原订单状态',
};
//售后订单枚举 keys
const afterSalesKeys = [
  AFTER_SALES_TYPE.RETURN_SREFUND,
  AFTER_SALES_TYPE.OHTER,
  AFTER_SALES_TYPE.REJECTIONS,
  AFTER_SALES_TYPE.COMPLAINT,
  AFTER_SALES_TYPE.EXCHANGE_GOODS,
  AFTER_SALES_TYPE.REPAIR,
];
//平台状态 枚举keys
const platformKeys = [PLATFORM_STATUS.WAIT_SELLER_AGREE];
interface IProps {
  formRef?: any;
}
function useColumns({
  formRef,
}: IProps): [XTableSearchItem[], XTableColumns<DataType>] {
  const [salesType, setSalesType] = useState<string>(SELECT_TYPE.TYPE);
  const [timeType, setTimeType] = useState<string>('AS_DATE');

  //售后类型
  const [afterSalesDict, afterSalesDictMap] = useSelectDict(AFTER_SALES_DICT);
  //平台状态

  const [platformDict, platformDictMap] = useSelectDict(PLATFORM_DICT);
  //原订单状态
  const [orderStatusDict, orderStatusDictMap] =
    useSelectDict(ORDER_STATUS_DICT);
  //订单 搜索
  const [item_01, resetItem_01] = useSearchColumns({
    formRef,
    renderFormItem: () => <BatchInput />,
    options: ORDER_TYPE_DICT,
    name: 'orderType',
  });
  //类型 搜索
  const [item_02, resetItem_02] = useSearchColumns({
    formRef,
    renderFormItem: () => {
      const props = {
        [SELECT_TYPE.TYPE]: {
          options: afterSalesDict,
        },
        [SELECT_TYPE.SHOP_STATUS]: {
          options: platformDict,
        },
        [SELECT_TYPE.ORDER_STATUS]: {
          options: orderStatusDict,
        },
      }[salesType];
      return <Select {...props} placeholder="请选择" />;
    },
    options: SELECT_TYPE_DICT,
    onLabelChange: (value) => {
      setSalesType(value);
    },
    name: 'salesType',
  });
  //日期 搜索
  const [item_03, resetItem_03] = useSearchColumns({
    formRef,
    type: 'dateRange',
    options: AFTER_SALES_TIME_TYPE_DICT,
    onLabelChange: (value: string) => {
      setTimeType(value);
    },
    // search: {
    transform: (value) => {
      const [dateStart, dateEnd] = [
        dayjs(value[0]).format('YYYY-MM-DD 00:00:00'),
        dayjs(value[1]).format('YYYY-MM-DD 23:59:59'),
      ];
      return {
        dateType: timeType,
        dateStart,
        dateEnd,
      };
      // },
    },
    name: 'timeType',
    fieldProps: {
      style: {
        width: '100%',
      },
    },
  });

  // 搜索条件
  const TABLE_SEARCH_COLUMSA: XTableSearchItem[] = [
    { ...item_01 },
    {
      label: '商品编码',
      name: 'skuIds',
      type: 'input',
      renderFormItem: () => <BatchInput />,
    },
    {
      label: '款式名称',
      name: 'itemName',
      type: 'input',
    },
    {
      label: '商品ID',
      name: 'shopSkuIds',
      type: 'input',
      renderFormItem: () => <BatchInput />,
    },
    {
      label: '快递单号',
      name: 'lIds',
      type: 'input',
      renderFormItem: () => <BatchInput />,
    },
    { ...item_02 },
    {
      label: '快递公司',
      name: 'logisticsCompany',
      type: 'input',
    },

    { ...item_03 },
  ];

  //列表信息
  const TABLE_LIST_COLUMSA: XTableColumnType<DataType>[] = [
    {
      title: '序号',
      dataIndex: 'key11',
      valueType: 'index',
      width: 60,
    },
    {
      title: '售后信息',
      dataIndex: 'asId',
      width: 260,
      render: (item, record) => {
        return (
          <ItemContainer
            options={[
              { label: '问题类型', value: record.questionType },
              {
                label: '售后类型',
                value: afterSalesDictMap[record.type] ? (
                  <Tag color={afterSalesDictMap[record.type]?.color}>
                    {afterSalesDictMap[record.type]?.text}
                  </Tag>
                ) : (
                  '-'
                ),
              },
              {
                label: '平台状态',
                value: platformDictMap[record.shopStatus] ? (
                  <Tag color={platformDictMap[record.shopStatus]?.color}>
                    {platformDictMap[record.shopStatus]?.text}
                  </Tag>
                ) : (
                  '-'
                ),
              },
              { label: '售后单号', value: record.asId },
              { label: '平台售后单', value: record.outerAsId },
            ]}
          />
        );
      },
    },
    {
      title: '售后资料',
      dataIndex: 'buyerApplyRefund',
      width: 200,
      render: (item, record) => {
        return (
          <ItemContainer
            options={[
              { label: '申请数量', value: record.itemQtyTotal },

              { label: '实退数量', value: record.itemRQtyTotal },
              { label: '备注', value: record.remark },
            ]}
          />
        );
      },
    },
    {
      title: '原单系统信息',
      dataIndex: 'oId',
      width: 240,
      render: (item, record) => {
        return (
          <ItemContainer
            options={[
              {
                label: '订单状态',
                value: orderStatusDictMap[record.orderStatus] ? (
                  <Tag color={orderStatusDictMap[record.orderStatus]?.color}>
                    {orderStatusDictMap[record.orderStatus]?.text}
                  </Tag>
                ) : (
                  '-'
                ),
              },

              { label: '发货工厂', value: record.factoryName },
              { label: '问题类型', value: record.orderQuestionType },
              { label: '单号', value: record.oId },
            ]}
          />
        );
      },
    },
    {
      title: '平台信息',
      dataIndex: 'soId',
      width: 240,
      render: (item, record) => {
        return (
          <ItemContainer
            options={[
              { label: '来源', value: record.orderFrom },
              {
                label: '平台状态',
                value: ORDER_SHOP_STATUS_DICT[record.orderShopStatus] ? (
                  <Tag
                    color={
                      ORDER_SHOP_STATUS_DICT[record.orderShopStatus]?.color
                    }
                  >
                    {ORDER_SHOP_STATUS_DICT[record.orderShopStatus]?.text}
                  </Tag>
                ) : (
                  '-'
                ),
              },
              { label: '单号', value: record.soId },
            ]}
          />
        );
      },
    },

    {
      title: '售后商品信息',
      dataIndex: 'items',
      width: 260,
      render: (item, record) => {
        const _item = record['items']?.slice(0, 2) || [];
        return (
          <>
            <Popover
              zIndex={3}
              destroyTooltipOnHide={{ keepParent: false }}
              placement="bottom"
              // title={'预订信息'}
              trigger="hover"
              content={<PropoverTable dataSource={record['items'] as []} />}
            >
              {_item?.map((item) => (
                <div className="u-flex u-mb5" key={item.id}>
                  <Badge
                    count={record['items'].length || 0}
                    className="u-mr10"
                    style={{ backgroundColor: '#52c41a' }}
                    offset={[-80, 0]}
                  >
                    <Image src={item.pic} width={80} height={80}></Image>
                  </Badge>
                  <div>
                    <ItemContainer
                      layout="vertical"
                      options={[
                        {
                          label: '商品编码',
                          value: (
                            <span className="t-c__blue">{item.skuId}</span>
                          ),
                        },
                      ]}
                    />
                  </div>
                </div>
              ))}
            </Popover>
          </>
        );
      },
    },

    {
      title: '日期信息',
      dataIndex: 'asDate',
      width: 280,
      render: (item, record) => {
        return (
          <ItemContainer
            options={[
              { label: '申请日期', value: record.asDate },
              { label: '付款日期', value: record.payDate },
              { label: '下单日期', value: record.orderDate },
              { label: '更新日期', value: record.modified },
            ]}
          />
        );
      },
    },
    {
      title: '售后地址',
      dataIndex: 'refundFactoryName',
      width: 260,
      render: (item, record) => {
        return (
          <ItemContainer
            options={[
              { label: '工厂', value: record.refundFactoryName },
              { label: '收件人', value: record.receiverName },
              { label: '手机号', value: record.receiverMobile },
              { label: '地址', value: record.receiverAddress },
            ]}
          />
        );
      },
    },
    {
      title: '退货信息',
      dataIndex: 'lId',
      width: 260,
      render: (item, record) => {
        return (
          <ItemContainer
            options={[
              { label: '快递', value: record.logisticsCompany },
              { label: '单号', value: record.lId },
              { label: '入仓时间', value: record.receiveDate },
            ]}
          />
        );
      },
    },
  ];
  return [
    // [
    //   ...TABLE_SEARCH_COLUMSA.map((item) => {
    //     // item['hideInTable'] = true;
    //     item['key'] = item['dataIndex'] as string;
    //     return item;
    //   }),
    //   ...TABLE_LIST_COLUMSA.map((item) => {
    //     // item['hideInSearch'] = true;
    //     item['key'] = item['dataIndex'] as string;
    //     return item;
    //   }),
    // ] as XTableColumns<DataType>[],
    TABLE_SEARCH_COLUMSA,
    TABLE_LIST_COLUMSA,
  ];
}
export default useColumns;
