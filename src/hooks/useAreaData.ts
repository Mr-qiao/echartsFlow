import { useAsyncEffect } from 'ahooks';
import { useState } from 'react';

import { getAreaList } from '@/services/common';

export const useAreaData = () => {
  const [areaData, setAreaData] = useState([]);
  useAsyncEffect(async () => {
    const { entry } = await getAreaList();
    setAreaData(entry);
  }, []);

  return [areaData];
};
