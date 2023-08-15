import { Space } from '@xlion/component';
import SelectTree from '@/components/selectTree';
import { useCategory } from '@/hooks';
import SearchSelect from '@/components/SearchSelect';
import {
  searchForSystem,
} from '@/services/goods/sample';
import dayjs from 'dayjs';
import { transformFen2Yuan } from '@/utils';
import { Image } from '@xlion/component';

import { history } from 'umi';

type IProps = {
  onStartPoor: (v) => void;
  onDeliverPoor: (v) => void;
};

// 搜索列表
export const SearchColumns = () => {
  const [category] = useCategory();
  const columns: any[] = [
    {
      label: '样衣名称',
      name: 'refTitle',
      type: 'input'
    },
    {
      label: '样衣编码',
      name: 'refSysItemCode',
      type: 'input',
    },
    {
      label: '需求单编码',
      name: 'sysItemCode',
      type: 'input',
    },
    {
      label: '品类',
      name: 'refCategoryId',
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
      label: '商家款式编码',
      name: 'refSupplierStyleCode',
      type: 'input',
    },
    {
      label: '对接人',
      name: 'creator',
      type: 'select',
      renderFormItem: () => (
        <SearchSelect
          ajaxRequest={searchForSystem}
          params={{ appCode: 'SUPPLY' }}
          optionFilterProp="empName"
          filterOption={false}
          style={{ width: '100%' }}
          searchKey="name"
          fieldNames={{ label: 'empName', value: 'employeeId' }}
        />
      )
    },
  ]
  return columns;
}

// 列表
export const TableColumns = (props: IProps) => {
  const { onStartPoor, onDeliverPoor } = props;
  const columns: any[] = [
    {
      title: '样衣图片',
      dataIndex: 'imgs',
      search: false,
      width: 180,
      render: (_: any, recode: any) => {
        return (
          <Image
            width={60}
            height={60}
            src={recode?.refImages !== null ? recode?.refImages[0] : ''}
          />
        );
      },
    },
    {
      title: '样衣名称',
      dataIndex: 'refTitle',
    },
    {
      title: '样衣编码',
      dataIndex: 'refSysItemCode',
    },
    {
      title: '需求单编码',
      dataIndex: 'sysItemCode',
    },
    {
      title: '品类',
      dataIndex: 'refCategoryNames',
      render: (val, row) => row?.refCategoryNames?.join('/'),
    },
    {
      title: '商家款式编码',
      dataIndex: 'refSupplierStyleCode',
    },
    {
      title: '需求时间',
      dataIndex: 'gmtCreate',
      render: (i: any) => dayjs(i).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '是否现货',
      dataIndex: 'spotsType',
      valueEnum: {
        1: '现货',
        2: '期货',
      },
    },
    {
      title: '尺码',
      dataIndex: 'clothSize',
    },
    {
      title: '颜色',
      dataIndex: 'clothColor',
    },
    {
      title: '吊牌价',
      dataIndex: 'tagPrice',
      render: (_: any, recode: any) =>
        transformFen2Yuan(recode, ['tagPrice']).tagPrice,
    },
    {
      title: '预计交付时间',
      dataIndex: 'sampleClothesFinishTime',
    },
    {
      title: '需求状态',
      search: false,
      dataIndex: 'status',
      render: (val: any, recode: any) => {
        return recode.status
          ? {
            0: '待开始',
            1: '打样中',
            2: '已交付',
          }[val]
          : '待开始';
      },
    },
    {
      title: '对接人',
      dataIndex: 'creatorName',
    },
    {
      title: '操作',
      search: false,
      align: 'center',
      fixed: 'right',
      width: 200,
      render: (_: any, recode: any) => {
        const { status } = recode;
        return (
          <Space>
            <a
              onClick={() => {
                history.push(`/goods/sample/detail?id=${recode.itemId}`);
              }}
            >
              查看
            </a>
            {[0].includes(status) || !status ? (
              <a
                onClick={() => {
                  onStartPoor?.(recode)
                }}
              >
                开始打样
              </a>
            ) : null}
            {[1].includes(status) ? (
              <a
                onClick={() => {
                  onDeliverPoor?.(recode)
                }}
              >
                交付样衣
              </a>
            ) : null}
          </Space>
        );
      },
    },
  ];

  return columns;
};

