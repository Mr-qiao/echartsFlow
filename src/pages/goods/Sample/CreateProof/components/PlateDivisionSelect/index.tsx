/**
 * @file 版师选择
 */
import { useDebounceFn } from 'ahooks';
import { Empty, Select, SelectProps, Spin } from 'antd';
import { useRef, useState } from 'react';

import { getPlateDivisionList } from '@/services/proofDemand';

const PlateDivisionSelect: React.FC<SelectProps> = ({ value, onChange, ...rest }) => {
  const [dataSource, setDataSource] = useState([]);
  const [fetching, setFetching] = useState(false);
  const fetchRef = useRef(0);

  const { run: handleSearch } = useDebounceFn(
    async (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      try {
        setFetching(true);
        const { entry = [] } = await getPlateDivisionList({
          name: value,
        });
        if (fetchId !== fetchRef.current) return;
        const data = entry.map(({ id, companyName }: any) => ({
          label: companyName,
          value: id,
        }));
        setDataSource(data);
      } catch (err) {
        console.log('fetch plateDivision list error', err);
      } finally {
        setFetching(false);
      }
    },
    {
      wait: 500,
      leading: true,
      trailing: true,
    },
  );

  return (
    <Select
      {...rest}
      value={value}
      showSearch
      filterOption={false}
      options={dataSource}
      notFoundContent={fetching ? <Spin size="small" /> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
      onSearch={handleSearch}
      onChange={onChange}
    ></Select>
  );
};

export default PlateDivisionSelect;
