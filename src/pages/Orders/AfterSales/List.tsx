import { useRef, useState } from 'react';

import {
  // ActionType,
  ProColumns,
  ProFormInstance,
} from '@ant-design/pro-components';
// import { Button } from 'antd';
import moment from 'moment';

import { FormInstance } from '@xlion/component/dist/form'
import { XTable, Button } from '@xlion/component'
import { ActionType } from '@xlion/component/dist/x-table'

import CustomProTable from '@/components/CustomProTable';
import { afterSaleList, afterSaleExport } from '@/services/orders/afterSales';

import useColumns, { AFTER_SALES_TIME_TYPE_DICT } from './columns';
import { useSelectDict } from './hooks';
// import VoidedModal from './components/VoidedModal';
import { DataType } from './types';

const Index = () => {
  const [searchParams, setSearchParams] = useState<Recordable<any>>({});
  const formRef = useRef<FormInstance>();
  const actionRef = useRef<ActionType>();
  const [, searchDateDictMap] = useSelectDict(AFTER_SALES_TIME_TYPE_DICT);

  const [searchColumns, tableColumns] = useColumns({ formRef });

  const handleExport = async () => {
    let values = formRef.current?.getFieldsValue();
    let o = {
      ...values,
      ...searchParams,
    };
    //处理日期
    Object.keys(o)?.forEach((item) => {
      const _ = searchDateDictMap[item];
      if (_ && o[item]) {
        const [dateStart, dateEnd] = [
          moment(o[item][0]).format('YYYY-MM-DD 00:00:00'),
          moment(o[item][1]).format('YYYY-MM-DD 23:59:59'),
        ];
        o.dateType = item;
        o.dateStart = dateStart;
        o.dateEnd = dateEnd;
        delete o[item];
      }
    });
    afterSaleExport(o, { isDownload: true, responseType: 'blob' });
  };
  // const columns: ProColumns<DataType>[] = [...columnItems];
  // const [searchColumns, tableColumns] = columnItems

  return (
    <>
      <XTable
        rowKey="id"
        formRef={formRef}
        actionRef={actionRef}
        className="custom-table"
        search={{
          defaultCollapsed: false,
          labelWidth: 110,
          span: 4,
          columns: searchColumns
        }}
        columns={tableColumns}
        toolbar={{
          extra: () => <Button
            key="export"
            className="u-mr8"
            type="primary"
            onClick={handleExport}
          >
            导出
          </Button>
        }}
        scroll={{ x: 'max-content' }}
        request={async (params) => {
          const { orderType, salesType, timeType, pageSize, current, ...par } = params;
          let arg0: any = {
            pageSize,
            pageNum: current,
            ...par,
          };
          setSearchParams(arg0)
          const { entry }: any = await afterSaleList(arg0);
          return {
            data: entry.list || [],
            success: true,
            // 不传会使用 data 的长度，如果是分页一定要传
            total: entry.totalRecord,
          };
        }}
      />

      {/* <CustomProTable
        columns={columns}
        formRef={formRef}
        actionRef={actionRef}
        rowKey="id"
        className="custom-table"
        options={true}
        ajaxRequest={afterSaleList}
        search={{
          defaultCollapsed: false,
          labelWidth: 125,
          className: 'search-form',
        }}
        onReset={() => {
          setSearchParams({});
          reloadItem();
        }}
        onBefterSearch={({ ...params }) => {
          const o = {
            ...searchParams,
            ...params,
          };
          return o;
        }}
        toolbar={{
          actions: [
            <Button
              key="export"
              className="u-mr8"
              type="primary"
              onClick={handleExport}
            >
              导出
            </Button>,
          ].filter(Boolean),
        }}
      /> */}
    </>
  );
};
export default Index;
