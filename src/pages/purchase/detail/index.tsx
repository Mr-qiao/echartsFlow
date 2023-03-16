import {
  Button,
  Card,
  Descriptions,
  Form,
  Input,
  Modal,
  Space,
  Table,
} from 'antd';
import GoodsTableCol from '@/components/goodsTableCol';
import { useState } from 'react';

const { Item } = Descriptions;
const { TextArea } = Input;

function PurchaseDetail() {
  const [dataSource, setDataSource] = useState([
    { key: 1 },
    { key: 2 },
    { key: 3 },
  ]) as any;
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();
  const columns: any = [
    {
      title: '商品信息',
      dataIndex: 'xx',
      search: false,
      // width: 300,
      render: (_: any, recode: any) => {
        return (
          <GoodsTableCol
            footerImg={false}
            nameArr={[
              {
                title: '款式名称',
                key: recode.name,
              },
              {
                title: '货品编码',
                key: recode.categoryName,
              },
              {
                title: '规格',
                key: recode.brandName,
              },
            ]}
          />
        );
      },
    },
    {
      title: '采购单价',
    },
    {
      title: '采购数量',
    },
    {
      title: '采购金额',
    },
    {
      title: '最近采购单价',
    },
    {
      title: '最近询货单价',
    },
  ];
  const columnsCz: any = [
    { title: '操作' },
    { title: '触发结果' },
    { title: '操作人' },
    { title: '操作事件' },
  ];
  const columnsBh: any = [
    {
      title: '商品信息',
      render: (_: any, recode: any, index: number) => {
        return (
          <GoodsTableCol
            footerImg={false}
            nameArr={[
              { title: '款式名称', key: '我是一个款式名称' },
              { title: '货品编码', key: '我是一个款式名称' },
              { title: '规格', key: '我是一个款式名称' },
            ]}
          />
        );
      },
    },
    {
      title: '采购',
      render: (_: any, recode: any, index: number) => {
        return (
          <GoodsTableCol
            showImg={false}
            nameArr={[
              { title: '采购单价', key: '我是一个款式名称' },
              { title: '采购数量', key: '我是一个款式名称' },
              { title: '采购金额', key: '我是一个款式名称' },
            ]}
          />
        );
      },
    },
    {
      title: '最近信息',
      render: (_: any, recode: any, index: number) => {
        return (
          <GoodsTableCol
            showImg={false}
            nameArr={[
              { title: '最近采购单价', key: '我是一个款式名称' },
              { title: '最近询货单价', key: '我是一个款式名称' },
            ]}
          />
        );
      },
    },
    {
      title: '备注',
      fixed: 'right',
      render: (_: any, recode: any, index: number) => {
        return (
          <TextArea
            placeholder={'请输入驳回备注说明'}
            onChange={(e) => {
              const data = [...dataSource];
              data[index].yuanyin = e.target.value;
              setDataSource(data);
            }}
          />
        );
      },
    },
  ];
  const actionBtn = () => {
    const key = 1;
    return (
      <Space>
        {key === 1 ? <Button type={'primary'}>确认无误</Button> : null}
        {key === 1 ? (
          <Button
            onClick={() => {
              setModalOpen(true);
            }}
          >
            驳回修改
          </Button>
        ) : null}
      </Space>
    );
  };
  return (
    <div>
      <Card title={'基本信息'} extra={actionBtn()}>
        <Descriptions column={3}>
          <Item label={'采购单号'}>1111</Item>
          <Item label={'工厂'}>1111</Item>
          <Item label={'采购员'}>1111</Item>
          <Item label={'采购金额'}>1111</Item>
          <Item label={'采购数量'}>1111</Item>
          <Item label={'SKU数'}>1111</Item>
          <Item label={'当前状态'}>1111</Item>
          <Item label={'预计交付日期'}>1111</Item>
        </Descriptions>
      </Card>
      <Card title={'采购明细'}>
        <Table
          pagination={false}
          columns={columns}
          size={'small'}
          dataSource={[{}, {}]}
        />
      </Card>
      <Card title={'采购明细'}>
        <Table
          pagination={false}
          columns={columnsCz}
          size={'small'}
          dataSource={[{}, {}]}
        />
      </Card>
      <Modal
        open={modalOpen}
        title={'驳回'}
        width={'80%'}
        onOk={() => {
          form.validateFields().then((value) => {
            setModalOpen(false);
          });
        }}
        onCancel={() => {
          setModalOpen(false);
        }}
      >
        <Form form={form}>
          <Form.Item
            rules={[{ required: true, message: '请输入驳回原因' }]}
            label={'驳回原因'}
            name={'yuanyin'}
          >
            <TextArea />
          </Form.Item>
          <Form.Item label={'商品备注'}>
            <Table rowKey={'key'} columns={columnsBh} dataSource={dataSource} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default PurchaseDetail;
