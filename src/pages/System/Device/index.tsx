/**
 * 园区列表
 */
import React, { useRef, useState } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Image, } from 'antd';
import { delZoneApi, getDevicePageList, getZonePageListApi, getParkListApi } from '@/services/system';
import { css, cx } from '@emotion/css';
import DeviceModal from './DeviceModal';



const Device: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [visible, setVisible] = useState(false);
  const [info, setInfo] = useState(null)
  const handleModal = (record?: any) => {
    setInfo(record)
    setVisible(true)
  };

  const handleDel = (record: any) => {
    delZoneApi(record.id).then(res => {
      if (res.msg === 'SUCCESS') {
        actionRef?.current?.reload()
      }
    })
  }

  const columns: ProColumns<any>[] = [
    {
      title: '分组ID',
      dataIndex: 'groupId',
      hideInSearch: true,
    },
    {
      title: '设备ID',
      dataIndex: 'deviceId',
      hideInSearch: true,
    },
    {
      title: '设备名称',
      dataIndex: 'name',
      // hideInSearch: true,
    },
    {
      title: '设备纬度',
      dataIndex: 'lat',
      hideInSearch: true,
    },
    {
      title: '设备经度',
      dataIndex: 'lng',
      hideInSearch: true,
    },
    // {
    //   title: '设备状态',
    //   dataIndex: 'status',
    //   hideInSearch: true,
    // },
    // {
    //   title: '在线状态',
    //   dataIndex: 'onlineStatus',
    //   hideInSearch: true,
    // },
    // {
    //   title: '录像状态',
    //   dataIndex: 'recordStatus',
    //   hideInSearch: true,
    // },

    {
      title: '设备更新时间',
      dataIndex: 'updateTime',
      hideInSearch: true,
    },
    {
      title: '设备备注',
      dataIndex: 'remarks',
      hideInSearch: true,
    },

    {
      title: '设备状态',
      dataIndex: 'statusText',
      hideInSearch: true,
    },

    {
      title: '设备在线状态',
      dataIndex: 'onlineStatusText',
      hideInSearch: true,
    },

    {
      title: '设备录像状态',
      dataIndex: 'recordStatusText',
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
          </a>,
          <a key='del' onClick={() => handleDel(record)}>
            删除
          </a>
        ]
      },
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
          const { current, name, pageSize, updateTime, ...rest } = params;
          const res = await getDevicePageList({
            pageSize,
            name,
            page: current,
          });
          return {
            data: res.data.items || [],
            success: true,
            total: res.data.total
          }
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
          className: 'search-form',
        }}

        pagination={{
          pageSize: 10,
          onChange: (page) => console.log(page),
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
      {visible &&
        <DeviceModal open={visible} record={info} onCancel={() => {
          setInfo(null)
          setVisible(false)
        }} onOk={() => {
          setInfo(null)
          setVisible(false)
          actionRef?.current?.reload()
        }} />
      }
    </>

  )
};

export default Device