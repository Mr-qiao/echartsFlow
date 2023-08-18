import { useEffect, useState } from 'react';

import { categoryTree } from '@/services/goods/supplier';

// const cookie =  localStorage.getItem('supplier-token');
// console.log(cookie, 'asdasdas')
export const useCategory = () => {
  const [category, setCategory] = useState<any[]>([]);

  useEffect(() => {
    // if (!cookie) return;
    categoryTree({}, {}).then((res) => {
      setCategory(res?.entry || []);
    });
    // console.log(cookie, 'cookie')
  }, []);

  return [category];
};
