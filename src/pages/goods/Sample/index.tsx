import SearchSelect from '@/components/SearchSelect';
import SelectTree from '@/components/selectTree';
import { getCategoryTree } from '@/pages/Goods/apis';
import {
  delivery,
  mark,
  queryList,
  searchForSystem,
} from '@/pages/Goods/Sample/apis';
import { filterPageName, transformFen2Yuan } from '@/utils';
import { ProTable } from '@ant-design/pro-components';
import { Form, Image, message, Modal, Select, Space } from 'antd';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { history } from 'umi';

const { Option } = Select;

function Sample() {
  const [optionsTree, setOptionsTree] = useState([]);
  useEffect(() => {
    getCategoryTree({}, {}).then((res) => {
      if (res.success) {
        setOptionsTree(res.entry);
      } else {
        message.error('类目树获取失败，请稍后再试');
      }
    });
  }, []);
  const [form] = Form.useForm();
  const [activeKey, setActiveKey] = useState('99');
  const actionRef = useRef() as any;
  const arrOptions = ['待确认', '打样中', '已交付'];
  const [open, setOpen] = useState(false);
  const [byId, setbyId] = useState({}) as any;
  const columns: any = [
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
      dataIndex: 'refCategoryId',
      renderFormItem: (item: any, _: any, form: any) => {
        return (
          <SelectTree
            options={optionsTree}
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
      render: (val, row) => row?.refCategoryNames?.join('/'),
    },
    // {
    // 	title: '品牌',
    // 	search: false,
    // 	dataIndex: 'brandName',
    // },
    {
      title: '商家款式编码',
      dataIndex: 'refSupplierStyleCode',
    },
    {
      title: '需求时间',
      search: false,
      dataIndex: 'gmtCreate',
      render: (i: any) => moment(i).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '是否现货',
      search: false,
      dataIndex: 'spotsType',
      valueEnum: {
        1: '现货',
        2: '期货',
      },
    },
    {
      title: '尺码',
      search: false,
      dataIndex: 'clothSize',
    },
    {
      title: '颜色',
      search: false,
      dataIndex: 'clothColor',
    },
    {
      title: '吊牌价',
      search: false,
      dataIndex: 'tagPrice',
      render: (_: any, recode: any) =>
        transformFen2Yuan(recode, ['tagPrice']).tagPrice,
    },
    {
      title: '预计交付时间',
      search: false,
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
      search: false,
    },
    {
      title: '对接人',
      dataIndex: 'creator',
      hideInTable: true,
      renderFormItem: () => (
        <SearchSelect
          ajaxRequest={searchForSystem}
          params={{ appCode: 'SUPPLY' }}
          optionFilterProp="empName"
          filterOption={false}
          searchKey="name"
          fieldNames={{ label: 'empName', value: 'employeeId' }}
        />
      ),
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
                  setbyId(recode);
                  // setOpen(true)
                  mark({ status: '1', itemId: recode?.itemId }, {}).then(
                    (res: any) => {
                      if (res.success) {
                        message.success({
                          content: '打样成功',
                          duration: 2,
                          onClose: () => {
                            actionRef.current.reload();
                          },
                        });
                        setOpen(false);
                      }
                    },
                  );
                }}
              >
                开始打样
              </a>
            ) : null}
            {[1].includes(status) ? (
              <a
                onClick={() => {
                  delivery({ status: '2', itemId: recode?.itemId }, {}).then(
                    (res: any) => {
                      if (res.success) {
                        message.success({
                          content: '交付完成',
                          duration: 2,
                          onClose: () => {
                            actionRef.current.reload();
                          },
                        });
                      }
                    },
                  );
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
  return (
    <div>
      <ProTable
        columns={columns}
        scroll={{
          x: 'max-content',
        }}
        rowKey={'itemId'}
        search={{
          labelWidth: 120,
          defaultCollapsed: false,
        }}
        actionRef={actionRef}
        request={async (params, sort, filter) => {
          const arg0 = {
            ...filterPageName(params),
            status: activeKey === '99' ? undefined : activeKey,
          };
          const res: any = await queryList(arg0, {});
          const data = res.entry.list;
          return {
            data: data,
            success: res.success,
            // 不传会使用 data 的长度，如果是分页一定要传
            total: res?.entry.totalRecord,
          };
        }}
        defaultSize={'small'}
        form={{
          size: 'small',
        }}
        toolbar={
          {
            menu: {
              type: 'tab',
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
            mark({ ...values, itemId: byId?.itemId }, {}).then((res: any) => {
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
    </div>
  );
}

export default Sample;
