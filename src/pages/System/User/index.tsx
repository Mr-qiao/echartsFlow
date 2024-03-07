/**
 * 用户列表
 */
import React, { useState } from 'react';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Modal, Form, Input, Select } from 'antd';
import { useRef } from 'react';
import request from 'umi-request';
export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};

const { TextArea } = Input;

type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};




const User = () => {
  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);


  const columns: ProColumns<GithubIssueItem>[] = [
    {
      title: '编号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 100,
    },
    {
      title: '账户',
      dataIndex: 'state',
      hideInSearch: true,
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      hideInTable: true,
    },
    {
      title: '姓名',
      dataIndex: 'state',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      key: 'showTime',
      dataIndex: 'created_at',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          // onClick={() => {
          //   // action?.startEditable?.(record.id);
          // }}
          onClick={() => handleModal('edit')}
        >
          编辑
        </a>,
      ],
    },
  ];

  const handleModal = (type?: string) => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  return (
    <>
      <ProTable<GithubIssueItem>
        columns={columns}
        actionRef={actionRef}
        request={async (params, sort, filter) => {
          console.log(sort, filter);
          await waitTime(2000);
          return request<{
            data: GithubIssueItem[];
          }>('https://proapi.azurewebsites.net/github/issues', {
            params,
          });
        }}
        cardBordered={false}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          defaultValue: {
            option: { fixed: 'right', disable: true },
          },
          onChange(value) {
            console.log('value: ', value);
          },
        }}
        rowKey="id"
        search={{
          defaultCollapsed: false,
          // span: 6,
          // labelWidth: 105,
          className: 'search-form',
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        pagination={{
          pageSize: 5,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        toolBarRender={() => [
          <Button
            key="button"
            onClick={() => handleModal('')}
            type="primary"
          >
            添加
          </Button>
        ]}
      />
      <Modal title="添加用户" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} initialValues={{ type: 1 }}>
          <Form.Item label="用户名" name="userName" rules={[
            {
              required: true,
              message: '请输入密码',
            },
          ]}>
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
            ]}
          >
            <Input placeholder="请输入密码" />;
          </Form.Item>

          <Form.Item
            label="权限"
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
            ]}
          >
            <Select
              defaultValue="default"
              options={[
                {
                  value: 'admin',
                  label: '管理员',
                },
                {
                  value: 'default',
                  label: '普通用户',
                },

              ]}
            />
          </Form.Item>

          <Form.Item
            label="备注"
            name="remark"
            rules={[
              {
                required: true,
                message: '请输入备注内容',
              },
            ]}
          >
            <TextArea showCount maxLength={500} rows={5} placeholder="请输入内容" />
          </Form.Item>
        </Form>
      </Modal>
    </>

  );
};

export default User
