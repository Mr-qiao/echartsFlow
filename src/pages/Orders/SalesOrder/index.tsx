import BatchInput from '@/components/batchInput';
import GoodsTableCol from '@/components/goodsTableCol';
import { DAYFORMAT_MINUTE, DAYFORMAT_YEAR } from '@/constants';
import {
  AFATER_IS_CANCEL,
  ORDER_STATUS_1,
  ORDER_STATUS_1_TYPE,
  ORDER_TIME_TYPE,
  PlATFORM_ORDER_TYPE,
} from '@/constants/orders';
import { exportList, queryList } from '@/services/orders';
import { ProTable } from '@ant-design/pro-components';
import { Button, DatePicker, Image, Popover, Select } from 'antd';

import dayjs from 'dayjs';
import { useRef, useState } from 'react';
import OrderColumns from '../components/OrderColums';
import styles from './index.less';

const { Option } = Select;
const { RangePicker } = DatePicker;

function TabList(props: any) {
  const { tabKey } = props;
  const [timeSelect, setTimeSelect] = useState<string>('1');
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);

  const [platFormType, setPlatFormType] = useState(
    PlATFORM_ORDER_TYPE[0].value,
  );
  const [orderType, setOrderType] = useState(ORDER_STATUS_1_TYPE[0].value);
  const [timeType, setTimeType] = useState(ORDER_TIME_TYPE[0].value);

  const actionRef = useRef() as any;
  const ref: any = useRef();

  const columnsSearch: any = [
    {
      title: (
        <Select
          placeholder="请选择"
          options={PlATFORM_ORDER_TYPE}
          defaultValue={platFormType}
          dropdownMatchSelectWidth={135}
          onChange={(val) => {
            setPlatFormType(val);
            // formRef.current.resetFields(['time']);
          }}
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            height: 28,
          }}
        />
      ),
      dataIndex: 'platformOrder',
      hideInTable: true,
      renderFormItem: (item: any, _: any, form: any) => {
        return <BatchInput />;
      },
    },
    {
      title: '商品编码',
      dataIndex: 'skuCodes',
      hideInTable: true,
      renderFormItem: (item: any, _: any, form: any) => {
        return <BatchInput />;
      },
    },
    {
      title: '款式名称',
      dataIndex: 'ksName',
      hideInTable: true,
    },
    {
      title: '商品ID',
      dataIndex: 'itemIds',
      hideInTable: true,
      renderFormItem: (item: any, _: any, form: any) => {
        return <BatchInput />;
      },
    },
    {
      title: '快递公司',
      dataIndex: 'ksName',
      hideInTable: true,
    },
    {
      title: '主播名称',
      dataIndex: 'ksName',
      hideInTable: true,
    },
    {
      title: '店铺名称',
      dataIndex: 'ksName',
      hideInTable: true,
    },
    {
      title: '快递单号',
      dataIndex: 'companyCodes',
      hideInTable: true,
      renderFormItem: (item: any, _: any, form: any) => {
        return <BatchInput />;
      },
    },
    {
      title: (
        <Select
          placeholder="请选择"
          options={ORDER_STATUS_1_TYPE}
          defaultValue={orderType}
          dropdownMatchSelectWidth={135}
          onChange={(val) => {
            setOrderType(val);
            // formRef.current.resetFields(['time']);
          }}
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            height: 28,
          }}
        />
      ),
      dataIndex: 'orderStatus',
      hideInTable: true,
      valueEnum: ORDER_STATUS_1,
      formItemProps: {
        htmlFor: '',
      },
    },
    {
      title: (
        <Select
          placeholder="请选择"
          options={ORDER_TIME_TYPE}
          defaultValue={timeType}
          dropdownMatchSelectWidth={135}
          onChange={(val) => {
            // console.log(val, 'kk');
            setTimeType(val);
            // formRef.current.resetFields(['time']);
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
    ...columnsSearch,
    {
      title: '序号',
      dataIndex: 'index',
      search: false,
      valueType: 'indexBorder',
    },
    {
      title: '系统信息',
      search: false,
      dataIndex: 'systemInfo',
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
                key: record.payAmount,
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
      dataIndex: 'platformInfo',
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
                title: '主播',
                key: record.anchorNickname,
              },
              {
                title: '店铺',
                key: record.shopName,
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
      dataIndex: 'itemInfo',
      search: false,
      render: (record: any, col: any) => {
        console.log(record, col);
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
                      <div className={styles.imageStyle}>
                        <Image
                          src={item.itemImage}
                          width={40}
                          height={40}
                          fallback="data:image/png;base64,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"
                        />
                      </div>
                      <Popover
                        content={
                          <OrderColumns dataSource={col.itemInfo || []} />
                        }
                        title=""
                        trigger="hover"
                        placement="bottomLeft"
                        style={{ display: 'flex', alignItems: 'center' }}
                      >
                        <div className={styles.infoTit}>
                          <span>商品编码：{item.itemId}</span>
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
      dataIndex: 'dateInfo',
      search: false,
      render: (record: any) => {
        const planDeliverTime = record.planDeliverTime
          ? dayjs(record.planDeliverTime).format(DAYFORMAT_YEAR)
          : '-';
        const payTime = record.payTime
          ? dayjs(record.payTime).format(DAYFORMAT_YEAR)
          : '-';
        const orderTime = record.orderTime
          ? dayjs(record.orderTime).format(DAYFORMAT_YEAR)
          : '-';
        const updateTime = record.updateTime
          ? dayjs(record.updateTime).format(DAYFORMAT_YEAR)
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
      // dataIndex: 'shxx',
      dataIndex: 'receiveInfo',
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
      dataIndex: 'deliveryInfo',
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
  const exportListClick = () => {
    ref?.current?.validateFields().then((res: any) => {
      const sTime: any = timeSelect === '1' ? 'beginCreateTime' : 'startTime';
      const eTime: any = timeSelect === '1' ? 'endCreateTime' : 'endTime';
      let arg0: any = {
        status: tabKey === '3' ? undefined : tabKey,
        ids: selectedRowKeys,
        timeType: timeSelect,
        ...res,
      };
      arg0[sTime] =
        res.sendTime?.length > 0 ? dayjs(res.sendTime[0]).valueOf() : undefined;
      arg0[eTime] =
        res.sendTime?.length > 0 ? dayjs(res.sendTime[1]).valueOf() : undefined;
      exportList(arg0, { responseType: 'blob', getResponse: true }).then(
        (res: any) => {
          let blob = new Blob([res.data]);
          let downloadElement = document.createElement('a');
          let href = window.URL.createObjectURL(blob); //创建下载的链接
          downloadElement.href = href;
          downloadElement.download =
            decodeURI(
              res.headers['content-disposition'].split('filename=')[1],
            ) || ''; //下载后文件名
          document.body.appendChild(downloadElement);
          downloadElement.click(); //点击下载
          document.body.removeChild(downloadElement); //下载完成移除元素
          window.URL.revokeObjectURL(href); //释放掉blob对象
        },
      );
    });
  };
  const onSelectChange = (newSelectedRowKeys: any) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  return (
    <div>
      <ProTable
        columns={columns}
        formRef={ref}
        defaultSize={'small'}
        scroll={{
          x: 'max-content',
        }}
        rowKey={'id'}
        actionRef={actionRef}
        request={async (params = {}, sort, filter) => {
          const sTime: any =
            timeSelect === '1' ? 'beginCreateTime' : 'startTime';
          const eTime: any = timeSelect === '1' ? 'endCreateTime' : 'endTime';
          let arg0: any = {
            status: tabKey === '3' ? undefined : tabKey,
            timeType: timeSelect,
            ...params,
          };
          arg0[sTime] =
            params.sendTime?.length > 0
              ? dayjs(params.sendTime[0]).valueOf()
              : undefined;
          arg0[eTime] =
            params.sendTime?.length > 0
              ? dayjs(params.sendTime[1]).valueOf()
              : undefined;
          const res: any = await queryList(arg0, {});
          const data = res?.entry?.list;

          const mockList = [
            {
              systemInfo: {
                jstOrderNumber: '112121',
                payAmount: 212,
                deliveryFactory: '张三工厂',
                orderStatus: '已付款待审核',
                problemTypes: '等待订单合并 ',
              },
              platformInfo: {
                anchorNickname: 'pgl',
                ksOrderNumber: '1212',
                platformStatus: '等待卖家发货',
                shopName: 'xxx',
                source: 'xxx',
              },
              itemInfo: [
                {
                  anchorNickname: 'pgl',
                  itemCode: '12121',
                  itemId: '1212',
                  itemImage: '',
                  money: 121,
                  number: 121,
                  orderNumber: 11,
                  specification: '喝死/ss',
                  title: 'nnnn',
                },
                {
                  anchorNickname: 'pgl',
                  itemCode: '12121',
                  itemId: '1212',
                  itemImage: '',
                  money: 121,
                  number: 121,
                  orderNumber: 11,
                  specification: '喝死/ss',
                  title: 'nnnn',
                },
              ],
              dateInfo: {
                orderTime: 1682057434000,
                payTime: 1682057434000,
                planDeliverTime: 1682057434000,
                updateTime: 1682057434000,
              },
              receiveInfo: {
                name: 'sss',
                address: '浙江省杭州市萧山区盈丰街道博地中心C座 1401A',
                phone: '156xxxxxxxx',
              },
              deliveryInfo: {
                deliverTime: 1682057434000,
                deliveryRepository: 'xxxxx仓库',
                expressName: '快递公司',
                expressOrderNumber: 121212121,
              },
            },
          ];

          return {
            data: mockList,
            success: res.success,
            // 不传会使用 data 的长度，如果是分页一定要传
            total: res?.entry.totalRecord,
          };
        }}
        search={{
          labelWidth: 100,
          span: 6,
          defaultCollapsed: false,
        }}
        form={{
          size: 'small',
        }}
        options={false}
        rowSelection={{ ...rowSelection }}
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={exportListClick}>
            导出
          </Button>,
        ]}
      />
    </div>
  );
}

export default TabList;
