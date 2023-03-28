import { useMount } from 'ahooks';
import { useState } from 'react';

import { getSelectDict } from '@/services/common';

type DictType = Recordable<Array<{ label: string; value: number }>>;
type DictMapType = Recordable<Record<number, string>>;

export const useSelectDict = (dictTypes: string[]): [DictType, DictMapType] => {
  const [selectDict, setSelectDict] = useState<DictType>({});
  const [selectDictMap, setSelectDictMap] = useState<DictMapType>({});

  useMount(async () => {
    const res = await getSelectDict({
      types: dictTypes.join(','),
    });
    const obj: DictMapType = {};
    Object.keys(res).forEach((key) => {
      obj[key] = res[key].reduce((acc: any, cur: any) => {
        acc[cur.value] = cur.label;
        return acc;
      }, {});
    });
    setSelectDictMap(obj);
    setSelectDict(res);
  });

  return [selectDict, selectDictMap];
};
