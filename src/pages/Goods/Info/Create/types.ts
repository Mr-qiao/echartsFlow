import { ATTR_TYPE, IS_DISABLED, USE_SCOPE_TYPE } from './constants';

//动态类目属性
export interface IPropsType {
  categoryId: number; //类目id
  categoryPropertyCode: string; //属性名称code
  categoryPropertyName: string; //属性名称
  categoryPropertyRule: RuleType;

  group: number; //分组id
  groupName: string; //分组名称
  groupOrder: number; // 分组排序

  itemCatePropertyValueEnumS: Array<{ label: string; value: string | number }>; //枚举值;

  order: number; //属性排序
  propertyId: number; //属性id 唯一
  propertyType: ATTR_TYPE;
  propertyTypeName: string; //propertyType 枚举值

  read: IS_DISABLED; //只读
  required: IS_DISABLED; //是否必填
  sku: IS_DISABLED; //是否sku
  custom: IS_DISABLED; //是否支持自定义  单选 /多选

  scope: USE_SCOPE_TYPE;

  desc: string; //备注

  unit: string | null; //单位
}

export type RuleType = {
  required: IS_DISABLED; //是否必填
  min: number | null; //最小值
  max: number | null; //最大值
  range: number | null; //数值范围
  radio: number | null; //小数位数
};
