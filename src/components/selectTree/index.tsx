import {Cascader} from 'antd';

function SelectTree(props: any) {
	const {options = [], onChange, value, ...prop} = props;
	const onChanges = (value) => {
		if (value) {
			onChange(value.length > 0 ? value[value.length - 1] : '')
		} else {
			onChange('')
		}
	}
	return (
		<div>
			<Cascader
				{...prop}
				changeOnSelect
				// value={value}
				options={options}
				onChange={onChanges}
				placeholder="请选择"
			/>
		</div>
	);
}

export default SelectTree;
