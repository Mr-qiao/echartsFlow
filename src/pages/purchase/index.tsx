import { ProTable } from '@ant-design/pro-components';
import { Button, DatePicker, Modal } from 'antd';
import { useRef, useState } from 'react';
import BatchInput from '@/components/batchInput';
import { history } from 'umi';
import { queryList } from '@/pages/purchase/apis';

const { RangePicker } = DatePicker;

function Purchase() {
  const actionRef = useRef() as any;
  const [modalOpen, setModalOpen] = useState(false);
  const columns: any = [
    {
      title: '采购单号',
      hideInTable: true,
      dataIndex: 'purNoList',
      renderFormItem: (item: any, _: any, form: any) => {
        return <BatchInput />;
      },
    },
    {
      title: '包含商品',
      hideInTable: true,
      dataIndex: 'skuIdList',
      renderFormItem: (item: any, _: any, form: any) => {
        return <a>点击搜索</a>;
      },
    },
    {
      title: '采购订单',
      dataIndex: 'purNo',
      search: false,
    },
    {
      title: 'SKU数',
      dataIndex: 'skuNumber',
      search: false,
    },
    {
      title: '采购数量',
      dataIndex: 'number',
      search: false,
    },
    {
      title: '采购金额',
      dataIndex: 'amount',
      search: false,
    },
    {
      title: '预计交付日期',
      dataIndex: 'expectedTime',
      renderFormItem: (item: any, _: any, form: any) => {
        return <RangePicker showTime />;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      search: false,
    },
    {
      title: '采购员',
      dataIndex: 'buyer',
    },
    {
      title: '操作',
      fixed: 'right',
      width: 60,
      search: false,
      render: (_: any, recode: any) => {
        return (
          <a
            onClick={() => {
              history.push('/order/purchase-detail');
            }}
          >
            查看
          </a>
        );
      },
    },
  ];
  const dcolumns: any = [
    {
      title: '导入文件名称',
      dataIndex: 'importName',
    },
    {
      title: '导入事件',
      dataIndex: 'importTime',
    },
    {
      title: '导入人',
      dataIndex: 'importPip',
    },
    {
      title: '导入任务状态',
      dataIndex: 'importType',
    },
    {
      title: '导入成功/失败数量',
      dataIndex: 'importName',
    },
    {
      title: '操作',
      dataIndex: 'importName',
      render: () => {
        return <a>下载失败数据</a>;
      },
    },
  ];
  return (
    <div>
      <ProTable
        columns={columns}
        defaultSize={'small'}
        actionRef={actionRef}
        scroll={{ x: 1000 }}
        request={async (params = {}, sort, filter) => {
          const arg0 = {
            ...params,
          };
          const res: any = await queryList(arg0, {});
          const data = res.entry.list;
          return {
            data: data,
            success: res.success,
            // 不传会使用 data 的长度，如果是分页一定要传
            total: res?.totalRecord,
          };
        }}
        search={{
          labelWidth: 120,
        }}
        form={{
          size: 'small',
        }}
        options={false}
        toolBarRender={() => [
          // <Button key="show">导入发货</Button>,
          // <Button key="out" onClick={() => {
          // 	setModalOpen(true)
          // }}>
          // 	导入记录
          // </Button>,
          <Button type="primary" key="primary">
            导出
          </Button>,
        ]}
      />
      <Modal
        width={800}
        open={modalOpen}
        title={'导入记录列表'}
        onOk={() => {
          setModalOpen(false);
        }}
        onCancel={() => {
          setModalOpen(false);
        }}
      >
        <ProTable
          dataSource={[{ id: 1 }, { id: 2 }, { id: 3 }]}
          size={'small'}
          search={false}
          options={false}
          columns={dcolumns}
        />
      </Modal>
    </div>
  );
}

export default Purchase;
