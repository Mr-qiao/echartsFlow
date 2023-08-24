import './index.less'
import { Button, Space } from "@xlion/component";
import { history } from "umi";
import React, { MouseEventHandler } from "react";

/**
 * 吸低按钮组件
 * 使用时应为组件最外层模块使用
 * @param props
 * @constructor
 */

interface propsType {
	// 确定按钮文本 可选
	okText?: string
	// 取消按钮文本 可选
	closeText?: string
	// 确定按钮事件 可选
	onOk?: MouseEventHandler
	// 取消按钮事件 可选
	onClose?: MouseEventHandler
	// 自定义插槽 可选
	children?: React.ReactElement
}

function BottomButton(props: propsType) {
	const {
		okText = '确定', closeText = '取消', onOk = () => {
		}, onClose = () => {
			history.back()
		}, children
	} = props
	return (
		<div className={'bottom-button'}>
			<div className={'bottom-button-children'}>
				<Space>
					<Button type={'primary'} onClick={onOk}>{okText}</Button>
					<Button onClick={onClose}>{closeText}</Button>
					{children}
				</Space>
			</div>
		</div>
	)
}

export default BottomButton