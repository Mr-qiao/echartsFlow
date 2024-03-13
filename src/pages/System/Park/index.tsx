/**
 * 园区列表
 */
import React, { useRef } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Image, } from 'antd';
import { parkList } from '@/services/system';



const Park: React.FC = () => {
  const actionRef = useRef<ActionType>();


  const columns: ProColumns<any>[] = [
    {
      title: '分组ID',
      dataIndex: 'groupId',
      hideInSearch: true,
    },
    {
      title: '园区名称',
      dataIndex: 'name',
      hideInSearch: true,
    },
    {
      title: '园区纬度',
      dataIndex: 'lat',
      hideInSearch: true,
    },
    {
      title: '园区经度',
      dataIndex: 'lng',
      hideInSearch: true,
    },
    {
      title: '园区图片',
      dataIndex: 'imageUrl',
      hideInSearch: true,
      render: (_, r) => <Image src={r?.imageUrl} preview style={{ width: 80, height: 80 }} />
    },
    {
      title: '设备数量',
      dataIndex: 'deviceNum',
      hideInSearch: true,
    },
    {
      title: '设备在线数量',
      dataIndex: 'deviceOnlineNum',
      hideInSearch: true,
    },
    {
      title: '园区状态',
      dataIndex: 'statusText',
      hideInSearch: true,
    },
    {
      title: '备注',
      dataIndex: 'remarks',
      hideInSearch: true,
    },
    // {
    //   title: '操作',
    //   valueType: 'option',
    //   key: 'option',
    //   render: (text, record, _, action) => [
    //     <a
    //       key="editable"
    //       onClick={() => {
    //         action?.startEditable?.(record.id);
    //       }}
    //     >
    //       编辑
    //     </a>,
    //   ],
    // },
  ];

  return (
    <ProTable
      columns={columns}
      actionRef={actionRef}
      request={async (params, sort, filter) => {
        // const {} = params;
        const res = await parkList();
        console.log(res, 'res')
        return {
          data: res.data || [],
          success: true,
          total: 0
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
      // search={{
      //   defaultCollapsed: false,
      //   className: 'search-form',
      // }}
      // options={{
      //   setting: {
      //     listsHeight: 400,
      //   },
      // }}
      search={false}
      options={false}
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
    // dateFormatter="string"
    // toolBarRender={() => [
    //   <Button
    //     key="button"
    //     onClick={() => {
    //       actionRef.current?.reload();
    //     }}
    //     type="primary"
    //   >
    //     添加
    //   </Button>
    // ]}
    />
  );
};

export default Park