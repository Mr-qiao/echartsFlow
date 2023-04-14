import { useEffect, useState } from 'react';

import { categoryTree } from '@/services/goods';

const cookie = localStorage.getItem('supplier-token');
export default () => {
  const [category, setCategory] = useState<any[]>([]);

  const getCategoryList = () => {
    if (cookie) {
      categoryTree({}, {}).then((res) => {
        setCategory(res.entry || []);
      });
    }
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  return {
    category,
    getCategoryList,
  };
};
