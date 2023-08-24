import GoodsTableCol from '@/components/goodsTableCol';
import { history } from 'umi';
import dayjs from 'dayjs';
import { DatePicker } from '@xlion/component';
import { XTableColumns, XTableSearchItem } from '@xlion/component/dist/x-table/interface';
import { DataType } from './types'
import {
  DomainTypeMap,
  AnswerTypeMap,
  StatusTypeMap,
  EnumStatusType,
  DomainTypeMapList,
  AnswerTypeMapList,
  StatusTypeMapList
} from './constants'
const { RangePicker } = DatePicker;
export default function useColumns(): [XTableSearchItem[], XTableColumns<DataType>] {
  // 搜索配置
  const searchColumns: XTableSearchItem[] = [
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
        options: DomainTypeMapList,
      },
    },
    {
      label: '报价类型',
      name: 'answerType',
      type: 'select',
      fieldProps: {
        options: AnswerTypeMapList,
      },
    },
    {
      label: '报价状态',
      name: 'status',
      type: 'select',
      fieldProps: {
        options: StatusTypeMapList,
      },
    },
    {
      label: '询价时间',
      name: 'time',
      type: 'dateTimeRange',
      renderFormItem: () => {
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
      renderFormItem: () => {
        return (
          <RangePicker
            showTime
            placeholder={['请选择开始时间', '请选择结束时间']}
          />
        );
      },
    },
  ]
  //   列表配置
  const tableColumns: XTableColumns<DataType> = [
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
      valueEnum: DomainTypeMap,
    },
    {
      title: '报价类型',
      dataIndex: 'answerType',
      valueEnum: AnswerTypeMap,
    },
    {
      title: '报价状态',
      dataIndex: 'status',
      valueEnum: StatusTypeMap,
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
        return recode.status !== EnumStatusType.FinishQuoted && recode.status !== EnumStatusType.Finish ? (
          <a
            onClick={() => {
              if (recode.answerType === 1) {
                history.push(`/quotations/editBoom/${recode.id}`);
                return;
              }
              history.push(`/quotations/edit/${recode.id}`);
            }}
          >
            {recode.status === EnumStatusType.FinishQuoted ? '修改报价' : '填写报价'}
          </a>
        ) : null;
      },
    },
  ];


  return [
    searchColumns, tableColumns
  ]

}