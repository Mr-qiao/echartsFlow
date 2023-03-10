import { ProTable } from '@ant-design/pro-components';
import { Button, DatePicker, Modal } from 'antd';
import { useRef, useState } from 'react';
import BatchInput from '@/components/batchInput';
import { history } from 'umi';

const { RangePicker } = DatePicker;

function Purchase() {
  const [activeKey, setActiveKey] = useState('1');
  const actionRef = useRef() as any;
  const [timeSelect, setTimeSelect] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const columns: any = [
    {
      title: '采购单号',
      hideInTable: true,
      dataIndex: 'cgdh',
      renderFormItem: (item: any, _: any, form: any) => {
        return <BatchInput />;
      },
    },
    {
      title: '包含商品',
      hideInTable: true,
      renderFormItem: (item: any, _: any, form: any) => {
        return <a>点击搜索</a>;
      },
    },
    {
      title: '采购订单',
      dataIndex: 'cgdd',
      search: false,
    },
    {
      title: 'SKU数',
      dataIndex: 'Sku',
      search: false,
    },
    {
      title: '采购数量',
      dataIndex: 'ksmc',
      search: false,
    },
    {
      title: '采购金额',
      dataIndex: 'itemId',
      search: false,
    },
    {
      title: '预计交付日期',
      dataIndex: 'shdh',
      renderFormItem: (item: any, _: any, form: any) => {
        return <RangePicker showTime />;
      },
    },
    {
      title: '状态',
      dataIndex: 'type',
      search: false,
    },
    {
      title: '采购员',
      dataIndex: 'cgy',
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
        toolbar={
          {
            menu: {
              type: 'tab',
              activeKey: activeKey,
              items: [
                {
                  key: '1',
                  label: <span>待确认</span>,
                },
                {
                  key: '2',
                  label: <span>已确认</span>,
                },
                {
                  key: '3',
                  label: <span>已驳回</span>,
                },
                {
                  key: '4',
                  label: <span>全部</span>,
                },
              ],
              onChange: (key: string) => {
                console.log(key, actionRef, 'key');
                setActiveKey(key as string);
                actionRef.current.reload();
              },
            },
          } as any
        }
        request={async (params = {}, sort, filter) => {
          console.log(params, 'params');
          return {
            data: [
              { spxx: 1, key: 1 },
              { spxx: 2, key: 2 },
              { spxx: 3, key: 3 },
            ],
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
