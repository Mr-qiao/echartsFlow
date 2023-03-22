import { Cascader } from 'antd';

function SelectTree(props: any) {
  const { options = [], onChange, value, ...prop } = props;
  return (
    <div>
      <Cascader
        {...prop}
        value={value}
        options={options}
        onChange={onChange}
        placeholder="请选择"
      />
    </div>
  );
}

export default SelectTree;
