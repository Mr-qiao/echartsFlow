/**
 * @file 新增类目属性-数字百分比
 */
import type { FormRule } from 'antd';
import React from 'react';

import { InputNumber } from '@xlion/component';

import { IPropsType } from '@/pages/Goods/Create/types';
import { RuleType } from '../types';

interface IProps {
  [x: string]: any;
}

export const rules = (rules: RuleType): FormRule[] => {
  const num = (value) => {
    let i: any = undefined;
    switch (value) {
      case 1:
        i = 1;
        break;
      case 2:
        i = 0;
        break;
    }
    return i;
  };
  const arg: any = [
    { required: !!rules.required },
    { min: num(rules.range), type: 'number', message: `请输入正确的值` },
  ];
  return arg;
};

const NumberRateCpt: React.FC<IPropsType> = (options: IPropsType) => {
  const { unit, desc, value, onChange } = options;
  console.log(options, '数字百分比');
  const props: any = {
    addonAfter: unit || undefined,
    placeholder: desc || `请输入${options.categoryPropertyName}`,
    maxLength: options?.categoryPropertyRule?.max,
    disabled: options.read,
    precision: options?.categoryPropertyRule?.radio,
    value,
    onChange: (e) => {
      console.log(e, 'e');
      onChange(e);
    },
  };
  //暂无联动属性
  return (
    <>
      <InputNumber style={{ width: '100%' }} {...props} />
    </>
  );
};

export default NumberRateCpt;
