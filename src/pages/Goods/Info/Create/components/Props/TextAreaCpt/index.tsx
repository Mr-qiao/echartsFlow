/**
 * @file 新增类目属性-多行文本
 */
import type { FormRule } from 'antd';
import React from 'react';

import { Input } from '@xlion/component';

import { IPropsType } from '@/pages/Goods/Create/types';
import { RuleType } from '../types';

interface IProps {
  [x: string]: any;
}

export const rules = (rules: RuleType): FormRule[] => {
  const arg: any = [
    { required: !!rules.required },
    { max: rules.max },
    { min: rules.min },
  ];
  return arg;
};

const Index: React.FC<IPropsType> = (options: IPropsType) => {
  const { unit, categoryPropertyRule, desc, value, onChange } = options;
  console.log(options, '多行文本');
  const props: any = {
    placeholder: desc || `请输入${options.categoryPropertyName}`,
    maxLength: categoryPropertyRule?.max,
    showCount: categoryPropertyRule?.max,
    disabled: options.read,
    value,
    onChange: (e) => {
      onChange(e.target.value);
    },
  };
  //暂无联动属性
  return (
    <>
      <Input.TextArea {...props} />
    </>
  );
};

export default Index;
