import {Cascader} from 'antd';

function SelectTree(props: any) {
	const {options = [], onChange, value, ...prop} = props;
	const onChanges = (value) => {
		console.log(value, 'value')
		onChange(value[value.length - 1])
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
