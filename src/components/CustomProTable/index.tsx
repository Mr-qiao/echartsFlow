import { useEffect, useRef, useState } from 'react';

import { ProTable, ProTableProps } from '@ant-design/pro-components';
import type { OptionConfig } from '@ant-design/pro-table/es/components/ToolBar';
import C from 'classnames';

import observeNode from './observeNode';
// import type {OptionConfig}
/**
 *
 * @param props
 * @returns
 */
interface IProps extends Omit<ProTableProps<any, any>, 'options'> {
  ajaxRequest?: (params: any) => Promise<any>;
  getData?: (params: Recordable<any>) => void;
  options?: OptionConfig | boolean;
  onBefterSearch?: (params: any) => void;
}

const CustomProTable = ({
  columns,
  rowKey,
  search,
  dataSource,
  params,
  options,
  className,
  request,
  ajaxRequest,
  getData,
  onBefterSearch,
  ...reset
}: IProps) => {
  const proTableRef = useRef<HTMLDivElement>(null);
  const [proHeight, setProHeight] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);

  function getOffset(el) {
    if (!el) {
      return { top: 0, left: 0 };
    }
    const box = el?.getBoundingClientRect();
    return {
      top: box.top + window.pageYOffset - document.documentElement.clientTop,
      left: box.left + window.pageXOffset - document.documentElement.clientLeft,
    };
  }
  useEffect(() => {
    const updateHeight = () => {
      // const height = $(window).height();
      // const currentTop = $(proTableRef.current)?.offset()?.top;
      const height = document.documentElement.clientHeight;
      const currentTop = proTableRef.current?.offsetTop || 95;
      // const offsetTop = $(proTableRef.current)?.find('.ant-table-body')?.offset()?.top;
      const offsetTop = getOffset(
        proTableRef.current?.querySelector('.ant-table-body'),
      ).top;
      setScrollHeight(height - offsetTop - 40);
      setProHeight(height - currentTop);
    };
    updateHeight();
    return observeNode(proTableRef.current, updateHeight);
  }, []);
  // const= props;
  return (
    <div ref={proTableRef}>
      <ProTable
        columns={columns}
        form={{ labelCol: { span: 5 } }}
        className={C(className, 'card-columns-table')}
        style={{ height: `${proHeight}px` }}
        params={params}
        scroll={{ y: `${scrollHeight}px` }}
        request={async (params, sorter, filter) => {
          try {
            if (ajaxRequest) {
              const o: any = onBefterSearch ? onBefterSearch(params) : params;
              const { current, pageSize, ...reset } = o;
              let searchData = {
                ...reset,
                ...sorter,
                pageNum: current || 1,
                pageSize: pageSize || 10,
              };
              const data: any = await ajaxRequest(searchData);
              const list = Array.isArray(data) ? data : data.entry?.list;
              getData?.(list);
              return {
                data: list || [],
                success: true,
                total: data.entry?.totalRecord || 0,
              };
            } else if (request) {
              return request(params, sorter, filter);
            } else {
              return Promise.resolve({
                data: dataSource,
                success: true,
                total: dataSource?.length,
              });
            }
          } catch (e) {
            // console.log(e);
            return Promise.resolve({
              data: [],
              success: true,
              total: 0,
            });
          } finally {
          }
        }}
        options={
          typeof options === 'boolean' && options
            ? { density: true, reload: true, setting: true }
            : options
        }
        search={
          !search
            ? false
            : {
                defaultCollapsed: true,
                span: 6,
                ...search,
              }
        }
        editable={{
          type: 'multiple',
        }}
        rowKey={rowKey}
        {...reset}
      />
    </div>
  );
};
CustomProTable.defaultProps = {
  columns: [],
  rowKey: 'id',
  search: {},
  dataSource: [],
  // ajaxRequest: () => Promise.resolve(),
  params: {},
  options: false,
  getData: () => {},
  className: '',
  size: 'large',

  // toolbar:
};
export default CustomProTable;
