import {
  ORDER_STATUS_1_TYPE,
  ORDER_TIME_TYPE,
  PlATFORM_ORDER_TYPE,
} from '@/constants/orders';
import { exportSaleOrderList, getSaleOrderList } from '@/services/orders';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { useRef, useState } from 'react';
import { getColumns } from './columns';
interface propsType {
  tableTab: string;
  actionRef: any;
}

const List: React.FC<propsType> = ({ tableTab, actionRef }) => {
  // const [timeSelect, setTimeSelect] = useState<string>('1');
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const [platFormType, setPlatFormType] = useState(
    PlATFORM_ORDER_TYPE[0].value,
  );
  const [orderType, setOrderType] = useState(ORDER_STATUS_1_TYPE[0].value);
  const [timeType, setTimeType] = useState(ORDER_TIME_TYPE[0].value);
  const [shopStatus, setShopStatus] = useState<string>('');
  const [orderStatus, setOrderStatus] = useState<string>('');
  const formRef: any = useRef();
  const [exportParams, setExportParams] = useState<any>({}); //导出参数

  // const exportListClick = async () => {
  // formRef?.current?.validateFields().then((res: any) => {
  //   let arg0: any = {
  //     status: tableTab,
  //     ids: selectedRowKeys,
  //     timeType,
  //     ...res,
  //   };
  //   arg0.startTime =
  //     res.time?.length > 0 ? dayjs(res.time[0]).valueOf() : undefined;
  //   arg0.endTime =
  //     res.time?.length > 0 ? dayjs(res.time[1]).valueOf() : undefined;
  //   console.log(arg0, '导出');
  //   // exportSaleOrderList(arg0, {});
  // });
  // };
  const onSelectChange = (newSelectedRowKeys: any) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <ProTable
      columns={getColumns({
        platFormType,
        formRef,
        orderType,
        timeType,
        shopStatus,
        orderStatus,
        setShopStatus,
        setOrderStatus,
        setPlatFormType,
        setOrderType,
        setTimeType,
      })}
      formRef={formRef}
      defaultSize={'small'}
      scroll={{
        x: 'max-content',
      }}
      rowKey={'id'}
      actionRef={actionRef}
      request={async (params = {}, sort, filter) => {
        const { pageSize, current, time, ...par } = params;
        let arg0: any = {
          pageSize,
          pageNum: current,
          platFormType,
          shopStatus,
          orderStatus,
          status: tableTab,
          ...par,
        };

        if (time) {
          arg0.beginTime = Date.parse(time[0]);
          arg0.endTime = Date.parse(time[1]);
          arg0.timeType = timeType;
        }
        let param = {};
        Object.keys(arg0 || {}).forEach((key) => {
          if (arg0[key]) {
            param[key] = arg0[key];
          }
        });

        if (param?.status === '0') param.status = '';
        console.log(param, '-------');
        setExportParams(param);
        const { entry } = await getSaleOrderList(param, {});

        return {
          data: entry.list,
          success: entry.success,
          // 不传会使用 data 的长度，如果是分页一定要传
          total: entry.totalRecord,
        };
      }}
      search={{
        // labelWidth: 100,
        // span: 6,
        defaultCollapsed: false,
      }}
      form={{
        size: 'small',
      }}
      options={false}
      rowSelection={{ ...rowSelection }}
      toolBarRender={() => [
        <Button
          type="primary"
          key="primary"
          onClick={async () => {
            console.log(exportParams, '导出---');
            await exportSaleOrderList(exportParams, {});
          }}
        >
          导出
        </Button>,
      ]}
    />
  );
};

export default List;
