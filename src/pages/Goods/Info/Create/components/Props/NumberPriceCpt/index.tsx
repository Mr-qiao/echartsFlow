/**
 * @file 新增类目属性-数字 金额
 */
import React from 'react';
import type {FormRule} from 'antd';

import {InputNumber} from '@xlion/component';

import {RuleType} from '../types';
import {IPropsType} from "@/pages/Goods/Create/types";

interface IProps {
	[x: string]: any;
}

export const rules = (rules: RuleType): FormRule[] => {
	const arg = [
		{required: !!rules.required},
	
	]
	return arg;
};

const NumberPriceCpt: React.FC<IPropsType> = (options: IPropsType) => {
	const {unit, desc, value, onChange} = options
	const props: any = {
		addonAfter: unit || undefined,
		placeholder: desc || `请输入${options.categoryPropertyName}`,
		maxLength: options?.categoryPropertyRule?.max,
		disabled: options.read,
		precision: 2,
		value: value / 1000,
		onChange: (e) => {
			onChange(e * 1000)
		}
	}
	//暂无联动属性
	return (
	 <>
		 <InputNumber style={{width: '100%'}} {...props} />
	 </>
	);
};

export default NumberPriceCpt;
