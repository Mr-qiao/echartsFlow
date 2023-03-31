import {
	Input,
	message,
	Popover
} from "antd"
import React, { useState } from 'react'

const BatchInput = (props) => {
	const [inputValue, setInputValue] = useState<any>()
	const [textAreaCode, setTextAreaCode] = useState<any>();
	const {
		value,
		onChange = () => { },
		...rest
	} = props;
	const handleChange = (e) => {
		console.log(e.target.value)
		// setInputValue(e.target.value)
		onChange(e.target.value)
	}

	const onPressEnter = (e, enterVal) => {
		console.log(enterVal || e.target.value)
		const val = enterVal || e.target.value;
		let code = val.split(/[(\r\n)\r\n]+/);
		code.filter((item, index) => {
			// eslint-disable-next-line no-unused-expressions
			!item && code.splice(index, 1);
		});
		code = Array.from(new Set(code));
		if (code.length > 100) {
			message.warning('最多添加100条数据');
		}
		onChange(code.join(','))
		setTextAreaCode(val)
	};

	const TextAreaCode = (
		<Input.TextArea
			style={{ minHeight: 200 }}
			value={textAreaCode}
			onPressEnter={(e) => {
				e.preventDefault();
				const { target } = e;
				// 获取textarea的值
				const { value } = target;
				// 记录换行前光标的位置
				const position = e.target.selectionStart;
				// 截取光标位置前的值
				const start = value.slice(0, e.target.selectionStart);
				// 截取光标位置后的值
				const end = value.slice(e.target.selectionStart);
				// textarea的值 = 光标前的值 + 换行 + 光标后的值
				// onChange(`${start}\n${end}`);
				setTextAreaCode(`${start}\n${end}`)
				onPressEnter('', `${start}\n${end}`);
				// 设置光标开始/结束位置 = 换行前光标位置 + 1
				setTimeout(() => {
					target.selectionStart = position + 1;
					target.selectionEnd = position + 1;
				});
			}}
			onChange={(e) => {
				onPressEnter(e);
			}}
			placeholder="一行请输入一个编码，多个请输入多行"
		/>
	);
	return (
		<Input
			allowClear
			autoComplete="off"
			style={{ width: '100%' }}
			placeholder="请输入"
			value={value}
			onChange={handleChange}
			suffix={(
				<Popover
					content={TextAreaCode}
					trigger="click"
					placement="bottomRight"
				>
					<div style={{ cursor: 'pointer', color: '#4970FF' }}>
						批量添加
					</div>
				</Popover>
			)}
		/>
	)
}

export default BatchInput