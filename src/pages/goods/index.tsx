import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import GoodsTableCol from '@/components/goodsTableCol';

function Goods() {
  const columns: any = [
    {
      title: '款式编码',
      dataIndex: 'code',
    },
    {
      title: '款式名称',
      hideInTable: true,
      dataIndex: 'name',
    },
    {
      title: '商品类目',
      dataIndex: 'categoryName',
      fieldProps: {
        placeholder: '请选择',
      },
      hideInTable: true,
      valueEnum: {
        1: '牛',
        2: '猪',
      },
    },
    {
      title: '商品品牌',
      dataIndex: 'brandName',
      hideInTable: true,
    },
    {
      title: '商品类型',
      fieldProps: {
        placeholder: '请选择',
      },
      hideInTable: true,
      valueEnum: {
        0: '成衣款',
        1: '设计师款',
      },
      dataIndex: 'type',
      width: 48,
    },
    {
      title: '商品信息',
      dataIndex: 'xx',
      search: false,
      // width: 300,
      render: (_: any, recode: any) => {
        return (
          <GoodsTableCol
            nameArr={[
              {
                title: '款式名称',
                key: recode.name,
              },
              {
                title: '类目',
                key: recode.categoryName,
              },
              {
                title: '品牌',
                key: recode.brandName,
              },
              {
                title: '颜色',
                key: recode.categoryName,
              },
              {
                title: '尺码',
                key: recode.categoryName,
              },
            ]}
          />
        );
      },
    },
    {
      title: '供应商信息',
      search: false,
      dataIndex: 'userName',
    },
    {
      title: '供应商商品编码',
      search: false,
      dataIndex: 'supplierItemCode',
    },
    {
      title: '快手商品id',
      dataIndex: 'ksItemId',
    },
    {
      title: '操作',
      width: 100,
      search: false,
      render: (_: any, recode: any) => {
        return <a>查看</a>;
      },
    },
  ];
  return (
    <ProTable
      columns={columns}
      search={{
        labelWidth: 120,
      }}
      defaultSize={'small'}
      form={{
        size: 'small',
      }}
      options={false}
      request={async (
        // 第一个参数 params 查询表单和 params 参数的结合
        // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
        params,
        sort,
        filter,
      ) => {
        console.log(params, 'ac');
        return {
          data: [
            {
              index: 1,
              xpmc: '六味地黄丸',
              splm: '药',
              sppp: '六位',
              ys: '黑色',
              cm: 'xxl',
            },
            {
              index: 1,
              xpmc: '六味地黄丸',
              splm: '药',
              sppp: '六位',
              ys: '黑色',
              cm: 'xxl',
            },
            {
              index: 1,
              xpmc: '六味地黄丸',
              splm: '药',
              sppp: '六位',
              ys: '黑色',
              cm: 'xxl',
            },
            {
              index: 1,
              xpmc: '六味地黄丸',
              splm: '药',
              sppp: '六位',
              ys: '黑色',
              cm: 'xxl',
            },
          ],
        };
      }}
      headerTitle={
        <Button
          key="primary"
          type="primary"
          onClick={() => {
            alert('add');
          }}
        >
          创建供应商款式信息
        </Button>
      }
    ></ProTable>
  );
}

export default Goods;
