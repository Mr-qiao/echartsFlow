import { useState } from 'react';

import { supplierItemPropertyByCategoryId } from '@/services/goods/supplier';

import dynamicProps from './components/DynamicProps';
import { IPropsType } from './types';

type OptionsType = { label: string; value: string | number };

export const useCategoryProps = (): [any, (id: string) => any] => {
  const [loading, setLoading] = useState<boolean>(false);
  //动态属性
  const [groupDict, setGroupDict] = useState<Recordable<React.ReactNode>>({});
  const [propsDict, setPropsDict] = useState<Recordable<IPropsType[]>>({});
  //sku 销售属性
  const [skuOptions, setSkuOptions] = useState<Array<OptionsType>>([]);
  const [skuOptionsDict, setSkuOptionsDict] = useState<Recordable<IPropsType>>({});
  //sku 动态属性
  const [skuProps, setSkuProps] = useState<Array<OptionsType>>([]);
  const [skuPropsDict, setSkuPropsDict] = useState<Recordable<IPropsType>>({});

  function render(item) {
    return item.itemCategoryPropValues?.map((item: IPropsType) => dynamicProps(item));
  }
  //获取类目属性
  async function getDynamicProps(categoryId) {
    try {
      setLoading(true);
      const { entry } = await supplierItemPropertyByCategoryId({ categoryId });
      const { categoryProperties = [], skuGroupProperties = [], skuSaleProperties = [] } = entry;

      const _obj: Recordable<React.ReactNode> = {};
      const _props = categoryProperties.reduce((acc: any, cur: any) => {
        _obj[cur.groupName] = render(cur);
        return [...acc, ...(cur.itemCategoryPropValues || [])];
      }, []);

      const _skuSaleOptions: Array<OptionsType> = [];
      const _skuSaleDict = skuSaleProperties.reduce((acc: any, cur: any) => {
        _skuSaleOptions.push({ label: cur.categoryPropertyName, value: cur.categoryPropertyCode });
        acc[cur.categoryPropertyName] = { ...cur };
        return acc;
      }, {});

      const _skuProps: Array<OptionsType> = [];
      const _skuPropsDict = skuGroupProperties.reduce((acc: any, cur: any) => {
        _skuProps.push({ label: cur.categoryPropertyName, value: cur.categoryPropertyCode });
        acc[cur.categoryPropertyCode] = { ...cur };
        return acc;
      }, {});
      //sku 动态属性
      setSkuProps(_skuProps);
      setSkuPropsDict(_skuPropsDict);
      //sku 销售属性
      setSkuOptions(_skuSaleOptions);
      setSkuOptionsDict(_skuSaleDict);
      //动态属性
      setGroupDict(_obj);
      setPropsDict(
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
  return [{ groupDict, propsDict, skuOptions, skuOptionsDict, skuProps, skuPropsDict, loading }, getDynamicProps];
};
