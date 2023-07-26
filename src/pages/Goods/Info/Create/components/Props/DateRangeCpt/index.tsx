/**
 * @file 新增类目属性-日期区间
 */
import type { FormRule } from 'antd';
import React from 'react';

import { DatePicker } from '@xlion/component';

import { IPropsType } from '@/pages/Goods/Create/types';
import dayjs from 'dayjs';
import { isArray } from 'lodash';
import { RuleType } from '../types';

interface IProps {
  [x: string]: any;
}

export const rules = (rules: RuleType): FormRule[] => {
  const arg = [{ required: !!rules.required }];
  return arg;
};

const NumberCpt: React.FC<IPropsType> = (options: IPropsType) => {
  const { unit, value, onChange } = options;
  const newValue = () => {
    if (!value) return undefined;
    if (isArray(value)) {
      if (value.length <= 0) return undefined;
      return [dayjs(value[0]), dayjs(value[1])];
    }
    return [dayjs(value[0]), dayjs(value[1])];
  };
  const props: any = {
    placeholder: [
      `请选择${options.categoryPropertyName}`,
      `请选择${options.categoryPropertyName}`,
    ],
    maxLength: options?.categoryPropertyRule?.max,
    disabled: options.read,
    value: newValue(),
    onChange: (e) => {
      if (!e || !isArray(e) || e.length === 0) return;
      onChange([
        dayjs(e[0]).format('YYYY-MM-DD'),
        dayjs(e[1]).format('YYYY-MM-DD'),
      ]);
    },
  };
  //暂无联动属性
  return (
    <>
      <DatePicker.RangePicker style={{ width: '100%' }} {...props} />
    </>
  );
};

export default NumberCpt;
