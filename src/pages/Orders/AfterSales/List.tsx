import { useRef, useState } from 'react';

import {
  ActionType,
  ProColumns,
  ProFormInstance,
} from '@ant-design/pro-components';
import { Button } from 'antd';
import moment from 'moment';

import CustomProTable from '@/components/CustomProTable';
import Api from '@/services/orders/afterSales';

import useColumns, { AFTER_SALES_TIME_TYPE_DICT } from './columns';
import { useSelectDict } from './hooks';
// import VoidedModal from './components/VoidedModal';
import { DataType } from './types';

const Index = () => {
  const [searchParams, setSearchParams] = useState<Recordable<any>>({});
  const formRef = useRef<ProFormInstance>();
  const actionRef = useRef<ActionType>();
  const [, searchDateDictMap] = useSelectDict(AFTER_SALES_TIME_TYPE_DICT);

  const [columnItems, reloadItem] = useColumns();

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
        const [startTime, endTime] = [
          moment(o[item][0]).valueOf(),
          moment(o[item][1]).valueOf(),
        ];
        o.dateType = item;
        o.startTime = startTime;
        o.endTime = endTime;
        delete o[item];
      }
    });
    Api.AfterSales.Export(o, { isDownload: true, responseType: 'blob' });
  };
  const columns: ProColumns<DataType>[] = [...columnItems];

  return (
    <>
      <CustomProTable
        columns={columns}
        formRef={formRef}
        actionRef={actionRef}
        rowKey="id"
        className="custom-table"
        options={true}
        ajaxRequest={Api.AfterSales.List}
        search={{
          // collapsed: false,
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
            <Button key="export" className="u-mr8" onClick={handleExport}>
              导出
            </Button>,
          ].filter(Boolean),
        }}
      />
    </>
  );
};
export default Index;
