import { useState } from 'react';

import { getItemPropertyByCategoryId } from '@/services/goods';

import dynamicProps from './components/DynamicProps';
import { IPropsType } from './types';

export const useCategoryProps = (): [any, (id: string) => any] => {
  const [loading, setLoading] = useState<boolean>(false);
  let [groupDict, setGroupDict] = useState<Recordable<React.ReactNode>>({});
  let [propsDict, setpropsDict] = useState<Recordable<IPropsType[]>>({});
  function render(item: { itemCategoryPropValues: IPropsType[] }) {
    return item.itemCategoryPropValues?.map((item: IPropsType) =>
      dynamicProps(item),
    );
  }
  //获取类目属性
  async function getDynamicProps(categoryId: any) {
    try {
      setLoading(true);
      const { entry } = await getItemPropertyByCategoryId({ categoryId });
      //暂时忽略
      /* eslint-disable */
      const {
        categoryProperties = [],
        skuGroupProperties = [],
        skuSaleProperties = [],
      } = entry;

      let _obj: Recordable<React.ReactNode> = {};
      let _props = categoryProperties.reduce((acc: any, cur: any) => {
        _obj[cur.groupName] = render(cur);
        return [...acc, ...(cur.itemCategoryPropValues || [])];
      }, []);
      // ?.map((item: IPropsType) => ({
      //   ...item,
      //   rules: item.categoryPropertyRule,
      //   components: [
      //     <div key={'a'}>{item.propertyTypeName}</div>,
      //     <div key={'b'}>{item.propertyTypeName}</div>,
      //     <div key={'c'}>{item.propertyTypeName}</div>,
      //   ],
      // }));

      setGroupDict(_obj);
      setpropsDict(
        _props?.reduce((acc: any, cur: any) => {
          acc[cur.categoryPropertyCode] = { ...cur };
          return acc;
        }, {}),
      );
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }
  return [{ groupDict, propsDict, loading }, getDynamicProps];
};
