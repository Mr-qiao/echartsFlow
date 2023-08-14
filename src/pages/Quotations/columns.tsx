import GoodsTableCol from '@/components/goodsTableCol';
import { history } from 'umi';
import dayjs from 'dayjs';
import { DatePicker } from '@xlion/component';


const { RangePicker } = DatePicker;

// 搜索列表
export const SearchColumns = () => {
  const columns: any[] = [
    {
      label: '款式编码',
      name: 'itemSysCode',
      type: 'input',
    },
    {
      label: '商品名称',
      name: 'itemTitle',
      type: 'input',
    },
    {
      label: '询价用途',
      name: 'domainType',
      type: 'select',
      fieldProps: {
        options: [
          { label: '样衣', value: 1 },
          { label: '款式', value: 2 },
        ],
      },
    },
    {
      label: '报价类型',
      name: 'answerType',
      type: 'select',
      fieldProps: {
        options: [
          { label: '成品报价', value: 1 },
          { label: 'boom报价', value: 2 },
        ],
      },
    },
    {
      label: '报价状态',
      name: 'status',
      type: 'select',
      fieldProps: {
        options: [
          { label: '未开始', value: 1 },
          { label: '待报价', value: 2 },
          { label: '已报价', value: 3 },
          { label: '已结束', value: 4 },
        ],
      },
    },
    {
      label: '询价时间',
      name: 'time',
      type: 'dateTimeRange',
      renderFormItem: (item: any, _: any, form: any) => {
        return (
          <RangePicker
            showTime
            placeholder={['请选择开始时间', '请选择结束时间']}
          />
        );
      },
    },
    {
      label: '报价时间',
      name: 'bjTime',
      type: 'dateTimeRange',
      renderFormItem: (item: any, _: any, form: any) => {
        return (
          <RangePicker
            showTime
            placeholder={['请选择开始时间', '请选择结束时间']}
          />
        );
      },
    },
  ]
  return columns;
}

// 列表
export const TableColumns = () => {
  const columns: any[] = [
    {
      title: '商品ID',
      dataIndex: 'itemId',
    },
    {
      title: '商品信息',
      render: (_: any, recode: any) => {
        return (
          <GoodsTableCol
            imgList={recode?.imgUrlList?.map((item: any) => ({ src: item }))}
            infoList={[
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
        // 5: '已采用',
      },
    },
    {
      title: '预计采购量',
      dataIndex: 'number',
    },
    {
      title: '询价日期',
      dataIndex: 'askTime',
      width: 180,
      render: (_: any, recode: any) => {
        return (
          <div>{dayjs(recode.askTime).format('YYYY-MM-DD HH:mm:ss')}</div>
        );
      },
    },
    {
      title: '报价截止日期',
      dataIndex: 'askEndTime',
      width: 180,
      render: (_: any, recode: any) => {
        return (
          <div>{dayjs(recode.askEndTime).format('YYYY-MM-DD HH:mm:ss')}</div>
        );
      },
    },
    {
      title: '操作',
      align: 'center',
      fixed: 'right',
      width: 100,
      render: (_: any, recode: any) => {
        return recode.status !== 1 && recode.status !== 4 ? (
          <a
            onClick={() => {
              if (recode.answerType === 1) {
                history.push(`/quotations/editBoom/${recode.id}`);
                return;
              }
              history.push(`/quotations/edit/${recode.id}`);
            }}
          >
            {recode.status === 3 ? '修改报价' : '填写报价'}
          </a>
        ) : null;
      },
    },
  ];

  return columns;
};

