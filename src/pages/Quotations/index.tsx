import { quotationsList } from '@/services/quotations';
import { filterPageName } from '@/utils';
import { useRef, useState } from 'react';
import { XTable } from '@xlion/component'

import { TableColumns, SearchColumns } from './columns'
import dayjs from 'dayjs';


function Quotation() {
  const [activeKey, setActiveKey] = useState('0');
  const actionRef = useRef() as any;
  return (
    <XTable
      rowKey={'id'}
      actionRef={actionRef}
      scroll={{
        x: 'max-content',
      }}
      columns={TableColumns()}
      search={{
        labelWidth: 100,
        span: 4,
        defaultCollapsed: false,
        columns: SearchColumns()
      }}
      request={async (
        params
      ) => {
        const arg0 = {
          status: activeKey === '0' ? undefined : activeKey,
          // ...filterPageName(params),
          ...params,
          itemIdList: params.itemId && [params.itemId],

          askStartTime:
            params.time?.length > 0
              ? dayjs(params.time[0]).valueOf()
              : undefined,

          askEndTime:
            params.time?.length > 0
              ? dayjs(params.time[1]).valueOf()
              : undefined,
          answerStartTime:
            params.bjTime?.length > 0
              ? dayjs(params.bjTime[0]).valueOf()
              : undefined,

          answerEndTime:
            params.bjTime?.length > 0
              ? dayjs(params.bjTime[1]).valueOf()
              : undefined,
        };
        const res = await quotationsList(arg0, {});
        const data = res.entry.list;
        return {
          data: data,
          success: res.success,
          // 不传会使用 data 的长度，如果是分页一定要传
          total: res?.entry.totalRecord,
        };
      }}
    />
  );
}

export default Quotation;
