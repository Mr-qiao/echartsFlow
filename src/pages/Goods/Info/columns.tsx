import { Space } from '@xlion/component';
import BrandSelectCpt from './Create/components/BrandSelectCpt';
import SelectTree from '@/components/selectTree';
import { useCategory } from '@/hooks';
import GoodsTableCol from '@/components/goodsTableCol';

type IProps = {
  onShow: (v) => void;
};

// 搜索列表
export const SearchColumns = () => {
  const [category] = useCategory();
  const columns: any[] = [
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
        options: [
          { label: '成衣款', value: 0 },
          { label: '设计师款', value: 1 },
        ],
      },
    },
  ]
  return columns;
}

// 列表
export const TableColumns = (props: IProps) => {
  const { onShow } = props;
  const columns: any[] = [
    {
      title: '款式编码',
      dataIndex: 'sysItemCode',
    },
    {
      title: '商品信息',
      search: false,
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
      search: false,
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
                onShow?.(recode)
              }}
            >
              查看
            </a>
          </Space>
        );
      },
    },
  ];

  return columns;
};

