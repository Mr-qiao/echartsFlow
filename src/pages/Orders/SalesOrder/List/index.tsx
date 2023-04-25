import {
  ORDER_STATUS_1_TYPE,
  ORDER_TIME_TYPE,
  PlATFORM_ORDER_TYPE,
} from '@/constants/orders';
import { exportList, queryList } from '@/services/orders';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import dayjs from 'dayjs';
import React, { useRef, useState } from 'react';
import { getColumns } from './columns';

interface propsType {
  tableTab: string;
  actionRef: any;
}

const List: React.FC<propsType> = ({ tableTab, actionRef }) => {
  const [timeSelect, setTimeSelect] = useState<string>('1');
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const [platFormType, setPlatFormType] = useState(
    PlATFORM_ORDER_TYPE[0].value,
  );
  const [orderType, setOrderType] = useState(ORDER_STATUS_1_TYPE[0].value);
  const [timeType, setTimeType] = useState(ORDER_TIME_TYPE[0].value);
  const ref: any = useRef();

  const exportListClick = () => {
    ref?.current?.validateFields().then((res: any) => {
      const sTime: any = timeSelect === '1' ? 'beginCreateTime' : 'startTime';
      const eTime: any = timeSelect === '1' ? 'endCreateTime' : 'endTime';
      let arg0: any = {
        status: tableTab === '3' ? undefined : tableTab,
        ids: selectedRowKeys,
        timeType: timeSelect,
        ...res,
      };
      arg0[sTime] =
        res.sendTime?.length > 0 ? dayjs(res.sendTime[0]).valueOf() : undefined;
      arg0[eTime] =
        res.sendTime?.length > 0 ? dayjs(res.sendTime[1]).valueOf() : undefined;
      exportList(arg0, { responseType: 'blob', getResponse: true }).then(
        (res: any) => {
          let blob = new Blob([res.data]);
          let downloadElement = document.createElement('a');
          let href = window.URL.createObjectURL(blob); //创建下载的链接
          downloadElement.href = href;
          downloadElement.download =
            decodeURI(
              res.headers['content-disposition'].split('filename=')[1],
            ) || ''; //下载后文件名
          document.body.appendChild(downloadElement);
          downloadElement.click(); //点击下载
          document.body.removeChild(downloadElement); //下载完成移除元素
          window.URL.revokeObjectURL(href); //释放掉blob对象
        },
      );
    });
  };
  const onSelectChange = (newSelectedRowKeys: any) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <ProTable
      columns={getColumns({
        platFormType,
        orderType,
        timeType,
        setPlatFormType,
        setOrderType,
        setTimeType,
      })}
      formRef={ref}
      defaultSize={'small'}
      scroll={{
        x: 'max-content',
      }}
      rowKey={'id'}
      actionRef={actionRef}
      request={async (params = {}, sort, filter) => {
        const sTime: any = timeSelect === '1' ? 'beginCreateTime' : 'startTime';
        const eTime: any = timeSelect === '1' ? 'endCreateTime' : 'endTime';
        let arg0: any = {
          status: tableTab,
          timeType,
          platFormType,
          orderType,
          ...params,
        };
        arg0[sTime] =
          params.sendTime?.length > 0
            ? dayjs(params.sendTime[0]).valueOf()
            : undefined;
        arg0[eTime] =
          params.sendTime?.length > 0
            ? dayjs(params.sendTime[1]).valueOf()
            : undefined;
        const res: any = await queryList(arg0, {});
        const data = res?.entry?.list;

        const mockList = [
          {
            systemInfo: {
              jstOrderNumber: '112121',
              payAmount: 212,
              deliveryFactory: '张三工厂',
              orderStatus: '已付款待审核',
              problemTypes: '等待订单合并 ',
            },
            platformInfo: {
              anchorNickname: 'pgl',
              ksOrderNumber: '1212',
              platformStatus: '等待卖家发货',
              shopName: 'xxx',
              source: 'xxx',
            },
            itemInfo: [
              {
                anchorNickname: 'pgl',
                itemCode: '12121',
                itemId: '1212',
                itemImage: '',
                money: 121,
                number: 121,
                orderNumber: 11,
                specification: '喝死/ss',
                title: 'nnnn',
              },
              {
                anchorNickname: 'pgl',
                itemCode: '12121',
                itemId: '1212',
                itemImage: '',
                money: 121,
                number: 121,
                orderNumber: 11,
                specification: '喝死/ss',
                title: 'nnnn',
              },
            ],
            dateInfo: {
              orderTime: 1682057434000,
              payTime: 1682057434000,
              planDeliverTime: 1682057434000,
              updateTime: 1682057434000,
            },
            receiveInfo: {
              name: 'sss',
              address: '浙江省杭州市萧山区盈丰街道博地中心C座 1401A',
              phone: '156xxxxxxxx',
            },
            deliveryInfo: {
              deliverTime: 1682057434000,
              deliveryRepository: 'xxxxx仓库',
              expressName: '快递公司',
              expressOrderNumber: 121212121,
            },
          },
        ];

        return {
          data: mockList,
          success: res.success,
          // 不传会使用 data 的长度，如果是分页一定要传
          total: res?.entry.totalRecord,
        };
      }}
      search={{
        labelWidth: 100,
        span: 6,
        defaultCollapsed: false,
      }}
      form={{
        size: 'small',
      }}
      options={false}
      rowSelection={{ ...rowSelection }}
      toolBarRender={() => [
        <Button type="primary" key="primary" onClick={exportListClick}>
          导出
        </Button>,
      ]}
    />
  );
};

export default List;
