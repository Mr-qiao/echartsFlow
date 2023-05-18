//售后类型
export enum AFTER_SALES_TYPE {
  REFUND = '仅退款',
  RETURN_SREFUND = '普通退货',
  OHTER = '其他',
  REJECTIONS = '拒收退货',
  COMPLAINT = '投诉',
  EXCHANGE_GOODS = '换货',
  REPAIR = '维修',
  REISSUE = '补发',
}
export const AFTER_SALES_DICT = {
  [AFTER_SALES_TYPE.REFUND]: { text: '仅退款', color: 'green' },
  [AFTER_SALES_TYPE.RETURN_SREFUND]: { text: '普通退货', color: 'purple' },
  [AFTER_SALES_TYPE.OHTER]: { text: '其他', color: 'default' },
  [AFTER_SALES_TYPE.REJECTIONS]: { text: '拒收退货', color: 'error' },
  [AFTER_SALES_TYPE.COMPLAINT]: { text: '投诉', color: 'warning' },
  [AFTER_SALES_TYPE.EXCHANGE_GOODS]: { text: '换货', color: 'processing' },
  [AFTER_SALES_TYPE.REPAIR]: { text: '维修', color: 'processing' },
  [AFTER_SALES_TYPE.REISSUE]: { text: '补发', color: 'processing' },
};

//平台状态
export enum PLATFORM_STATUS {
  WAIT_SELLER_AGREE = 'WAIT_SELLER_AGREE',
  WAIT_BUYER_RETURN = 'WAIT_BUYER_RETURN_GOODS',
  WAIT_SELLER_CONFIRM = 'WAIT_SELLER_CONFIRM_GOODS',
  BUYER_REJECT_REFUND = 'SELLER_REFUSE_BUYER',
  // SELLER_SENDGOODS_EXCHANGE,
  // SELLER_SENDGOODS_RESEND,
  // WAIT_SHIPPED_EXCHANGE_GOODS,
  TRADE_CLOSE = 'CLOSED',
  REFUND = 'SUCCESS',
}
export const PLATFORM_DICT = {
  [PLATFORM_STATUS.WAIT_SELLER_AGREE]: {
    text: '等待卖家同意',
    color: 'warning',
  },
  [PLATFORM_STATUS.WAIT_BUYER_RETURN]: {
    text: '等待买家退货',
    color: 'purple',
  },
  [PLATFORM_STATUS.WAIT_SELLER_CONFIRM]: {
    text: '等待商家确认收货',
    color: 'warning',
  },
  [PLATFORM_STATUS.BUYER_REJECT_REFUND]: {
    text: '卖家拒绝退款',
    color: 'error',
  },
  //  [PLATFORM_STATUS.SELLER_SENDGOODS_EXCHANGE]:{ text: '换货卖家发货',  ,color: 'green'  },
  //  [PLATFORM_STATUS.SELLER_SENDGOODS_RESEND]:{ text: '补发卖家发货',   ,color: 'green' },
  //  [PLATFORM_STATUS.WAIT_SHIPPED_EXCHANGE_GOODS]:{ text: '待发出换货商品',  ,color: 'green'  },
  [PLATFORM_STATUS.TRADE_CLOSE]: { text: '退款关闭', color: 'default' },
  [PLATFORM_STATUS.REFUND]: { text: '退款成功', color: 'green' },
};

//原订单状态
export enum ORDER_STATUS {
  WAITPAY = 'WaitPay', //? 和原型不一致
  WAIT = 'WaitConfirm',
  SENDING = 'Delivering',
  SENDED = 'Sent',
  ABNORMAL = 'Question',
  MERGED = 'Merged',
  SPLIT = 'Split',
  WAITQUTERSENT = 'WaitOuterSent', // ? 和原型不一致
  WAITFCONFIRM = 'WaitFConfirm', //? 和原型不一致
  CANCELED = 'Cancelled',
}
export const ORDER_STATUS_DICT = {
  [ORDER_STATUS.WAITPAY]: { text: '待付款', color: 'warning' },
  [ORDER_STATUS.WAIT]: { text: '已付款待审核', color: 'volcano' },
  [ORDER_STATUS.SENDING]: { text: '发货中', color: 'processing' },
  [ORDER_STATUS.SENDED]: { text: '已发货', color: 'green' },
  [ORDER_STATUS.ABNORMAL]: { text: '异常', color: 'warning' },
  [ORDER_STATUS.MERGED]: { text: '被合并', color: 'default' },
  [ORDER_STATUS.SPLIT]: { text: '被拆分', color: 'default' },
  [ORDER_STATUS.WAITQUTERSENT]: { text: '等供销商|外仓发货', color: 'gold' },
  [ORDER_STATUS.WAITFCONFIRM]: { text: '已客审待财审', color: 'magenta' },
  [ORDER_STATUS.CANCELED]: { text: '已取消', color: 'default' },
};

export enum ORDER_SHOP_STATUS {
  WAIT_BUYER_PAY = 'WAIT_BUYER_PAY',
  WAIT_SELLER_SEND_GOODS = 'WAIT_SELLER_SEND_GOODS',
  WAIT_BUYER_CONFIRM_GOODS = 'WAIT_BUYER_CONFIRM_GOODS',
  TRADE_FINISHED = 'TRADE_FINISHED',
  TRADE_CLOSED = 'TRADE_CLOSED',
  TRADE_CLOSED_BY_TAOBAO = 'TRADE_CLOSED_BY_TAOBAO',
}
export const ORDER_SHOP_STATUS_DICT = {
  [ORDER_SHOP_STATUS.WAIT_BUYER_PAY]: {
    text: '等待买家付款',
    color: 'warning',
  },
  [ORDER_SHOP_STATUS.WAIT_SELLER_SEND_GOODS]: {
    text: '等待卖家发货',
    color: 'volcano',
  },
  [ORDER_SHOP_STATUS.WAIT_BUYER_CONFIRM_GOODS]: {
    text: '等待买家确认收货',
    color: 'processing',
  },
  [ORDER_SHOP_STATUS.TRADE_FINISHED]: { text: '交易成功', color: 'green' },
  [ORDER_SHOP_STATUS.TRADE_CLOSED]: {
    text: '付款后交易关闭',
    color: 'default',
  },
  [ORDER_SHOP_STATUS.TRADE_CLOSED_BY_TAOBAO]: {
    text: '付款前交易关闭',
    color: 'default',
  },
};
