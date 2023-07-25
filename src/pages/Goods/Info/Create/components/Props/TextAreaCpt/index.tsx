/**
 * @file 新增类目属性-多行文本
 */
import React from 'react';
import type {FormRule} from 'antd';

import {Input} from '@xlion/component';

import {RuleType} from '../types';
import {IPropsType} from "@/pages/Goods/Create/types";

interface IProps {
	[x: string]: any;
}

export const rules = (rules: RuleType): FormRule[] => {
	const arg = [
		{required: !!rules.required},
		{}
	]
	return arg;
};

const Index: React.FC<IPropsType> = (options: IPropsType) => {
	const {
		unit,
		categoryPropertyRule,
		desc,
		value,
		onChange
	} = options
	console.log(options,'多行文本')
	const props: any = {
		placeholder: desc || `请输入${options.categoryPropertyName}`,
		maxLength: categoryPropertyRule?.max,
		showCount: categoryPropertyRule?.max,
		value,
		onChange: (e) => {
			onChange(e.target.value)
		}
	}
	//暂无联动属性
	return (
	 <>
		 <Input.TextArea {...props} />
	 </>
	);
};

export default Index;
