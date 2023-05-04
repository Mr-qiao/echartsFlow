import BatchInput from '@/components/batchInput';
import GoodsTableCol from '@/components/goodsTableCol';
import { DAYFORMAT_MINUTE } from '@/constants';
import {
  AFATER_IS_CANCEL,
  ORDER_STATUS_1_TYPE,
  ORDER_TIME_TYPE,
  PlATFORM_ORDER,
  PLATFORM_ORDERSTATUS,
  PlATFORM_ORDER_TYPE,
} from '@/constants/orders';
import { ProColumns } from '@ant-design/pro-components';
import { Image, Popover, Select } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import OrderColumns from '../components/OrderColums';
import styles from './index.less';

interface PropsType {
  platFormType: string;
  orderType: string;
  timeType: number;
  setPlatFormType: any;
  setOrderType: any;
  setTimeType: any;
  setOrderStatus: any;
  setShopStatus: any;
  formRef: any;
}

export const getColumns: React.FC<PropsType> = ({
  platFormType,
  formRef,
  timeType,
  setPlatFormType,
  setTimeType,
  setOrderStatus,
  setShopStatus,
}) => {
  const searchColumns: ProColumns<Record<string, any>, 'text'>[] | undefined = [
    {
      title: (
        <Select
          placeholder="请选择"
          options={PLATFORM_ORDERSTATUS}
          defaultValue={platFormType}
          dropdownMatchSelectWidth={135}
          onChange={(val) => {
            formRef.current.resetFields(['orderStatus']);
            setPlatFormType(val);
          }}
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            height: 28,
          }}
        />
      ),
      formItemProps: {
        htmlFor: '',
      },
      dataIndex: 'platformNumberList',
      hideInTable: true,
      valueEnum: PlATFORM_ORDER,
      renderFormItem: () => <BatchInput></BatchInput>,
    },
    {
      title: '商品编码',
      dataIndex: 'itemCodeList',
      hideInTable: true,
      renderFormItem: () => <BatchInput></BatchInput>,
    },
    {
      title: '款式名称',
      dataIndex: 'title',
      hideInTable: true,
    },
    {
      title: '商品ID',
      dataIndex: 'itemIdList',
      hideInTable: true,
      renderFormItem: () => <BatchInput></BatchInput>,
    },
    {
      title: '快递公司',
      dataIndex: 'expressName',
      hideInTable: true,
    },
    {
      title: '快递单号',
      dataIndex: 'expressOrderNumberList',
      hideInTable: true,
      renderFormItem: () => <BatchInput></BatchInput>,
    },
    {
      title: (
        <Select
          placeholder="请选择"
          options={PLATFORM_ORDERSTATUS}
          value={platFormType}
          dropdownMatchSelectWidth={135}
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            height: 28,
          }}
        />
      ),
      formItemProps: {
        htmlFor: '',
      },
      renderFormItem: () => {
        return (
          <Select
            placeholder="请选择"
            allowClear
            options={
              platFormType === '2' ? PlATFORM_ORDER_TYPE : ORDER_STATUS_1_TYPE
            }
            dropdownMatchSelectWidth={135}
            onChange={(val) => {
              if (platFormType === '2') {
                setShopStatus(val);
              } else {
                setOrderStatus(val);
              }
            }}
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              height: 28,
            }}
          />
        );
      },
      dataIndex: 'orderStatus',
      hideInTable: true,
    },
    {
      title: (
        <Select
          placeholder="请选择"
          options={ORDER_TIME_TYPE}
          defaultValue={timeType}
          dropdownMatchSelectWidth={135}
          onChange={(val) => {
            setTimeType(val);
            formRef.current.resetFields(['time']);
          }}
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            height: 28,
          }}
        />
      ),
      formItemProps: {
        htmlFor: '',
      },
      dataIndex: 'time',
      hideInTable: true,
      valueType: 'dateRange',
      valueEnum: AFATER_IS_CANCEL,
    },
  ];

  const columns: any = [
    ...searchColumns,
    {
      title: '序号',
      dataIndex: 'index',
      search: false,
      valueType: 'indexBorder',
    },
    {
      title: '系统信息',
      search: false,
      dataIndex: 'systemInfoVO',
      render: (record: any) => {
        return (
          <GoodsTableCol
            isMainImg={false}
            isFooterImg={false}
            infoList={[
              {
                title: '单号',
                key: record.jstOrderNumber,
              },
              {
                title: '发货工厂',
                key: record.deliveryFactory,
              },
              {
                title: '订单状态',
                key: record.orderStatus,
              },
              {
                title: '问题类型',
                key: record.problemTypes || '-',
              },
            ]}
          />
        );
      },
    },
    {
      title: '平台信息',
      search: false,
      dataIndex: 'platformInfoVO',
      render: (record: any) => {
        return (
          <GoodsTableCol
            isMainImg={false}
            isFooterImg={false}
            infoList={[
              {
                title: '单号',
                key: record.ksOrderNumber,
              },
              {
                title: '来源',
                key: record.source,
              },
              {
                title: '平台状态',
                key: record.platformStatus,
              },
            ]}
          />
        );
      },
    },
    {
      title: '商品信息',
      dataIndex: 'itemInfoVOList',
      search: false,
      render: (record: any, col: any) => {
        return (
          <>
            <div className={styles.itemInfoList}>
              {Array.isArray(record) &&
                record.length > 0 &&
                record.slice(0, 2).map((item, index) => (
                  <div key={index}>
                    <div
                      className={styles.imageBox}
                      style={{ paddingBottom: 10 }}
                    >
                      <Popover
                        content={
                          <OrderColumns dataSource={col.itemInfoVOList || []} />
                        }
                        title=""
                        trigger="hover"
                        placement="bottomLeft"
                        style={{ display: 'flex', alignItems: 'center' }}
                      >
                        <div className={styles.imageBoxItem}>
                          <div className={styles.imageStyle}>
                            <Image
                              src={
                                Array.isArray(item.itemImageList) &&
                                item.itemImageList.length > 0 &&
                                item.itemImageList[0]
                              }
                              preview={false}
                              width={40}
                              height={40}
                              fallback="data:image/png;base64,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"
                            />
                            {Array.isArray(item.itemImageList) &&
                              item.itemImageList.length > 0 && (
                                <span className={styles.imageCounts}>
                                  {item.itemImageList.length}
                                </span>
                              )}
                          </div>

                          <div className="u-fs13">
                            <span>商品编码：{item.ksItemCode}</span>
                          </div>
                        </div>
                      </Popover>
                    </div>
                  </div>
                ))}
            </div>
          </>
        );
      },
    },
    {
      title: '日期信息',
      dataIndex: 'dateInfoVO',
      search: false,
      render: (record: any) => {
        const planDeliverTime = record.planDeliverTime
          ? dayjs(record.planDeliverTime).format(DAYFORMAT_MINUTE)
          : '-';
        const payTime = record.payTime
          ? dayjs(record.payTime).format(DAYFORMAT_MINUTE)
          : '-';
        const orderTime = record.orderTime
          ? dayjs(record.orderTime).format(DAYFORMAT_MINUTE)
          : '-';
        const updateTime = record.updateTime
          ? dayjs(record.updateTime).format(DAYFORMAT_MINUTE)
          : '-';
        return (
          <GoodsTableCol
            isMainImg={false}
            isFooterImg={false}
            infoList={[
              {
                title: '计划发货',
                key: planDeliverTime,
              },
              {
                title: '付款日期',
                key: payTime,
              },
              {
                title: '下单日期',
                key: orderTime,
              },
              {
                title: '更新日期',
                key: updateTime,
              },
            ]}
          />
        );
      },
    },
    {
      title: '收货信息',
      dataIndex: 'receiveInfoVO',
      search: false,
      render: (record: any) => {
        return (
          <GoodsTableCol
            isMainImg={false}
            infoList={[
              {
                title: '姓名',
                key: record.name,
              },
              {
                title: '手机号',
                key: record.phone,
              },
              {
                title: '地址',
                key: record.address,
              },
            ]}
          />
        );
      },
    },
    {
      title: '发货信息',
      dataIndex: 'deliveryInfoVO',
      search: false,
      render: (record: any) => {
        const deliverTime = record.deliverTime
          ? dayjs(record.deliverTime).format(DAYFORMAT_MINUTE)
          : '-';
        return (
          <GoodsTableCol
            isMainImg={false}
            infoList={[
              {
                title: '仓库',
                key: record.deliveryRepository,
              },
              {
                title: '快递',
                key: record.expressName,
              },
              {
                title: '单号',
                key: record.expressOrderNumber,
              },
              {
                title: '时间',
                key: deliverTime,
              },
            ]}
          />
        );
      },
    },
  ];

  return columns || [];
};
