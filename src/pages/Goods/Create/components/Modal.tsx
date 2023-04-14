import { ProFormInstance, ProTable } from '@ant-design/pro-components';
import { Image, message, Tooltip } from 'antd';
import React, { useImperativeHandle, useRef, useState } from 'react';

import CustomModal from '@/components/CustomModal';
import { useCategory } from '@/hooks';

// import Api from '../../services';
import { sampleList } from '@/services/goods';
import BrandSelectCpt from './BrandSelectCpt';

export const SampleListModal = React.forwardRef(({ onChange }: any, ref) => {
  // const { category } = useModel('category');
  const [category] = useCategory();

  const [params, setParams] = useState({});
  let [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const formRef = useRef<ProFormInstance>();
  const actionRef = useRef();

  const formModalRef = useRef<any>();
  const columns = [
    {
      title: '样衣编号',
      key: 'sysItemCode',
      dataIndex: 'sysItemCode',
      hideInSearch: false,
    },

    {
      title: '款式信息',
      hideInSearch: true,
      dataIndex: 'code',
      key: 'code',
      width: 120,
      render: (item, record) => {
        return (
          <Image
            width={90}
            height={90}
            src={
              Array.isArray(record.images) &&
              record.images.length > 0 &&
              record.images[0]
            }
          />
        );
      },
    },

    {
      title: '样衣名称',
      key: 'title',
      dataIndex: 'title',
      render: (item, record) => {
        return (
          <Tooltip title={record.title}>
            <p className="u-els u-mb10">{record.title}</p>
          </Tooltip>
        );
      },
    },
    {
      title: '类目',
      key: 'categoryNames',
      dataIndex: 'categoryNames',
      hideInSearch: true,
      render: (item, record) => {
        return (
          <p className="u-fs12 u-mb5 u-flex">
            {/* <span className="u-c888">商品类目：</span> */}
            {Array.isArray(record.categoryNames) ? (
              <Tooltip title={record.categoryNames?.join(' / ')}>
                <span className="u-els">
                  {record.categoryNames?.join(' / ')}
                </span>
              </Tooltip>
            ) : (
              '-'
            )}
          </p>
        );
      },
    },
    {
      title: '商品品牌',
      key: 'brandName',
      dataIndex: 'brandName',
      hideInSearch: true,
    },
    {
      title: '商品品牌',
      hideInTable: true,
      dataIndex: 'brandIds',
      key: 'brandIds',
      order: 6,
      renderFormItem: () => {
        return <BrandSelectCpt mode="tags" />;
      },
    },
    {
      title: '商品类目',
      hideInTable: true,
      dataIndex: 'categoryId',
      key: 'categoryId',
      valueType: 'cascader',
      order: 7,
      fieldProps: {
        options: category,
        changeOnSelect: true,
        fieldNames: {
          children: 'children',
          label: 'name',
          value: 'categoryId',
        },
      },
    },
  ];
  const handleBatchDel = () => {
    if (selectedRowKeys.length <= 0) {
      message.warning('请勾选后，在进行批量操作～');
      return;
    } else {
      console.log(selectedRowKeys);
      onChange?.(selectedRowKeys);
      formModalRef.current?.hide();
    }
  };
  useImperativeHandle(ref, () => ({
    show: () => {
      // setStatus(status);
      setSelectedRowKeys([]);

      formModalRef.current?.show();
      // Api.Jdtem.Role.RoleSelectList().then(({ data }) => {
      //   setRole(data);
      // });
    },
  }));

  // function onSelectChange(selectedRowKeys, selectedRows) {
  //   console.log(selectedRowKeys, selectedRows);
  //   setSelectedRows({ selectedRowKeys, rows: selectedRows });
  //   const form = formModalRef.current.form;
  //   form.setFieldsValue({ userIdsName: selectedRows?.[0]?.userName, userIds: selectedRows?.[0]?.userId });
  // }
  function onSelectChange(selectedRowKeys) {
    console.log(selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  }
  return (
    <CustomModal
      ref={formModalRef}
      title={'关联样衣'}
      className="dialog__menu-form u-pl20 u-pr20"
      width={900}
      onConfirm={() => {
        handleBatchDel();
        // tableRef.current.reload();
      }}
    >
      <ProTable
        columns={columns}
        formRef={formRef}
        actionRef={actionRef}
        params={params}
        scroll={{ y: '300px' }}
        // form={{ labelCol: { span: 6 } }}
        className="custom-table"
        rowKey={'itemId'}
        onReset={() => {
          setParams({});
        }}
        rowSelection={{
          selectedRowKeys,
          type: 'radio',
          onChange: onSelectChange,
          // getCheckboxProps: (record) => ({
          //   // disabled: !(10 === record.isPromotion || 30 === record.isPromotion), // Column configuration not to be checked
          // }),
        }}
        request={async (params: any, sorter) => {
          const { current, pageSize, ...reset } = params;
          if (reset?.categoryId)
            reset.categoryId = reset.categoryId[reset.categoryId.length - 1];

          let searchData = {
            ...reset,
            ...sorter,
            pageNum: current,
            pageSize: pageSize,
          };
          const { entry }: any = await sampleList(searchData);
          return {
            data: entry?.list || [],
            success: true,
            total: entry?.totalRecord || 0,
          };
        }}
        search={{
          // collapseRender: () => null,
          defaultCollapsed: true,
          // span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 8, xxl: 6 },

          labelWidth: 'auto',
          className: 'search-form',
        }}
      />
    </CustomModal>
  );
});
