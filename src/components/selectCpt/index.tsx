import { Select, SelectProps } from 'antd';
import React, { useEffect, useState } from 'react';

import Api from './services';
import { debounce } from '@/utils';

interface IProps extends SelectProps<any> {
	fetchParams?: any;
	itemRender?: any;
	onChange?: (any) => void;
	[propName: string]: any;
}

const SelectCpt = React.forwardRef(({ value, onChange, ...props }: IProps) => {
	const { fetchParams = { staffStatus: '1' } } = props;
	const [list, setList] = useState<any[]>();
	const [inputVal, setInputVal] = useState<any[]>();

	const handleChange = (val) => {
		setInputVal(val);
		onChange?.(val);
	};
	const handleSearch = debounce(getList, 500, false);

	useEffect(() => {
		setInputVal(value);
	}, [value]);

	useEffect(() => {
		getList();
	}, []);

	async function getList(value?: any) {
		// if (value)
		return Api.Anchor.OperateSearch({ ...fetchParams, page: 1, pageSize: 100, name: value, appCode: 'SUPPLY' }).then(
			({ entry }) => {
				setList(entry);
			},
		);
	}
	return (
		<Select
			placeholder="请选择"
			showSearch
			allowClear
			filterOption={false}
			value={inputVal}
			// filterOption={(input, option) => option?.name.toLowerCase().includes(input.toLowerCase())}
			onChange={handleChange}
			onSearch={handleSearch}
			onFocus={() => getList()}
			{...props}
		>
			{list?.map((item, i) => (
				<Select.Option key={i} value={item.employeeId} name={item.employeeId}>
					<span>{item.empName}</span>
				</Select.Option>
			))}
		</Select>
	);
});
SelectCpt.defaultProps = {
	mode: 'tags',
};
export default SelectCpt;
