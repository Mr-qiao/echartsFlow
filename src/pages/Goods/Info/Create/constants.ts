export enum AuditStatus {
  // 0待提报、1审核中、2已采用、3未采用
  WAIT = 0,
  AUDITING = 1,
  ADOPTED = 2,
  UNADOPTED = 3,
}

export enum AttrTypes {
  // 1-文本 2-数字 3-单选 4-多选 5-多行文本 6-数字区间 7-时间 8-时间区间 9-超链接 10-图片 11-多图 12-文件
  TEXT = 1,
  NUMBER = 2,
  SELECT = 3,
  MULTIPLE_SELECT = 4,
  TEXTAREA = 5,
  NUMBER_RANGE = 6,
  DATE = 7,
  DATE_RANGE = 8,
  LINK = 9,
  IMAGE = 10,
  MULTIPLE_IMAGE = 11,
  FILE = 12,
}

export enum IS_DISABLED {
  IS = 1,
  DISABLED = 0,
}

export const IS_DISABLED_DICT = {
  [IS_DISABLED.IS]: { text: '是', color: 'success', order: 0 },
  [IS_DISABLED.DISABLED]: { text: '否', color: 'default', order: 1 },
};
export enum USE_SCOPE_TYPE {
  SPU = 'spu',
  SKU = 'sku',
}
export const USE_SCOPE_TYPE_DICT = {
  [USE_SCOPE_TYPE.SPU]: { text: 'SPU（item级）', color: 'default' },
  [USE_SCOPE_TYPE.SKU]: { text: 'SKU', color: 'default' },
};

export enum GOODS_TYPE {
  DRAWREVIEW = 1,
  SAMPLESTYLE = 2,
  CLOTHESSTYLE = 3,
  PROOFDEMAND = 4,
  SELECTION = 5,
}
export const GOODS_TYPE_DICT = {
  [GOODS_TYPE.DRAWREVIEW]: { text: '图稿', color: 'default' },
  [GOODS_TYPE.SAMPLESTYLE]: { text: '样衣', color: 'default' },
  [GOODS_TYPE.CLOTHESSTYLE]: { text: '成衣', color: 'default' },
  [GOODS_TYPE.PROOFDEMAND]: { text: '打样需求', color: 'default' },
  [GOODS_TYPE.SELECTION]: { text: '选品', color: 'default' },
};

export enum ATTR_TYPE {
  // 单行文本、多行文本、金额、百分比、单选、多选、数值、数值区间、日期、日期区间、单图、多图、附件、URL网址
  TEXT = 1,
  TEXTAREA = 5,
  NUMBER_PRICE = 13,
  NUMBER_RATE = 14,
  RADIO = 3,
  CHECKBOX = 4,
  NUMBER = 2,
  NUMBER_RANGE = 6,
  DATE = 7,
  DATE_RANGE = 8,
  IMAGE = 10,
  IMAGE_MULTIPLE = 11,
  FILE = 12,
  LINK = 9,
}

export const ATTR_TYPE_DICT = {
  [ATTR_TYPE.TEXT]: { text: '单行文本', color: 'defautl', order: 0 },
  [ATTR_TYPE.TEXTAREA]: { text: '多行文本', color: 'defautl', order: 1 },
  [ATTR_TYPE.NUMBER_PRICE]: { text: '金额', color: 'defautl', order: 2 },
  [ATTR_TYPE.NUMBER_RATE]: { text: '百分比', color: 'defautl', order: 3 },
  [ATTR_TYPE.RADIO]: { text: '单选', color: 'defautl', order: 4 },
  [ATTR_TYPE.CHECKBOX]: { text: '多选', color: 'defautl', order: 5 },
  [ATTR_TYPE.NUMBER]: { text: '数值', color: 'defautl', order: 6 },
  [ATTR_TYPE.NUMBER_RANGE]: { text: '数值区间', color: 'defautl', order: 7 },
  [ATTR_TYPE.DATE]: { text: '日期', color: 'defautl', order: 8 },
  [ATTR_TYPE.DATE_RANGE]: { text: '日期区间', color: 'defautl', order: 9 },
  [ATTR_TYPE.IMAGE]: { text: '单图', color: 'defautl', order: 10 },
  [ATTR_TYPE.IMAGE_MULTIPLE]: { text: '多图', color: 'defautl', order: 11 },
  [ATTR_TYPE.FILE]: { text: '附件', color: 'defautl', order: 12 },
  [ATTR_TYPE.LINK]: { text: 'URL网址', color: 'defautl', order: 13 },
};
