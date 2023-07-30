/**
 * @file 新增类目属性-链接
 */
import React from 'react';

import {Input, type FormRule} from '@xlion/component';
import {RuleType, IPropsType} from '../types';

export const rules = (rules: RuleType, label: string): FormRule[] => {
	return [
		{
			required: rules?.required,
			message: `请输入${label}`
		}, {
			pattern: /(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/gi,
			message: `请输入正确的URL地址`
		}
	];
};

const Index: React.FC<IPropsType> = (options): JSX.Element => {
	
	
	const {desc, categoryPropertyRule, read, value, onChange} = options
	
	
	const props: any = {
		placeholder: desc || `请输入${options?.categoryPropertyName}`,
		maxLength: categoryPropertyRule?.max,
		disabled: read === 1,
		value,
		onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
			onChange(event.target.value)
		}
	}
	
	return (
	 <>
		 <Input {...props} />
	 </>
	);
};
export default Index;
