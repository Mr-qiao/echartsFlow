/**
 * @file 新增类目属性-文件
 */
import React from 'react';

import type {FormRule} from 'antd';
import {Upload, Typography} from '@xlion/component'
import {IPropsType, RuleType} from '../types';
import {getSignature} from "@/services/common";

interface IProps {
}

export const rules = (rules: RuleType, label): FormRule[] => {
	return [{required: !!rules.required, message: `请上传${label || '文件'}`}];
};

const FileCpt: React.FC<IProps> = (options: any) => {
	const {value, onChange, customText = false, tip = true} = options
	const props: any = {
		listType: "text",
		tip: tip && '支持上传小于20M的文件',
		value,
		maxCount: options?.categoryPropertyRule?.max,
		disabled: options.read,
		size: options?.categoryPropertyRule?.size || 50,
		onChange: (newValue) => {
			onChange(newValue)
		},
		requestSign: async ({resourceName}) => {
			const {entry}: any = await getSignature({
				createTask: true,
				resourceName: resourceName,
				typeCode: 'SUPPLY_ADMIN_IMAGE_UPLOAD',
				operator: 124,
			});
			return entry
		}
	}
	//暂无联动属性
	return (
	 <>
		 <Upload  {...props}>
			 {customText ? <Typography.Link
				style={{
					display: 'inline-flex',
					width: 40,
					height: 40,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			 >
				 {customText}
			 </Typography.Link> : null}
		 </Upload>
	 </>
	);
};
export default FileCpt;
