import { ORDER_TIME_TYPE, PLATFORM_ORDERSTATUS } from '@/constants/orders';
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
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const [platformType, setPlatformType] = useState(
    PLATFORM_ORDERSTATUS[0].value,
  );
  const [timeType, setTimeType] = useState(ORDER_TIME_TYPE[0].value);
  const formRef: any = useRef();
  const [exportParams, setExportParams] = useState<any>({}); //导出参数

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
        platformType,
        formRef,
        timeType,
        setPlatformType,
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
          platformType,
          tabType: tableTab,
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
        if (param?.tabType === '0') param.tabType = '';
        setExportParams(param);
        const { entry } = await getSaleOrderList(param, {});
        return {
          data: entry.list || [],
          success: entry.success,
          // 不传会使用 data 的长度，如果是分页一定要传
          total: entry.totalRecord,
        };
      }}
      search={{
        defaultCollapsed: false,
        span: 8,
        labelWidth: 150,
        className: 'search-form',
      }}
      form={{ labelCol: { span: 6 } }}
      options={false}
      rowSelection={{ ...rowSelection }}
      toolBarRender={() => [
        <Button
          type="primary"
          key="primary"
          onClick={async () => {
            // 导出
            let query = {
              ...exportParams,
            };
            if (selectedRowKeys.length) query.ids = selectedRowKeys;

            await exportSaleOrderList(query, {});
          }}
        >
          导出
        </Button>,
      ]}
    />
  );
};

export default List;
