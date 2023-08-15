
import dayjs from 'dayjs';
import { PLATFORM_ORDERSTATUS, ORDER_STATUS_1_TYPE, PlATFORM_ORDER_TYPE, ORDER_TIME_TYPE } from './constants'
import BatchInput from '@/components/batchInput';
import GoodsTableCol from '@/components/goodsTableCol';
import { DAYFORMAT_MINUTE, DEFAULT_IMG_SRC } from '@/constants';
import { Image, Popover } from '@xlion/component';
import OrderColumns from './components/OrderColums';
import styles from './index.less';


// 搜索列表
export const SearchColumns = ({ platformType, setPlatformType, formRef }) => {

  const columns: any[] = [
    {
      selectLabel: {
        valueEnum: PLATFORM_ORDERSTATUS,
        name: 'platformType',
        defaultValue: '1',
        onChange: (val) => {
          setPlatformType(val)
          formRef.current.resetFields(['orderStatus', 'shopStatus']);
        }
      },
      name: 'platformNumberList',
      renderFormItem: () => <BatchInput></BatchInput>,
    },
    {
      label: '商品编码',
      name: 'itemCodeList',
      type: 'input',
      renderFormItem: () => <BatchInput></BatchInput>,
    },
    {
      label: '款式名称',
      name: 'title',
      type: 'input',
    },
    {
      label: '商品ID',
      name: 'itemIdList',
      type: 'input',
      renderFormItem: () => <BatchInput></BatchInput>,
    },
    {
      label: '快递公司',
      name: 'expressName',
      type: 'input',
    },
    {
      label: '快递单号',
      name: 'expressOrderNumberList',
      type: 'input',
      renderFormItem: () => <BatchInput></BatchInput>,
    },
    {
      label: '1' === `${platformType}` ? '订单状态' : '平台状态',
      name: '1' === `${platformType}` ? 'orderStatus' : 'shopStatus',
      type: 'select',
      fieldProps: {
        options: '1' === `${platformType}` ? ORDER_STATUS_1_TYPE : PlATFORM_ORDER_TYPE,
      },
    },
    {
      selectLabel: {
        valueEnum: ORDER_TIME_TYPE,
        defaultValue: '1',
        name: 'timeType',
        onChange: () => {
          formRef.current.resetFields(['time']);
        }
      },
      name: 'time',
      type: 'dateRange',
      fieldProps: {
        style: { width: '100%' }
      }
    },
  ]
  return columns;
}

// 列表
export const TableColumns = () => {
  const columns: any[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
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
      width: 300,
      render: (record: any, col: any) => {
        return (
          <>
            <div className={`flex-col ${styles.itemInfoList}`}>
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
                                  ? item.itemImageList[0]
                                  : DEFAULT_IMG_SRC
                              }
                              preview={false}
                              width={40}
                              height={40}
                              fallback={DEFAULT_IMG_SRC}
                            />
                            {Array.isArray(item.itemImageList) &&
                              item.itemImageList.length > 0 && (
                                <span className={styles.imageCounts}>
                                  {item.itemImageList.length}
                                </span>
                              )}
                          </div>

                          <GoodsTableCol
                            isMainImg={false}
                            isFooterImg={false}
                            infoList={[
                              {
                                title: '商品编码',
                                key: item.ksItemCode,
                              },
                            ]}
                          />
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
      width: 300,
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

  return columns;
};

