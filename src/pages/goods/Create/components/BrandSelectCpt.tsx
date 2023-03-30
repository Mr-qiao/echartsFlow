import { Select } from 'antd';
import React, { useEffect, useState } from 'react';

import { debounce } from '@/utils';

import Api from '../../services';

const BrandSelectCpt = React.forwardRef(({ value, onChange, ...props }: any) => {
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
    return Api.Goods.BrandList({ key: value, limit: 10, status: 1 }).then(({ entry }) => {
      setList(entry);
    });
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
        <Select.Option key={i} value={item.id} name={item.brandName}>
          <span>{item.brandName}</span>
        </Select.Option>
      ))}
    </Select>
  );
});
BrandSelectCpt.defaultProps = {
  // mode: 'tags',
};
export default BrandSelectCpt;
