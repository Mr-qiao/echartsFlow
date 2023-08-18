

import { Space } from '@xlion/component';
import BrandSelectCpt from './Create/components/BrandSelectCpt';
import SelectTree from '@/components/selectTree';
import { useCategory } from '@/hooks';
import GoodsTableCol from '@/components/goodsTableCol';
import { SHOETREE } from './constants'
import { DataType } from './types'
import { XTableColumns, XTableSearchItem } from '@xlion/component/dist/x-table/interface';


interface IProps {
  drawerModal: any
  setGoodsItem: any
}

export default function useColumns({ drawerModal, setGoodsItem }: IProps): [XTableSearchItem[], XTableColumns<DataType>] {
  const [category] = useCategory();
  // 搜索配置
  const searchColumns: XTableSearchItem[] = [
    {
      label: '商品品牌',
      name: 'brandIds',
      type: 'select',
      renderFormItem: () => (
        <BrandSelectCpt mode="multiple" showArrow style={{ width: '100%' }} />
      )
    },
    {
      label: '款式编码',
      name: 'sysItemCode',
      type: 'input',
    },
    {
      label: '款式名称',
      name: 'title',
      type: 'input',
    },
    {
      label: '商品类目',
      name: 'categoryId',
      type: 'select',
      renderFormItem: () => (
        <SelectTree
          options={category}
          fieldNames={{
            label: 'name',
            value: 'categoryId',
            children: 'children',
          }}
        />
      )
    },
    {
      label: '商品类型',
      name: 'hasSample',
      type: 'select',
      fieldProps: {
        options: SHOETREE,
      },
    },
  ]

  // 列表配置
  const tableColumns: XTableColumns<DataType> = [
    {
      title: '款式编码',
      dataIndex: 'sysItemCode',
    },
    {
      title: '商品信息',
      render: (_: any, recode: any) => {
        return (
          <GoodsTableCol
            infoList={[
              {
                title: '款式名称',
                key: recode.title,
              },
              {
                title: '类目',
                key: recode?.categoryNames?.join('/'),
              },
              {
                title: '品牌',
                key: recode.brandName,
              },
              {
                title: '颜色',
                key: recode.clothColor,
              },
              {
                title: '尺码',
                key: recode.clothSize,
              },
            ]}
            imgList={
              recode?.images?.length > 0
                ? recode?.images?.map((item: any) => {
                  return {
                    src: item || '',
                  };
                })
                : [{ src: '' }]
            }
          />
        );
      },
    },
    {
      title: '供应商信息',
      dataIndex: 'supplierName',
    },
    {
      title: '供应商商品编码',
      dataIndex: 'supplierStyleCode',
    },
    {
      title: '快手商品id',
      dataIndex: 'outsideItemCode',
    },
    {
      title: '操作',
      width: 100,
      fixed: 'right',
      render: (_: any, recode: any) => {
        return (
          <Space direction="vertical" size={[0, 2]}>
            <a
              onClick={() => {
                setGoodsItem(recode)
                drawerModal.current?.show();
              }}
            >
              查看
            </a>
          </Space>
        );
      },
    },
  ];





  return [
    searchColumns, tableColumns
  ]



}