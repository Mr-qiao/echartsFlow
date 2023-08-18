import { Select } from '@xlion/component';
import { useEffect, useState } from 'react';

import { frequency } from '@/utils';

export default function SearchSelect(props) {
  const {
    ajaxRequest,
    style,
    placeholder,
    onChange = () => { },
    params = {},
    searchKey = 'key',
    filterOption = false,
    ...rest
  } = props;
  const [options, setOptions] = useState([]);

  const getDataList = (params = {}) => {
    ajaxRequest(params).then((res) => {
      if (res.status) {
        setOptions(res.entry);
      }
    });
  };

  const handleSearch = (value: any) => {
    if (filterOption) {
      return;
    }
    const data = { ...params };
    data[searchKey] = value;
    getDataList(data);
  };

  useEffect(() => {
    getDataList(params);
  }, [ajaxRequest]);

  return (
    <Select
      showSearch
      allowClear
      style={style}
      placeholder={placeholder || '请选择'}
      onSearch={frequency(handleSearch, 500)}
      onChange={onChange}
      options={options}
      filterOption={filterOption}
      {...rest}
    />
  );
}
