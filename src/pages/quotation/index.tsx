import { ProTable } from '@ant-design/pro-components';
import { Button, DatePicker } from 'antd';
import { useRef, useState } from 'react';
import GoodsTableCol from '@/components/goodsTableCol';
import { history } from 'umi';
import { queryList } from '@/pages/quotation/apis';
import moment from 'moment';
import { filterPageName } from '@/utils';

const { RangePicker } = DatePicker;

function Quotation() {
  const [activeKey, setActiveKey] = useState('0');
  const actionRef = useRef() as any;
  const columns: any = [
    {
      title: '商品ID',
      dataIndex: 'itemId',
      search: false,
    },
    {
      title: '款式编码',
      dataIndex: 'itemSysCode',
      hideInTable: true,
    },
    {
      title: '商品名称',
      dataIndex: 'itemTitle',
      hideInTable: true,
    },
    {
      title: '商品信息',
      width: 400,
      search: true,
      render: (_: any, recode: any) => {
        console.log(recode, 'imgUrlList');
        return (
          <GoodsTableCol
            imgs={recode?.imgUrlList?.map((item: any) => ({ src: item }))}
            nameArr={[
              {
                title: '商品名称',
                key: recode?.itemTitle,
              },
              {
                title: '商品类目',
                key: recode?.categoryName,
              },
              {
                title: '商品品牌',
                key: recode?.brandName,
              },
              {
                title: '颜色',
                key: recode?.color,
              },
              {
                title: '尺码',
                key: recode?.size,
              },
            ]}
          />
        );
      },
    },
    {
      title: '询价用途',
      dataIndex: 'domainType',
      valueEnum: {
        1: '样衣',
        2: '款式',
      },
    },
    {
      title: '报价类型',
      dataIndex: 'answerType',
      valueEnum: {
        1: '成品报价',
        2: 'boom报价',
      },
    },
    {
      title: '报价状态',
      dataIndex: 'status',
      valueEnum: {
        1: '未开始',
        2: '待报价',
        3: '已报价',
        4: '已结束',
        5: '已采用',
      },
    },
    {
      title: '预计采购量',
      dataIndex: 'number',
      search: false,
    },
    {
      title: '创建时间',
      dataIndex: 'time',
      hideInTable: true,
      renderFormItem: (item: any, _: any, form: any) => {
        return <RangePicker showTime />;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'startTime',
      search: false,
      width: 180,
      render: (_: any, recode: any) => {
        return (
          <div>{moment(recode.startTime).format('YYYY-MM-DD HH:mm:ss')}</div>
        );
      },
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      search: false,
      width: 180,
      render: (_: any, recode: any) => {
        return (
          <div>{moment(recode.endTime).format('YYYY-MM-DD HH:mm:ss')}</div>
        );
      },
    },
    {
      title: '操作',
      search: false,
      align: 'center',
      fixed: 'right',
      width: 100,
      render: (_: any, recode: any) => {
        return recode.status !== 1 && recode.status !== 4 ? (
          <a
            onClick={() => {
              if (recode.answerType === 1) {
                history.push(`/quotation/editBoom/${recode.id}`);
                return;
              }
              history.push(`/quotation/edit/${recode.id}`);
            }}
          >
            {recode.status === 3 ? '修改报价' : '填写报价'}
          </a>
        ) : null;
      },
    },
  ];
  return (
    <ProTable
      columns={columns}
      scroll={{
        x: 1440,
      }}
      rowKey={'index'}
      search={{
        labelWidth: 120,
        defaultCollapsed: false,
      }}
      actionRef={actionRef}
      request={async (
        // 第一个参数 params 查询表单和 params 参数的结合
        // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
        params,
        sort,
        filter,
      ) => {
        const arg0 = {
          status: activeKey === '0' ? undefined : activeKey,
          ...filterPageName(params),
          itemIdList: params.itemId && [params.itemId],
          startTime:
            params.time?.length > 0
              ? moment(params.time[0]).valueOf()
              : undefined,

          endTime:
            params.time?.length > 0
              ? moment(params.time[1]).valueOf()
              : undefined,
        };
        const res = await queryList(arg0, {});
        const data = res.entry.list;
        return {
          data: data,
          success: res.success,
          // 不传会使用 data 的长度，如果是分页一定要传
          total: res?.entry.totalRecord,
        };
      }}
      defaultSize={'small'}
      form={{
        size: 'small',
      }}
      toolbar={
        {
          menu: {
            type: 'tab',
            activeKey: activeKey,
            items: [
              {
                key: '0',
                label: <span>全部</span>,
              },
              {
                key: '2',
                label: <span>待报价</span>,
              },
              {
                key: '3',
                label: <span>已报价</span>,
              },
              {
                key: '4',
                label: <span>已失效</span>,
              },
            ],
            onChange: (key: string) => {
              console.log(key, actionRef, 'key');
              setActiveKey(key as string);
              actionRef.current.reload();
            },
          },
        } as any
      }
    ></ProTable>
  );
}

export default Quotation;
