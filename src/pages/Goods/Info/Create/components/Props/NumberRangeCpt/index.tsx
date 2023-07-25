/**
 * @file 新增类目属性-数值区间
 */
import React from 'react';



import {RuleType} from '../types';
import {IPropsType} from "@/pages/Goods/Create/types";
import {InputNumberRange} from "@xlion/component";

interface IProps {
	[x: string]: any;
}

export const rules = (rules: RuleType): ({ required: boolean } | { min: number | null } | { max: number | null })[] => {
	return [
		{required: !!rules.required},
	];
};

const NumberRangeCpt: React.FC<IPropsType> = (options: IPropsType) => {
	const {unit, desc, value, onChange} = options
	const props: any = {
		addonAfter: unit || undefined,
		placeholder: desc || `请输入${options.categoryPropertyName}`,
		max: options?.categoryPropertyRule?.max,
		min: options?.categoryPropertyRule?.min,
		disabled: options.read,
		value: unit === '元' ? [value?.[0] / 1000, value?.[1] / 1000] : value,
		onChange: (e) => {
			onChange(unit === '元' ? [e?.[0] * 1000, e?.[1] * 1000] : e)
		}
	}
	//暂无联动属性
	return (
	 <>
		 <InputNumberRange style={{width: '100%'}} {...props} />
	 </>
	);
};

export default NumberRangeCpt;
