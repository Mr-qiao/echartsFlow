import { ATTR_TYPE, IS_DISABLED, PROPS_RANGE } from './constants';

//动态类目属性
export interface IPropsType {
  itemPropertyId: number; //类目id

  itemPropertyCode: string; //属性名称code
  itemPropertyName: string; //属性名称
  itemPropertyType: ATTR_TYPE;
  itemPropertyValues: string;


  unit: string | null; //单位


}

export type RuleType = {
  required: IS_DISABLED; //是否必填
  min: number | null; //最小值
  max: number | null; //最大值
  range: PROPS_RANGE | null; //数值范围
  radio: number | null; //小数位数
};
