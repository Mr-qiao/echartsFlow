export const SALES_ORDER_TABLIST = [
  {
    key: '2',
    label: '发货中',
    value: undefined,
    count: undefined,
  },
  {
    key: '3',
    label: '已发货',
    value: undefined,
    count: undefined,
  },
  {
    key: '4',
    label: '异常',
    value: undefined,
    count: undefined,
  },
  {
    key: '5',
    label: '已取消',
    value: undefined,
    count: undefined,
  },
  {
    key: '0',
    label: '全部',
    value: undefined,
    count: undefined,
  },
];


export const PLATFORM_ORDERSTATUS = {
  1: '系统订单',
  2: '平台订单'
};



export const PlATFORM_ORDER_TYPE = [
  {
    label: '等待买家付款',
    value: 1
  },
  {
    label: '等待卖家发货',
    value: 2
  },
  {
    label: '等待买家确认收货',
    value: 3
  },
  {
    label: '交易成功',
    value: 4
  },
  {
    label: '付款后交易关闭',
    value: 5
  },
  {
    label: '付款前交易关闭',
    value: 6
  },
]

export const ORDER_STATUS_1_TYPE = [
  {
    label: '已付款待审核',
    value: 1
  },
  {
    label: '已客审待财审',
    value: 2
  },
  {
    label: '发货中',
    value: 3
  },
  {
    label: '已发货',
    value: 4
  },
  {
    label: '异常',
    value: 5
  },
  {
    label: '已取消',
    value: 6
  },
]


export const ORDER_TIME_TYPE = {
  1: '付款日期',
  2: '下单日期',
  3: '计划发货日期',
  4: '更新日期选择',
  5: '发货日期'
}