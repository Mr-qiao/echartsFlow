import GoodsTableCol from '@/components/goodsTableCol';
import SelectTree from '@/components/selectTree';
import { useCategory } from '@/hooks';
import { supplierItemList } from '@/services/goods';
import { filterPageName } from '@/utils';
import { ProTable } from '@ant-design/pro-components';
import { Col, Input, Modal, Row } from 'antd';
import { useState } from 'react';
import './index.less';

function GoodsSearch(props: any) {
  const { onChange, value } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [category] = useCategory();
  const columns: any = [
    {
      title: '商品类目',
      dataIndex: 'categoryId',
      renderFormItem: (item: any, _: any, form: any) => {
        return (
          <SelectTree
            options={category}
            fieldNames={{
              label: 'name',
              value: 'categoryId',
              children: 'children',
            }}
          />
        );
      },
      fieldProps: {
        placeholder: '请选择',
      },
      hideInTable: true,
    },
    {
      title: '款式编码',
      dataIndex: 'sysCode',
      hideInTable: true,
    },
    {
      title: '款式名称',
      hideInTable: true,
      dataIndex: 'title',
    },
    {
      title: '货品编码',
      hideInTable: true,
      dataIndex: 'title',
    },
    {
      title: '条码(69码)',
      hideInTable: true,
      dataIndex: 'title',
    },
    {
      title: '商家款式编码',
      hideInTable: true,
      dataIndex: 'title',
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
                title: '货品编码',
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
            imgs={recode.images.map((item: any) => {
              return {
                src: item,
              };
            })}
          />
        );
      },
    },
    {
      title: '条码信息',
      dataIndex: 'xx',
      search: false,
      // width: 300,
      render: (_: any, recode: any) => {
        return (
          <GoodsTableCol
            nameArr={[
              {
                title: '款式编码',
                key: recode.name,
              },
              {
                title: '条码（69码）',
                key: recode.brandName,
              },
              {
                title: '商家款式编码',
                key: recode.categoryName,
              },
            ]}
            imgs={recode.images.map((item: any) => {
              return {
                src: item,
              };
            })}
          />
        );
      },
    },
    {
      title: '品牌',
      dataIndex: 'brandId',
      search: false,
    },
    {
      title: '类目',
      dataIndex: 'categoryId',
      search: false,
    },
  ];
  const onSelectChange = (newSelectedRowKeys: any) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  return (
    <div className={'batch-input'}>
      <Row className={'batch-input-row'}>
        <Col span={18}>
          <Input
            placeholder={'请输入'}
            onChange={(e) => {
              const val = e.target.value;
              onChange(val);
            }}
            value={value}
          />
        </Col>
        <Col span={6}>
          <a
            onClick={() => {
              setModalOpen(true);
            }}
          >
            商品搜索
          </a>
        </Col>
      </Row>
      <Modal
        title={'商品搜索'}
        open={modalOpen}
        width={'80%'}
        onOk={() => {}}
        onCancel={() => {
          setModalOpen(false);
        }}
      >
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
          rowSelection={{ ...rowSelection }}
          request={async (
            // 第一个参数 params 查询表单和 params 参数的结合
            // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
            params,
            sort,
            filter,
          ) => {
            const arg0 = {
              ...filterPageName(params),
              // startTime: params.time?.length > 0 ? moment(params.time[0]).valueOf() : undefined,
              // endTime: params.time?.length > 0 ? moment(params.time[1]).valueOf() : undefined,
            };
            const res = await supplierItemList(arg0);
            const data = res.entry.data;
            return {
              data: data,
              success: res.success,
              // 不传会使用 data 的长度，如果是分页一定要传
              total: res?.entry.totalRecord,
            };
          }}
        />
      </Modal>
    </div>
  );
}

export default GoodsSearch;
