/**
 * 用户列表
 */
import React, { useState, useRef } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { GithubIssueItem } from './type';
import { userList } from '@/services/system';

import UserModal from './UserModal';



const User: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [visible, setVisible] = useState(false);
  const [info, setInfo] = useState(null)

  const columns: ProColumns<GithubIssueItem>[] = [
    {
      title: '编号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 100,
    },
    {
      title: '用户名',
      dataIndex: 'uname',
      hideInTable: true,
    },
    {
      title: '权限',
      dataIndex: 'role',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      key: 'addTime',
      dataIndex: 'addTime',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '更新时间',
      key: 'updateTime',
      dataIndex: 'updateTime',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => {
        return [
          <a
            key="editable"
            onClick={() => handleModal(record)}
          >
            编辑
          </a>
        ]
      }
    },
  ];

  const handleModal = (record?: any) => {
    if (record) {
      setInfo(record)
    }
    setVisible(true)
  };


  return (
    <>
      <ProTable<GithubIssueItem>
        columns={columns}
        actionRef={actionRef}
        request={async (params, sort, filter) => {
          const { current, pageSize, updateTime, ...rest } = params;
          const res = await userList();
          return {
            data: res.data || [],
            success: true,
            total: 0,
          }
        }}
        cardBordered={false}
        rowKey="id"
        search={{
          defaultCollapsed: false,
          className: 'search-form',
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
        pagination={false}
        dateFormatter="string"
        toolBarRender={() => [
          <Button
            key="button"
            onClick={() => setVisible(true)}
            type="primary"
          >
            添加
          </Button>
        ]}
      />
      {/* 添加用户 */}
      <UserModal open={visible} record={info} onCancel={() => setVisible(false)} onOk={() => {
        setVisible(false)
        actionRef?.current?.reload()
      }} />
    </>
  );
};

export default User
