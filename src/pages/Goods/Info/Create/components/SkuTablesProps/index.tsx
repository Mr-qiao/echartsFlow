import type {
  ActionType,
  EditableFormInstance,
  ProColumns,
  ProFormInstance,
} from '@ant-design/pro-components';
import {
  EditableProTable,
  ProFormDependency,
} from '@ant-design/pro-components';
import { Button, GlobalModal, Popconfirm } from 'antd';
import React, { useContext, useRef } from 'react';

import { CptContext } from '../..';
import { ATTR_TYPE } from '../../constants';
import { IPropsType } from '../../types';
import renderProps from '../Props';

import { BatchSkuModal } from './BatchSkuModal';

import ss from './index.less';

type DataSourceType = {
  id: React.Key;
  associate?: string;
  questionsNum?: number;
  type?: string;
  fraction?: number;
  scoringMethod?: string;
};

export default () => {
  const { form, skuProps, skuOptionsDict, skuPropsDict } =
    useContext(CptContext);

  const formRef = useRef<ProFormInstance<any>>();
  const actionRef = useRef<ActionType>();
  const editableFormRef = useRef<EditableFormInstance>();
  const handleBatchFill = () => {
    GlobalModal.show(
      <BatchSkuModal
        skuPropsDict={skuPropsDict}
        onOk={(values) => {
          const skus = form.getFieldValue('skus');
          form.setFieldValue(
            'skus',
            skus?.map((item) => {
              return {
                ...item,
                ...values,
              };
            }),
          );
        }}
      />,
    );
  };
  function columns(): ProColumns<DataSourceType>[] {
    const skusOrigin = form.getFieldValue('skusOrigin');
    // console.log(skuProps, skuOptionsDict);
    return [
      ...Object.keys(skusOrigin)?.map((item) => {
        const props = skuOptionsDict[item];
        // console.log('skusOrigin[item]?.rowSpan', skusOrigin, item);
        if (!props) {
          return {};
        }
        return {
          title: item,
          dataIndex: props.categoryPropertyCode,
          width: 100,
          fixed: true,
          readonly: true,
          editable: false,
          render: (_) => {
            return Array.isArray(_) ? _?.[0]?.value : _;
          },
          // onCell: (_, index) => {
          //   const rowSpan = skusOrigin[item]?.rowSpan;
          //   if (rowSpan === 1) {
          //     return {};
          //   }
          //   if (index % rowSpan === 0) {
          //     return { rowSpan };
          //   } else {
          //     return { rowSpan: 0 };
          //   }
          // },
        };
      }),
      ...skuProps?.map((item) => {
        let props = skuPropsDict[item.value];
        const { Component, rules } = renderProps(props.propertyType);
        let width: number | null = 180;
        switch (props.propertyType) {
          case ATTR_TYPE.IMAGE:
            width = 80;
            props = {
              ...props,
              itemRender: true,
              thumbnailSize: 40,
              tip: false,
            } as IPropsType;
            break;
          case ATTR_TYPE.IMAGE_MULTIPLE:
            props = {
              ...props,
              itemRender: true,
              thumbnailSize: 40,
              tip: false,
            } as IPropsType;
            width = 300;
            break;
          case ATTR_TYPE.FILE:
            props = { ...props, customText: '上传', tip: false } as IPropsType;
            width = 300;
            break;
          case ATTR_TYPE.CHECKBOX:
            width = 200;
            break;
          case ATTR_TYPE.RADIO:
            width = 200;
            break;
        }
        return {
          title: () => (
            <>
              {props.required ? <span className="u-c__red u-mr5">*</span> : ''}
              {item.label}
            </>
          ),
          dataIndex: item.value,
          ...(width && { width }),
          formItemProps: {
            rules: rules(
              { ...props.categoryPropertyRule, required: props.required },
              props.categoryPropertyName,
            ),
          },
          renderFormItem: () => <Component {...props}></Component>,
        };
      }),
      {
        title: '操作',
        valueType: 'option',
        fixed: 'right',
        width: 80,
        render: (_) => null,
      },
    ].filter(Boolean) as ProColumns<DataSourceType>[];
  }
  return (
    <ProFormDependency name={['skusOrigin']}>
      {({ skusOrigin }) => {
        const skus = form.getFieldValue('skus');
        //监听 skusOrigin 根据 skusOrigin 填写skus
        return (
          skusOrigin && skus && (
            <div className={ss['custom__editableProTable']}>
              <Button
                onClick={handleBatchFill}
                type="primary"
                style={{ marginLeft: '12.5%', marginBottom: 5 }}
              >
                批量填充
              </Button>
              <EditableProTable<DataSourceType>
                rowKey="skuId"
                scroll={{
                  x: 'max-content',
                }}
                editableFormRef={editableFormRef}
                // controlled
                actionRef={actionRef}
                formRef={formRef}
                bordered={true}
                formItemProps={{
                  wrapperCol: { offset: 3, span: 19 },
                }}
                maxLength={10}
                name="skus"
                columns={columns()}
                recordCreatorProps={false}
                editable={{
                  type: 'multiple',
                  editableKeys: skus?.map((item) => item.skuId),
                  actionRender: (row: any) => {
                    return [
                      <Popconfirm
                        key="del"
                        placement="left"
                        title="删除此行?"
                        onConfirm={() => {
                          const tableDataSource = form.getFieldValue(
                            'skus',
                          ) as any[];
                          console.log(tableDataSource, 'tableDataSource');
                          form.setFieldsValue({
                            skus: tableDataSource.filter(
                              (item) => item?.skuId !== row?.skuId,
                            ),
                          });
                        }}
                        okText="确认"
                        cancelText="取消"
                      >
                        <span className="u-cr__p t-c__blue">删除</span>
                      </Popconfirm>,
                    ];
                    // return [defaultDoms.delete];
                  },
                }}
              />
            </div>
          )
        );
      }}
    </ProFormDependency>
  );
};
