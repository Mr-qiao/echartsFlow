/**
 * @file 新增类目属性-数字区间
 */
import React from 'react';
import type { FormRule } from 'antd';

import InputNumberRange from '@/components/InputNumberRange';

import { RuleType } from '../types';

interface IProps {}

export const rules = (rules: RuleType): FormRule[] => {
  return [{ required: true }];
};

const Index: React.FC<IProps> = () => {
  //暂无联动属性
  return (
    <>
      <InputNumberRange />
    </>
  );
};
export default Index;
