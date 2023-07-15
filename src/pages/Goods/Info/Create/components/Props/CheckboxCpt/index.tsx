/**
 * @file 新增类目属性-多选
 */
import React from 'react';

import InputNumberRange from '@/components/InputNumberRange';
import type { FormRule } from 'antd';
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
