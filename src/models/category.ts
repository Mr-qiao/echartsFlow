import { useEffect, useState } from 'react';

import Api from '@/pages/goods/services';

export default () => {
  const [category, setCategory] = useState<any[]>([]);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = () => {
    Api.Goods.Category({}).then((res) => {
      setCategory(res.entry || []);
    });
  };

  return {
    category,
    getCategoryList,
  };
};
