// import { SALES_ORDER_TABLIST } from '@/constants/orders';

import TabPane from '@/components/TabPane';
import { useRef, useState } from 'react';
import List from './List';
import { XPageContainer, XTable, Button } from '@xlion/component'
import { SALES_ORDER_TABLIST } from './constants'
import { ORDER_TIME_TYPE, PLATFORM_ORDERSTATUS } from '@/constants/orders';
import { exportSaleOrderList, getSaleOrderList } from '@/services/orders/salesOrder';
import { SearchColumns, TableColumns } from './columns'

function SalesOrder() {
  const [tableTab, setTableTab] = useState<string>('0');
  const actionRef = useRef() as any;
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const [platformType, setPlatformType] = useState(1);
  // const [timeType, setTimeType] = useState(1);
  const formRef: any = useRef();
  const [exportParams, setExportParams] = useState<any>({}); //导出参数

  const onSelectChange = (newSelectedRowKeys: any) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleTabChange = (key: string) => {
    setTableTab(key);
  };

  return (
    <XPageContainer
      tabs={{
        activeKey: tableTab,
        items: SALES_ORDER_TABLIST,
        onChange: (key) => handleTabChange(key)
      }}
      contentStyle={{ padding: 0 }}
    >

      <XTable
        rowKey={'id'}
        actionRef={actionRef}
        formRef={formRef}
        scroll={{
          x: 'max-content',
        }}
        search={{
          defaultCollapsed: false,
          span: 4,
          labelWidth: 110,

          columns: SearchColumns({
            platformType,
            formRef,
            setPlatformType
          })
        }}
        columns={TableColumns()}
        toolbar={{
          extra: () => <Button
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
        }}
        params={{ tabType: tableTab }}
        request={async (params = {}) => {
          const { pageSize, current, time, timeType, ...par } = params;
          let arg0: any = {
            pageSize,
            pageNum: current,
            ...par,
          };

          if (time) {
            arg0.beginTime = Date.parse(time[0]);
            arg0.endTime = Date.parse(time[1]);
            arg0.timeType = timeType;
          } else {
            delete arg0.timeType
          }
          let param = {};
          Object.keys(arg0 || {}).forEach((key) => {
            if (arg0[key]) {
              param[key] = arg0[key];
            }
          });

          setExportParams(param);
          const { entry }: any = await getSaleOrderList(param, {});
          return {
            data: entry.list || [],
            success: true,
            // 不传会使用 data 的长度，如果是分页一定要传
            total: entry.totalRecord,
          };
        }}
        rowSelection={{
          selectedRowKeys,
          onChange: onSelectChange
        }}
      />
    </XPageContainer>
  );
}

export default SalesOrder;
