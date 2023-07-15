/**
 * @file 新增类目属性-单行文本
 */
import type { FormRule } from 'antd';
import React from 'react';

import InputNumberRange from '@/components/InputNumberRange';

import { RuleType } from '../types';

interface IProps {
  [x: string]: any;
}

export const rules = (rules: RuleType): FormRule[] => {
  return [{ required: !!rules.required }];
};

const Index: React.FC = (options) => {
  console.log(options);
  //暂无联动属性
  return (
    <>
      <InputNumberRange />
    </>
  );
};

export default Index;
