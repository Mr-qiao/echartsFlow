import { useState } from 'react';

type IParams = Recordable<any> | (() => Recordable<any>);

export function useList<T>(reqFn: (...args: any[]) => Promise<any>, params: IParams = {}) {
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
    total: 0,
  });
  const [dataSource, setDataSource] = useState<T[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const fetchData = async (arg0: Recordable<any> = {}) => {
    const { current, pageSize } = pagination;
    let body = { pageNum: current, pageSize, ...arg0 };
    if (typeof params === 'function') {
      body = { ...body, ...params() };
    } else {
      body = { ...body, ...params };
    }
    setLoading(true);
    const res = await reqFn(body);
    setPagination((state) => ({
      ...state,
      current: body.pageNum,
      pageSize: body.pageSize,
      total: res ? res.entry.totalRecord : 0,
    }));
    setDataSource((res && res.entry.list) || []);
    setSelectedRowKeys([]);
    setLoading(false);
  };

  const helper = {
    refresh: () => fetchData(),
    search: (params: Recordable<any> = {}) => {
      fetchData({ ...params, pageNum: 1 });
    },
    goto: ({ current, pageSize }: { current: number; pageSize: number }) => {
      fetchData({ pageNum: current, pageSize });
    },
    unshiftItem: (item: T) => {
      setDataSource((state) => [item, ...state]);
    },
    tabs: (params: Recordable<any> = {}) => {
      fetchData({ ...params, pageNum: 1 });
    },
    setSelectedRowKeys,
  };

  return { loading, pagination, dataSource, selectedRowKeys, helper };
}
