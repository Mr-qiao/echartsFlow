import React, { useEffect, useState } from 'react';
import { Select } from 'antd';

import { getParkListApi } from '@/services/system';

type Props = {
  // 当前 city
  cityCode: string;
  // 是否显示全国
  showAll: boolean;
  onChange: (city: string) => void
}

const SelectItem: React.FC<Props> = (props) => {
  const { cityCode, showAll, onChange } = props;
  const [city, setCity] = useState(
    [{
      code: '-1', name: '全国',
      province: '99',
      city: '99'
    }]
  )

  const getParkList = async () => {
    try {
      const res = await getParkListApi();
      const arr = showAll ? [{
        code: '-1', name: '全国',
        province: '99',
        city: '99'
      }] : []
      const resArr =
        res.data.map((item: any) => {
          return {
            code: item.id,
            name: item.name,
            province: item.id,
            city: item.id
          }
        })
      setCity(arr.concat(resArr))
    } catch (e) { }
  }

  useEffect(() => {
    getParkList()
  }, [])

  return (
    <Select
      showSearch
      optionFilterProp='label'
      style={{ width: 200 }}
      placeholder="请搜索"
      value={cityCode}
      filterOption={(input, option) => (option?.name ?? '').includes(input)}
      filterSort={(optionA, optionB) =>
        (optionA?.name ?? '').toLowerCase().localeCompare((optionB?.code ?? '').toLowerCase())
      }
      fieldNames={{
        label: 'name',
        value: 'code',
      }}
      onChange={onChange}
      options={city || []}
    />
  )
}



export default SelectItem;