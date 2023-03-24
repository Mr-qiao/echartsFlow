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
