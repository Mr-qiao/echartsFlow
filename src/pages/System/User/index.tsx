/**
 * 用户列表
 */
import React, { useState, useRef } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { changeUserStatusApi, delUserApi, getUserPageApi, userListApi } from '@/services/system';

import UserModal from './UserModal';
import { css, cx } from '@emotion/css';



const User: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [visible, setVisible] = useState(false);
  const [info, setInfo] = useState(null)

  const handleChangeUserStatus = (id: string) => () => {
    changeUserStatusApi(id).then(res => {
      if (res.msg === 'SUCCESS') {
        actionRef?.current?.reload()
      }
    })
  };

  const handleDel = (record: any) => {
    delUserApi(record.id).then(res => {
      if (res.msg === 'SUCCESS') {
        actionRef?.current?.reload()
      }
    })
  }

  const columns: ProColumns<any>[] = [
    {
      title: '编号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 100,
    },
    {
      title: '用户名',
      dataIndex: 'uname',
      // hideInTable: true,
      // hideInSearch: true,
    },
    {
      title: '权限',
      dataIndex: 'roleText',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'statusText',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      key: 'addTime',
      dataIndex: 'addTime',
      // valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '更新时间',
      key: 'updateTime',
      dataIndex: 'updateTime',
      // valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => {
        return [
          ...(record.status === 1 ? [
            <a
              key="editable"
              onClick={handleChangeUserStatus(record.id)}
            >
              禁用
            </a>
          ] : [
            <a
              key="editable"
              onClick={handleChangeUserStatus(record.id)}
            >
              启用
            </a>
          ]),

          <a key='del' onClick={() => handleDel(record)}>
            删除
          </a>
        ]
      }
    },
  ];


  return (
    <>
      <ProTable
        className={cx(css`
        .ant-form{
          padding: 0 ;
          .ant-form-item{
            margin-bottom: 0;
          }
        }
      `)}
        columns={columns}
        actionRef={actionRef}
        request={async (params, sort, filter) => {
          const { current, uname, pageSize, updateTime, ...rest } = params;
          const res = await getUserPageApi({
            pageSize,
            uname,
            page: current
          });
          return {
            data: res.data.items || [],
            success: true,
            total: res.data.total,
          }
        }}
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
        cardBordered={false}
        rowKey="id"
        search={{
          // defaultCollapsed: false,
          // className: 'search-form',
          labelWidth: 'auto',
        }}
        pagination={{
          pageSize: 10,
          onChange: (page) => console.log(page),
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
      {
        visible && <UserModal open={visible} record={info} onCancel={() => {
          setVisible(false)
          setInfo(null)
        }} onOk={() => {
          setInfo(null)
          setVisible(false)
          actionRef?.current?.reload()
        }} />
      }
    </>
  );
};

export default User
