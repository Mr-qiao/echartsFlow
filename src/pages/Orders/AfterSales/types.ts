import {
  AFTER_SALES_TYPE,
  ORDER_SHOP_STATUS,
  ORDER_STATUS,
  PLATFORM_STATUS,
} from './constants';

enum QUESTION_TYPE {}
enum ORDER_QUESTION_TYPE {}

export type DictType = Array<{ label: string; value: number | string }>;

export type GoodsInfoType = {
  id: number; //主键ID
  oId: number; //订单内部单号，唯一
  skuId: string; //基本信息 - 商品编码
  pic: string; //基本信息 - 商品图片
  shopSkuId: string; //基本信息 - 商品id（店铺商品编码）
  rawSoId: string; //基本信息 - 平台单号（原始线上单号）
  anchorName: string; //平台信息 - 主播
  name: string; //平台信息 - 商品名称
  propertiesValue: string; //规格 - 规格
  qty: number; //规格 - 退款数量
  shopAmount: number; //规格 - 申请金额（线上明细金额） 类型转换
  rQty: number; //退款信息 - 实退数（实收退货数量）
  linkOId: string; //退款信息 - 实际单号

  extra: string; //附属字段
  gmtCreate: string; //创建时间
  gmtModified: string; //修改时间
  creator: string; //创建人
  modifier: string; //修改人
};
export type DataType = {
  id: number;

  questionType: string | QUESTION_TYPE; //售后信息 - 问题类型 （？？？未确定 是否枚举）
  type: AFTER_SALES_TYPE; //售后信息 - 售后类型
  shopStatus: PLATFORM_STATUS; //售后信息 - 平台状态
  asId: number; //售后信息 - 售后单号
  outerAsId: string; //售后信息 - 平台售后单

  buyerApplyRefund: number; //售后资料 - 申请金额
  itemQtyTotal: number; //售后资料 - 申请数量
  refund: number; //售后资料 - 实退金额
  itemRQtyTotal: number; //售后资料 - 实退数量
  remark: string; //售后资料 - 备注

  orderStatus: ORDER_STATUS; //原单系统信息 - 订单状态
  paidAmount: number; //原单系统信息 - 支付金额
  factoryName: string; //原单系统信息 - 发货工厂
  orderQuestionType: string | ORDER_QUESTION_TYPE; //原单系统信息 - 问题类型 （？？？未确定 是否枚举）
  oId: number; //原单系统信息 - 单号
  addressIdNameList: Array<{ id: number; name: string }>; //原单系统信息-发货工厂供应商id和工厂映射

  anchorName: string; //平台信息 - 主播
  shopName: string; //平台信息 - 店铺
  orderFrom: string; //平台信息 - 来源
  orderShopStatus: ORDER_SHOP_STATUS; //平台信息 - 平台状态   （？？？未确定
  soId: string; //平台信息 - 单号

  items: GoodsInfoType[]; //商品信息

  asDate: string; //日期信息 - 申请日期
  payDate: string; //日期信息 - 付款日期
  orderDate: string; //日期信息 - 下单日期
  modified: string; //日期信息 - 更新日期
  sendDate: string; //日期信息 - 发货日期

  refundFactoryName: string; //售后地址 - 工厂
  receiverName: string; //售后地址 - 收件人
  receiverMobile: string; //售后地址 - 手机号
  receiverAddress: string; //售后地址 - 地址

  logisticsCompany: string; //退货信息 - 快递
  lId: string; //退货信息 - 单号
  receiveDate: string; //退货信息 - 入仓时间

  [key: string]: any;
};
