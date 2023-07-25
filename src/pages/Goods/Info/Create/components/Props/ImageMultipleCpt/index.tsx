/**
 * @file 新增类目属性-多图
 */
import React from 'react';

import type {FormRule} from 'antd';
import {Upload, Typography, Popover, PreviewImage, Divider, Thumbnail} from '@xlion/component'
import {IPropsType, RuleType} from '../types';
import {getSignature} from "@/services/common";

interface IProps {
}

export const rules = (rules: RuleType, label): FormRule[] => {
	return [{required: !!rules.required, message: `请上传${label || '图片'}`}];
};

const ImageCpt: React.FC<IProps> = (options: any) => {
	const {
		value,
		onChange,
		style = false,
		thumbnailSize,
		customText = false,
		tip = true,
		itemRender = false
	} = options
	const props: any = {
		listType: "picture-card",
		tip: tip && `最多上传${options?.categoryPropertyRule?.max || '无限制'}张图片，支持支持JPG，JPEG，PNG格式，每张图片小于${options?.categoryPropertyRule?.size || 5}M`,
		value,
		accept: 'image/jpg,image/png,image/jpeg,image/gif',
		maxCount: options?.categoryPropertyRule?.max || 9999999999999,
		disabled: options.read,
		size: options?.categoryPropertyRule?.size || 5,
		onChange: (newValue) => {
			onChange(newValue)
		},
		itemRender: itemRender ? (originNode, file, fileList, actions) => {
			return (
			 <Popover
				placement="top"
				content={
					<>
						<Typography.Link
						 onClick={() => PreviewImage.show({list: [file.url]})}
						>
							预览
						</Typography.Link>
						<Divider type="vertical"/>
						<Typography.Link onClick={actions.remove}>删除</Typography.Link>
					</>
				}
			 >
				 <div>
					 <Thumbnail
						disabled
						size={thumbnailSize}
						key={file.url || file.uid}
						url={file.url}
						percent={file.percent}
					 />
				 </div>
			 </Popover>
			);
		} : undefined,
		thumbnailProps: {size: thumbnailSize || undefined},
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
	console.log(props, '多图props')
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
export default ImageCpt;
