import { useEffect, useState } from 'react';

import { ProColumnType, ProFormInstance } from '@ant-design/pro-components';
import { Select } from 'antd';
import { omit } from 'lodash';

interface IProps extends ProColumnType {
  options: Array<{ label: string; value: number | string }>;
  onLabelChange?: (value: string) => void; //label
  formRef: React.MutableRefObject<ProFormInstance | undefined>;
}
export const useSearchColumns = ({
  options,
  onLabelChange,
  formRef,

  ...props
}: IProps): [ProColumnType, () => void] => {
  let [inputVal, setInputVal] = useState<any>(options?.[0].value);
  const item = {
    title: (
      <Select
        {...{
          style: {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            height: 28,
            width: 120,
          },
          options,
          value: inputVal,
          onChange: (val) => {
            // setTimeType(val);
            // onSearchParams?.({ [name]: val });
            formRef?.current?.resetFields([inputVal]);
            setInputVal(val);
            onLabelChange?.(val);
          },
        }}
      />
    ),
    formItemProps: {
      htmlFor: '',
    },
    dataIndex: inputVal,
    ...props,
  };
  function resetItem() {
    setInputVal(options?.[0].value);
  }
  return [item, resetItem];
};

export type DictType = Array<{ label: string; value: string | number }>;
type DictMapType = Recordable<any>;
interface IOptions {
  fieldNames: { label: string; value: string };
  api?: (params: any) => Promise<any>;
  params?: any;
}
export const useSelectDict = (
  dataSource: any,
  options?: IOptions | null,
): [DictType, DictMapType] => {
  const fieldNames = options?.fieldNames || { label: 'text', value: 'value' };
  const params = options?.params || {};
  const [selectDict, setSelectDict] = useState<DictType>([]);
  const [selectDictMap, setSelectDictMap] = useState<DictMapType>({});

  async function getData() {
    try {
      let _dataSource = dataSource;
      if (options?.api) {
        const { entry } = await options?.api?.(params);
        _dataSource = entry;
      }
      let obj: DictType = [];
      if (Object.prototype.toString.call(_dataSource) === '[object Object]') {
        Object.keys(_dataSource).forEach((key) => {
          obj.push({
            value: key,
            label:
              typeof _dataSource[key] === 'string'
                ? _dataSource[key]
                : _dataSource[key][fieldNames.label],
          });
        });
        setSelectDict(obj);
        setSelectDictMap(_dataSource);
      }
      if (Object.prototype.toString.call(_dataSource) === '[object Array]') {
        setSelectDict(
          _dataSource?.map((item: any) => ({
            label: item[fieldNames.label],
            value: item[fieldNames.value],
            ...omit(item, [fieldNames.label, fieldNames.value]),
          })),
        );
        setSelectDictMap(
          _dataSource.reduce((acc: any, cur: any) => {
            acc[cur[fieldNames.value]] = cur;
            return acc;
          }, {}),
        );
      }
    } catch (e) {}
  }
  useEffect(() => {
    // console.log(res, obj);
    getData();
  }, []);
  return [selectDict, selectDictMap];
};
