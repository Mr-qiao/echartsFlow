import SelectCpt from '@/components/selectCpt';
import BatchInput from '@/components/batchInput';
import dayjs from 'dayjs';

import { history } from 'umi';

// 搜索列表
export const SearchColumns = ({ tabKey }) => {
  const columns: any[] = [
    {
      label: '采购单号',
      name: 'purNoList',
      type: 'input',
      renderFormItem: () => <BatchInput />,
    },
    {
      label: '货品编码',
      name: 'skuSysCodeList',
      type: 'input',
      renderFormItem: () => <BatchInput />,
    },
    {
      label: '预计交付日期',
      name: 'time',
      type: 'dateRange',
      transform: (value) => {
        return {
          expectedStartTime: value[0].format('YYYY-MM-DD HH:mm:ss'),
          expectedEndTime: value[1].format('YYYY-MM-DD HH:mm:ss'),
        };
      },
    },
    {
      label: '采购状态',
      name: 'status',
      type: 'select',
      hide: !!!(tabKey === '0'),
      fieldProps: {
        options: [
          { label: '待确认', value: 2 },
          { label: '已确认', value: 3 },
          { label: '已驳回', value: 4 },
        ],
      },
    },
    {
      label: '采购员',
      name: 'buyer',
      renderFormItem: () => <SelectCpt style={{ width: '100%' }} showArrow={true} />,
    },
  ]
  return columns;
}

// 列表
export const TableColumns = () => {
  const columns: any[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 100
    },
    {
      title: '采购订单',
      dataIndex: 'purNo',
      width: 280,
      render: (_: any, recode: any) => {
        return (
          <a
            onClick={() => {
              history.push(`/orders/purchase-detail/${recode.id}`);
            }}
          >
            {_}
          </a>
        );
      },
    },
    {
      title: 'SKU数',
      dataIndex: 'skuNumber',
    },
    {
      title: '采购数量',
      dataIndex: 'number',
    },
    {
      title: '采购金额',
      dataIndex: 'amount',
    },
    {
      title: '预计交付日期',
      dataIndex: 'expectedTime',
      render: (i: any) => dayjs(i).format('YYYY-MM-DD'),
    },
    {
      title: '采购状态',
      dataIndex: 'status',
      valueEnum: {
        2: '待确认',
        3: '已确认',
        4: '已驳回',
      },
    },
    {
      title: '采购员',
      dataIndex: 'buyer',
    },
    {
      title: '操作',
      fixed: 'right',
      width: 60,
      search: false,
      render: (_: any, recode: any) => {
        return (
          <a
            onClick={() => {
              history.push(`/orders/purchase-detail/${recode.id}`);
            }}
          >
            查看
          </a>
        );
      },
    },
  ];

  return columns;
};

