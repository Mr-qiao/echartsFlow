import { useEffect, useState } from 'react';

import { categoryTree } from '@/services/goods';

const cookie = localStorage.getItem('supplier-token');
export const useCategory = () => {
  const [category, setCategory] = useState<any[]>([]);

  useEffect(() => {
    if (!cookie) return;
    categoryTree({}, {}).then((res) => {
      setCategory(res.entry || []);
    });
  }, []);

  return [category];
};
