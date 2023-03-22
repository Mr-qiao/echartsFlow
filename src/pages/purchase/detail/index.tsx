import {
  Button,
  Card,
  Descriptions,
  Form,
  Input,
  message,
  Modal,
  Space,
  Table,
} from 'antd';
import GoodsTableCol from '@/components/goodsTableCol';
import { useEffect, useState } from 'react';
import { useParams } from '@umijs/max';
import {
  queryById,
  queryByIdLogList,
  updateStatus,
} from '@/pages/purchase/apis';
import moment from 'moment';
import { history } from 'umi';

const { Item } = Descriptions;
const { TextArea } = Input;

function PurchaseDetail() {
  const urlParams = useParams();
  const [data, setData] = useState({}) as any;
  const [actionBtnShow, setActionBtnShow] = useState(false) as any;
  const [bhShow, setBhShow] = useState(false) as any;
  const [logList, setLogList] = useState([]) as any;
  const [dataSource, setDataSource] = useState([]) as any;
  useEffect(() => {
    queryById({ id: urlParams.id }, {}).then((res) => {
      console.log(res, 'res');
      if (res.success) {
        if (res.entry.status === 2) {
          setActionBtnShow(true);
        }
        if (res.entry.status === 4) {
          setBhShow(true);
        }
        setData(res.entry);
        setDataSource(res.entry.detailVOList);
        queryByIdLogList({ purNo: res.entry.purNo }, {}).then((res) => {
          if (res.success) {
            console.log(res, 'res');
            setLogList(res.entry);
          }
        });
      }
    });
  }, []);

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
      dataIndex: 'price',
    },
    {
      title: '采购数量',
      dataIndex: 'number',
    },
    {
      title: '采购金额',
      dataIndex: 'amount',
    },
    {
      title: '最近采购单价',
      dataIndex: 'latelyPrice',
    },
    {
      title: '最近询货单价',
      dataIndex: 'askPrice',
    },
    {
      title: bhShow && '驳回原因',
      dataIndex: bhShow && 'rejectReason',
    },
  ];
  const columnsCz: any = [
    { title: '操作', dataIndex: 'operation' },
    { title: '触发结果', dataIndex: 'result' },
    { title: '操作人', dataIndex: 'creator' },
    {
      title: '操作时间',
      dataIndex: 'gmtCreate',
      render: (i: any) => moment(i).format('YYYY-MM-DD HH:mm:ss'),
    },
  ];
  const updateAction = (action: any, value?: any) => {
    const arg0 = {
      action: action,
      purchaseOrderId: data?.id,
      detailStatusParamList:
        action === 4
          ? dataSource.map((item: any) => ({
              ...item,
              purchaseOrderDetailId: item.id,
            }))
          : undefined,
      rejectReason: action === 4 ? value.rejectReason : undefined,
    };
    updateStatus(arg0, {}).then((res: any) => {
      console.log(res, 'res');
      if (res.success) {
        message.success(`${action === 3 ? '确认' : '驳回'}成功`);
        history.push('/order/purchase');
      } else {
        message.error(`${action === 3 ? '确认' : '驳回'}失败,请稍后再试`);
      }
    });
  };
  const columnsBh: any = [
    {
      title: '商品信息',
      render: (_: any, recode: any, index: number) => {
        return (
          <GoodsTableCol
            footerImg={false}
            imgs={recode.imgUrlList}
            nameArr={[
              { title: '款式名称', key: recode.title },
              { title: '货品编码', key: recode.itemId },
              { title: '规格', key: recode.size },
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
              { title: '采购单价', key: recode.latelyPrice },
              { title: '采购数量', key: recode.number },
              { title: '采购金额', key: recode.amount },
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
              { title: '最近采购单价', key: recode.latelyPrice },
              { title: '最近询货单价', key: recode.askPrice },
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
            maxLength={80}
            placeholder={'请输入驳回备注说明'}
            onChange={(e) => {
              const data = [...dataSource];
              data[index].rejectReason = e.target.value;
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
        <Button
          type={'primary'}
          onClick={() => {
            Modal.confirm({
              title: '确认无误',
              content: (
                <div>
                  <p>是否进行确认无误当前采购订单？</p>
                </div>
              ),
              onOk: () => {
                updateAction(3);
              },
            });
          }}
        >
          确认无误
        </Button>
        <Button
          onClick={() => {
            setModalOpen(true);
          }}
        >
          驳回修改
        </Button>
      </Space>
    );
  };
  return (
    <div>
      <Card title={'基本信息'} extra={actionBtnShow && actionBtn()}>
        <Descriptions column={3}>
          <Item label={'采购单号'}>{data.purNo}</Item>
          <Item label={'工厂'}>{data.supplierName}</Item>
          <Item label={'采购员'}>{data.buyer}</Item>
          <Item label={'采购金额'}>{data.amount}</Item>
          <Item label={'采购数量'}>{data.number}</Item>
          <Item label={'SKU数'}>{data.skuNumber}</Item>
          <Item label={'当前状态'}>{data.statusDesc}</Item>
          <Item label={'预计交付日期'}>
            {moment(data.expectedTime).format('YYYY-MM-DD HH:mm:ss')}
          </Item>
        </Descriptions>
        {bhShow ? (
          <Descriptions>
            <Item label={'驳回原因'}>{data.rejectReason}</Item>
          </Descriptions>
        ) : null}
      </Card>
      <Card title={'采购明细'}>
        <Table
          pagination={false}
          columns={columns}
          size={'small'}
          dataSource={data?.detailVOList}
        />
      </Card>
      <Card title={'操作日志'}>
        <Table
          pagination={false}
          columns={columnsCz}
          size={'small'}
          dataSource={logList}
        />
      </Card>
      <Modal
        open={modalOpen}
        title={'驳回'}
        width={'80%'}
        onOk={() => {
          form.validateFields().then((value) => {
            updateAction(4, value);
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
            name={'rejectReason'}
          >
            <TextArea maxLength={180} />
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