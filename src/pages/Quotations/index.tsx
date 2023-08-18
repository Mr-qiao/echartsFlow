import { quotationsList } from '@/services/quotations';
import { useRef, useState } from 'react';
import { XTable } from '@xlion/component'

import useColumns from './useColumns';
import dayjs from 'dayjs';




function Quotation() {
  const [activeKey,] = useState('0');
  const actionRef = useRef() as any;
  const [searchColumns, tableColumns] = useColumns()
  return (
    <XTable
      rowKey={'id'}
      actionRef={actionRef}
      scroll={{
        x: 'max-content',
      }}
      columns={tableColumns}
      search={{
        labelWidth: 100,
        span: 4,
        defaultCollapsed: false,
        columns: searchColumns
      }}
      request={async (
        params
      ) => {
        const arg0 = {
          status: activeKey === '0' ? undefined : activeKey,
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
        const { entry }: any = await quotationsList(arg0, {});
        return {
          data: entry.list || [],
          success: true,
          // 不传会使用 data 的长度，如果是分页一定要传
          total: entry.totalRecord,
        };
      }}
    />
    // toolbar={
    // 	{
    // 		menu: {
    // 			type: 'tab',
    // 			activeKey: activeKey,
    // 			items: [
    // 				{
    // 					key: '0',
    // 					label: <span>全部</span>,
    // 				},
    // 				{
    // 					key: '2',
    // 					label: <span>待报价</span>,
    // 				},
    // 				{
    // 					key: '3',
    // 					label: <span>已报价</span>,
    // 				},
    // 				{
    // 					key: '4',
    // 					label: <span>已失效</span>,
    // 				},
    // 			],
    // 			onChange: (key: string) => {
    // 				setActiveKey(key as string);
    // 				actionRef.current.reload();
    // 			},
    // 		},
    // 	} as any
    // }

  );
}

export default Quotation;
