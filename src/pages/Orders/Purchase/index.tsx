// import BatchInput from '@/components/batchInput';
// import SelectCpt from '@/components/selectCpt';
// import TabPane from '@/components/TabPane';
// import { PURCHASE_ORDER_TABLIST } from '@/constants/orders';
import { purchaseExportList, purchaseQueryList } from '@/services/orders/purchaseSales';
// import { filterPageName } from '@/utils';
// import { ProTable } from '@ant-design/pro-components';
import { Button, DatePicker, Modal } from 'antd';
import { PURCHASE_ORDER_TABLIST } from './constants'
// import moment from 'moment';
import { useRef, useState } from 'react';
import { XPageContainer, XTable } from '@xlion/component'
import { TableColumns, SearchColumns } from './columns'
// import { history } from 'umi';

const { RangePicker } = DatePicker;

function Purchase(props: any) {
  // const { tabKey } = props
  const actionRef = useRef() as any;
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [tabKey, setTabKey] = useState('2') as any;
  const ref: any = useRef();
  const dcolumns: any = [
    {
      title: '导入文件名称',
      dataIndex: 'importName',
    },
    {
      title: '导入事件',
      dataIndex: 'importTime',
    },
    {
      title: '导入人',
      dataIndex: 'importPip',
    },
    {
      title: '导入任务状态',
      dataIndex: 'importType',
    },
    {
      title: '导入成功/失败数量',
      dataIndex: 'importName',
    },
    {
      title: '操作',
      dataIndex: 'importName',
      render: () => {
        return <a>下载失败数据</a>;
      },
    },
  ];

  const handleTabChange = (key: string) => {
    setTabKey(key);
    actionRef?.current?.reset();
  };
  const purchaseExportListClick = () => {
    ref?.current?.validateFields().then((res: any) => {
      const arg0 = {
        ...res,
        status: tabKey === '0' ? res.status : Number(tabKey),
      };
      purchaseExportList(
        arg0,
        //   {
        //   responseType: 'blob',
        //   getResponse: true,
        // }
        {},
      );
      // .then((res: any) => {
      //   let blob = new Blob([res.data]);
      //   let downloadElement = document.createElement('a');
      //   let href = window.URL.createObjectURL(blob); //创建下载的链接
      //   downloadElement.href = href;
      //   downloadElement.download =
      //     decodeURI(res.headers['content-disposition'].split('filename=')[1]) ||
      //     ''; //下载后文件名
      //   document.body.appendChild(downloadElement);
      //   downloadElement.click(); //点击下载
      //   document.body.removeChild(downloadElement); //下载完成移除元素
      //   window.URL.revokeObjectURL(href); //释放掉blob对象
      // });
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
    <div>
      <XPageContainer
        tabs={{
          activeKey: tabKey,
          items: PURCHASE_ORDER_TABLIST,
          onChange: (key) => handleTabChange(key)
        }}
        contentStyle={{ padding: 0 }}
      >
        <XTable
          rowKey={'id'}
          formRef={ref}
          actionRef={actionRef}
          scroll={{
            x: 'max-content',
          }}
          search={{
            defaultCollapsed: false,
            labelWidth: 100,
            span: 4,
            columns: SearchColumns({ tabKey })
          }}
          columns={TableColumns()}
          request={async (params = {}) => {
            const arg0 = {
              // ...filterPageName(params),
              ...params,
              status: tabKey === '0' ? params.status : Number(tabKey),
              clientType: 2,
              skuSysCodeList: params.skuSysCodeList
                ? params.skuSysCodeList?.split(',')
                : undefined,
              purNoList: params.purNoList
                ? params.purNoList?.split(',')
                : undefined,
            };
            const res: any = await purchaseQueryList(arg0, {});
            const data = res.entry.list.map((item: any, index: any) => ({
              ...item,
              index: index + 1,
            }));
            return {
              data: data,
              success: true,
              // 不传会使用 data 的长度，如果是分页一定要传
              total: res?.entry.totalRecord,
            };
          }}
          toolbar={{
            extra: () => // <Button key="show">导入发货</Button>,
              // <Button key="out" onClick={() => {
              // 	setModalOpen(true)
              // }}>
              // 	导入记录
              // </Button>,
              <Button
                type="primary"
                key="primary"
                onClick={purchaseExportListClick}
              >
                导出
              </Button>,
          }}
        />

      </XPageContainer>
      {/* <TabPane
        tabList={PURCHASE_ORDER_TABLIST}
        defaultActiveKey={tabKey}
        onChange={handleTabChange}
      />
      <ProTable
        columns={columns}
        defaultSize={'small'}
        actionRef={actionRef}
        scroll={{
          x: 'max-content',
        }}
        rowKey={'id'}
        formRef={ref}
        request={async (params = {}, sort, filter) => {
          console.log(params, 'params');

          const arg0 = {
            ...filterPageName(params),
            status: tabKey === '0' ? params.status : Number(tabKey),
            clientType: 2,
            skuSysCodeList: params.skuSysCodeList
              ? params.skuSysCodeList?.split(',')
              : undefined,
            purNoList: params.purNoList
              ? params.purNoList?.split(',')
              : undefined,
          };
          const res: any = await purchaseQueryList(arg0, {});
          const data = res.entry.list.map((item: any, index: any) => ({
            ...item,
            index: index + 1,
          }));
          return {
            data: data,
            success: res.success,
            // 不传会使用 data 的长度，如果是分页一定要传
            total: res?.entry.totalRecord,
          };
        }}
        search={{
          // labelWidth: 120,
          labelWidth: 100,
          span: 6,
          defaultCollapsed: false,
        }}
        // rowSelection={{ ...rowSelection }}
        form={{
          size: 'small',
        }}
        options={false}
        toolBarRender={() => [
          // <Button key="show">导入发货</Button>,
          // <Button key="out" onClick={() => {
          // 	setModalOpen(true)
          // }}>
          // 	导入记录
          // </Button>,
          <Button
            type="primary"
            key="primary"
            onClick={purchaseExportListClick}
          >
            导出
          </Button>,
        ]}
      />
      <Modal
        width={800}
        open={modalOpen}
        title={'导入记录列表'}
        onOk={() => {
          setModalOpen(false);
        }}
        onCancel={() => {
          setModalOpen(false);
        }}
      >
        <ProTable
          dataSource={[{ id: 1 }, { id: 2 }, { id: 3 }]}
          size={'small'}
          search={false}
          options={false}
          columns={dcolumns}
        />
      </Modal> */}
    </div>
  );
}

export default Purchase;
