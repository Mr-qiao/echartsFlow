import { DownOutlined } from '@ant-design/icons';
import { ProTable } from '@ant-design/pro-components';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Image,
  Input,
  Modal,
  Row,
  Select,
  Table,
} from 'antd';
import GoodsTableCol from '@/components/goodsTableCol';
import { useState } from 'react';
import DraggerUpload from '@/components/DraggerUpload';

const { Option } = Select;
const { RangePicker } = DatePicker;

function TabList() {
  const [form] = Form.useForm();
  const [timeSelect, setTimeSelect] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenDelivery, setModalOpenDelivery] = useState(false);
  const [modalOpenImport, setModalOpenImport] = useState(false);
  const columnsDelivery: any = [
    {
      title: '商品信息',
      dataIndex: 'spxx',
      width: 400,
      render: (_: any, recode: any) => {
        return (
          <GoodsTableCol
            footerImg={false}
            nameArr={[
              {
                title: '商品ID',
                key: recode.itemId,
              },
              {
                title: '款式名称',
                key: recode.ksName,
              },
              {
                title: 'SKU编码',
                key: recode.skuCodes,
              },
              {
                title: '规格',
                key: recode.skuSpec,
              },
            ]}
          />
        );
      },
    },
    {
      title: '数量',
      dataIndex: 'number',
    },
  ];
  const columns: any = [
    {
      title: '商品信息',
      dataIndex: 'spxx',
      search: false,
      width: 300,
      render: (_: any, recode: any) => {
        return (
          <GoodsTableCol
            footerImg={false}
            nameArr={[
              {
                title: '商品ID',
                key: recode.itemId,
              },
              {
                title: '款式名称',
                key: recode.ksName,
              },
              {
                title: 'SKU编码',
                key: recode.skuCodes,
              },
              {
                title: '规格',
                key: recode.skuSpec,
              },
            ]}
          />
        );
      },
    },
    {
      title: '数量',
      dataIndex: 'number',
      search: false,
    },
    {
      title: '订单编号',
      dataIndex: 'companyCode',
    },
    {
      title: 'Sku编码',
      dataIndex: 'skuCode',
      hideInTable: true,
    },
    {
      title: '款式名称',
      dataIndex: 'itemTitle',
      hideInTable: true,
    },
    {
      title: '订单状态',
      dataIndex: 'status',
      valueEnum: {
        0: '待发货',
        1: '已发货',
        2: '订单关闭',
      },
      hideInTable: true,
    },
    {
      title: '是否作废',
      dataIndex: 'isDeleted',
      valueEnum: {
        0: '已作废',
        1: '未作废',
      },
      hideInTable: true,
    },
    {
      title: '商品id',
      dataIndex: 'itemId',
      hideInTable: true,
    },
    {
      title: '创建时间',
      search: false,
      dataIndex: 'gmtCreate',
    },
    {
      title: (
        <Select
          defaultValue={timeSelect}
          onChange={(e) => {
            setTimeSelect(e);
          }}
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          <Option value={1} key={1}>
            创建日期
          </Option>
          <Option value={2} key={1}>
            发货日期
          </Option>
        </Select>
      ),
      dataIndex: 'sendTime',
      renderFormItem: () => {
        return <RangePicker showTime />;
      },
      formItemProps: {
        htmlFor: '',
      },
      hideInTable: true,
    },
    {
      title: '收货信息',
      dataIndex: 'shxx',
      search: false,
      render: (_: any, recode: any) => {
        return (
          <GoodsTableCol
            showImg={false}
            nameArr={[
              {
                title: '姓名',
                key: recode.userName,
              },
              {
                title: '手机号',
                key: recode.userPhone,
              },
              {
                title: '地址',
                key: recode.address,
              },
            ]}
          />
        );
      },
    },
    {
      title: '发货信息',
      dataIndex: 'fhxx',
      search: false,
      render: (_: any, recode: any) => {
        return (
          <GoodsTableCol
            showImg={false}
            nameArr={[
              {
                title: '快递',
                key: recode.buyer,
              },
              {
                title: '单号',
                key: recode.companyCode,
              },
              {
                title: '时间',
                key: recode.sendTime,
              },
            ]}
          />
        );
      },
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
              setModalOpenDelivery(true);
            }}
          >
            发货
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
        scroll={{ x: 1000 }}
        request={async (params = {}, sort, filter) => {
          console.log(params, 'params');
          return {
            data: [{ spxx: 1 }, { spxx: 2 }, { spxx: 3 }],
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
          <Button
            key="show"
            onClick={() => {
              setModalOpenImport(true);
            }}
          >
            导入发货
          </Button>,
          <Button
            key="out"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            导入记录
          </Button>,
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
      <Modal
        width={400}
        open={modalOpenImport}
        title={'导入发货'}
        onOk={() => {
          setModalOpenImport(false);
        }}
        onCancel={() => {
          setModalOpenImport(false);
        }}
      >
        <div>
          请先下载<a>导入发货模版</a>
        </div>
        <Form form={form}>
          <Form.Item
            name="resourceId"
            rules={[{ required: true, message: '请选择文件' }]}
          >
            <DraggerUpload showFileName />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        width={500}
        open={modalOpenDelivery}
        title={'发货'}
        onOk={() => {
          setModalOpenDelivery(false);
        }}
        onCancel={() => {
          setModalOpenDelivery(false);
        }}
      >
        <Table
          size={'small'}
          pagination={false}
          columns={columnsDelivery}
          dataSource={[{ number: 123 }]}
        />
        <Form form={form}>
          <Form.Item
            label={'快递公司'}
            name="kdgs"
            rules={[{ required: true, message: '请输入快递公司' }]}
          >
            <Input placeholder={'请输入快递公司'} />
          </Form.Item>
          <Form.Item
            label={'快递单号'}
            name="kddh"
            rules={[{ required: true, message: '请输入快递单号' }]}
          >
            <Input placeholder={'请输入快递单号'} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default TabList;
