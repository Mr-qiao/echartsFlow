import { useEffect, useState } from 'react';

import Api from '@/pages/goods/services';

const cookie = localStorage.getItem('supplier-token');
export const useCategory = () => {
  const [category, setCategory] = useState<any[]>([]);

  useEffect(() => {
    if (!cookie) return;
    Api.Goods.Category({}).then((res) => {
      setCategory(res.entry || []);
    });
  }, []);

  return [category];
};
