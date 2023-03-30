import { Divider, Select } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

import { debounce } from '@/utils';

import Api from '../../services';
import AddBrand from './AddBrand';

const BrandSelectCpt = React.forwardRef(
  ({ value, onChange, isCreate = false, ...props }: any) => {
    const [list, setList] = useState<any[]>();
    const selectRef = useRef();

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
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      getList();
    }, []);

    async function getList(value?: any) {
      // if (value)
      return Api.Goods.BrandList({ key: value, limit: 10, status: 1 }).then(
        ({ entry }) => {
          setList(
            entry.map((item) => ({
              ...item,
              names: `${item.brandName || '--'}/${item.brandNameEn || '--'}`,
            })),
          );
        },
      );
    }
    const onCreateSuccess = (data) => {
      setList((o) => [
        ...o,
        {
          ...data,
          names: `${data.brandName || '--'}/${data.brandNameEn || '--'}`,
        },
      ]);
      onChange(data.id);
    };
    return (
      <Select
        placeholder="请选择"
        showSearch
        allowClear
        filterOption={false}
        value={inputVal}
        ref={selectRef}
        onChange={handleChange}
        onSearch={handleSearch}
        options={list}
        fieldNames={{ label: 'names', value: 'id' }}
        dropdownRender={(menu: any) => (
          <div>
            {menu}
            {isCreate && (
              <>
                <Divider style={{ margin: '4px 0' }} />
                <AddBrand onSuccess={(data: any) => onCreateSuccess(data)}>
                  <span
                    className="u-f__center"
                    onClick={() => {
                      selectRef.current.blur();
                    }}
                  >
                    +创建品牌
                  </span>
                </AddBrand>
              </>
            )}
          </div>
        )}
        {...props}
      ></Select>
    );
  },
);
BrandSelectCpt.defaultProps = {};
export default BrandSelectCpt;
