import { Cascader } from '@xlion/component';


function SelectTree(props: any) {
  const { options = [], onChange, value, ...prop } = props;
  const onChanges = (value) => {
    if (value) {
      onChange(value.length > 0 ? value[value.length - 1] : '');
    } else {
      onChange('');
    }
  };
  return (
    <div>
      <Cascader
        {...prop}
        changeOnSelect
        // value={value}
        showSearch={(inputValue: string, path: any[]) => {
          return path.some(
            (option) =>
              option.name.toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
          );
        }}
        options={options}
        onChange={onChanges}
        placeholder="请选择"
      />
    </div>
  );
}

export default SelectTree;
