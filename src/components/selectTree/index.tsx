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
        placeholder="Please select"
      />
    </div>
  );
}

export default SelectTree;
