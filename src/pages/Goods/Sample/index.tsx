import {
  sampledDeliverPoor,
  sampleStartPoor,
  sampleQueryList,
} from '@/services/goods/sample';
import { Form, message, Modal, Select, XTable } from '@xlion/component';
import { useRef, useState } from 'react';


// import { SearchColumns, TableColumns } from './columns'
import useColumns from './useColumns';


const { Option } = Select;

function Sample() {
  const [form] = Form.useForm();
  const [activeKey, setActiveKey] = useState('99');
  const actionRef = useRef() as any;
  const arrOptions = ['待确认', '打样中', '已交付'];
  const [open, setOpen] = useState<boolean>(false);
  const [byId, setbyId] = useState({}) as any;

  const [searchColumns, tableColumns] = useColumns({ actionRef, setbyId, setOpen })

  // const onStartPoor = async (recode) => {
  //   setbyId(recode);
  //   const res = await sampleStartPoor({ status: '1', itemId: recode?.itemId });
  //   if (res.success) {
  //     message.success({
  //       content: '打样成功',
  //       duration: 2,
  //       onClose: () => {
  //         actionRef.current.reload();
  //       },
  //     });
  //     setOpen(false);
  //   }
  // }

  // const onDeliverPoor = async (recode) => {
  //   const res = await sampledDeliverPoor({ status: '2', itemId: recode?.itemId });
  //   if (res.success) {
  //     message.success({
  //       content: '交付完成',
  //       duration: 2,
  //       onClose: () => {
  //         actionRef.current.reload();
  //       },
  //     });
  //   }
  // }

  return (
    <>
      <XTable
        rowKey={'itemId'}
        scroll={{
          x: 'max-content',
        }}
        actionRef={actionRef}
        search={{
          defaultCollapsed: false,
          labelWidth: 100,
          span: 4,
          columns: searchColumns
        }}
        columns={tableColumns}
        request={async (params) => {
          const arg0 = {
            ...params,
            status: activeKey === '99' ? undefined : activeKey,
          };
          const res: any = await sampleQueryList(arg0);
          const data = res.entry.list;
          return {
            data: data,
            success: true,
            // 不传会使用 data 的长度，如果是分页一定要传
            total: res?.entry.totalRecord,
          };
        }}
        toolbar={
          {
            tabs: {
              activeKey: activeKey,
              items: [
                {
                  key: '99',
                  label: <span>全部</span>,
                },
                {
                  key: '0',
                  label: <span>待开始</span>,
                },
                {
                  key: '1',
                  label: <span>打样中</span>,
                },
                {
                  key: '2',
                  label: <span>已交付</span>,
                },
              ],
              onChange: (key: string) => {
                setActiveKey(key as string);
                actionRef.current.reload();
              },
            },
          } as any
        }
      />
      <Modal
        title={'备注状态'}
        open={open}
        destroyOnClose
        onOk={() => {
          form.validateFields().then((values) => {
            sampleStartPoor({ ...values, itemId: byId?.itemId }, {}).then((res: any) => {
              if (res.success) {
                message.success('备注状态成功');
                setOpen(false);
                actionRef.current.reload();
              }
            });
          });
        }}
        onCancel={() => {
          setOpen(false);
        }}
      >
        <Form form={form}>
          <Form.Item label={'修改状态'} name={'status'} initialValue={'1'}>
            <Select>
              {arrOptions.map((item, index) => (
                <Option key={index}>{item}</Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Sample;
