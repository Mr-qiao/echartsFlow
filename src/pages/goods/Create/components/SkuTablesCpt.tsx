import { Button, Input, InputNumber, message, Popconfirm, Table } from 'antd';
import React, { useMemo, useState } from 'react';

import PicturesWall from '@/components/PicturesWall';

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editable?: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: any;
  index: number;
  children: React.ReactNode;
  rules?: any;
  component?: any;
  titleType?: string;
  onCell?: any;
  onHeaderCell?: any;
}
const EditableTdCell: React.FC<EditableCellProps> = ({
  editable,
  children,
  index,
  record,
  rules,
  component,
  // dataIndex,
  ...restProps
}) => {
  // let rule = rules?.(index);
  let childNode: React.ReactNode = editable ? (
    // <Form.Item name={['list', index, dataIndex]} rules={rule}>
    component({ record, ...restProps }, index)
  ) : (
    // </Form.Item>
    <div
      style={{
        marginBottom: 24,
      }}
    >
      {children}
    </div>
  );
  return <td {...restProps}>{childNode}</td>;
};
const SkuTablesCpt: any = React.forwardRef(({ value, onChange }: any, ref): any => {
  // let [inputValue, serInputValue] = useState(1);
  let [dataSource, serDataSource] = useState<any>([]);
  let [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const columns = [
    {
      title: '规格',
      width: 100,
      dataIndex: 'properties',
      key: 'properties',
    },
    {
      title: '货品图',
      width: 400,
      dataIndex: 'images',
      key: 'images',
      editable: true,
      component: (record: any, idx: number) => {
        return (
          <>
            <PicturesWall
              maxCount={3}
              width={100}
              uploadButton={'+'}
              value={dataSource[idx][record.dataIndex]}
              onChange={(value) => {
                value = value.map((item) => item.url);
                handleInputValue(value, record, idx);
              }}
            />
            {!dataSource[idx][record.dataIndex] && <p style={{ color: '#ff4d4f' }}>请输入</p>}
          </>
        );
      },
    },
    {
      title: 'sku商家编码',
      dataIndex: 'skuCode',
      width: 120,
      key: 'skuCode',
      editable: true,
      component: (record: any, idx: number) => {
        return (
          <Input
            placeholder="请输入sku商家编码"
            onChange={(e) => {
              handleInputValue(e.target.value, record, idx);
            }}
          />
        );
      },
    },
    {
      title: '渠道销售sku编码',
      dataIndex: 'outsideSkuCode',
      width: 130,
      key: 'outsideSkuCode',
      editable: true,
      component: (record: any, idx: number) => {
        return (
          <Input
            placeholder="请输入渠道销售sku编码"
            onChange={(e) => {
              handleInputValue(e.target.value, record, idx);
            }}
          />
        );
      },
    },
    {
      title: '吊牌价批量填充',
      titleType: 'input',
      dataIndex: 'originPrice',
      width: 120,
      key: 'originPrice',
      editable: true,
      component: (record: any, idx: number) => {
        return (
          <InputNumber
            placeholder="请输入吊牌价"
            className="ant-input-required"
            value={dataSource[idx][record.dataIndex]}
            status={dataSource[idx][record.dataIndex] ? '' : 'error'}
            onChange={(value) => {
              handleInputValue(value, record, idx);
            }}
            controls={false}
            min={0}
            max={999999999.99}
            precision={2}
          />
        );
      },
      rules: () => {
        return [{ required: true }];
      },
    },
    {
      title: '参考销售价',
      titleType: 'input',
      dataIndex: 'salePrice',
      width: 120,
      key: 'salePrice',
      editable: true,
      component: (record: any, idx: number) => {
        return (
          <InputNumber
            placeholder="请输入参考销售价"
            className="ant-input-required"
            value={dataSource[idx][record.dataIndex]}
            status={dataSource[idx][record.dataIndex] ? '' : 'error'}
            onChange={(value) => {
              handleInputValue(value, record, idx);
            }}
            controls={false}
            min={0}
            max={999999999.99}
            precision={2}
          />
        );
      },
      rules: () => {
        return [{ required: true }];
      },
    },
    {
      title: '预计直播价',
      titleType: 'input',
      dataIndex: 'estimateLivePrice',
      width: 120,
      key: 'estimateLivePrice',
      editable: true,
      component: (record, idx) => {
        return (
          <InputNumber
            placeholder="请输入预计直播价"
            className="ant-input-required"
            value={dataSource[idx][record.dataIndex]}
            status={dataSource[idx][record.dataIndex] ? '' : 'error'}
            onChange={(value) => {
              handleInputValue(value, record, idx);
            }}
            controls={false}
            min={0}
            max={999999999.99}
            precision={2}
          />
        );
      },
      rules: () => {
        return [{ required: true }];
      },
    },

    {
      title: '预计佣金比例',
      titleType: 'input',
      dataIndex: 'commissionRatio',
      width: 120,
      key: 'commissionRatio',
      editable: true,
      component: (record, idx) => {
        return (
          <InputNumber
            placeholder="请输入预计佣金比例"
            className="ant-input-required"
            value={dataSource[idx][record.dataIndex]}
            status={dataSource[idx][record.dataIndex] ? '' : 'error'}
            onChange={(value) => {
              handleInputValue(value, record, idx);
            }}
            controls={false}
            min={0}
            max={100}
            precision={2}
          />
        );
      },
      rules: () => {
        return [{ required: true }];
      },
    },
    {
      title: '参考供货价',
      titleType: 'input',
      dataIndex: 'supplyPrice',
      width: 120,
      key: 'supplyPrice',
      editable: true,
      component: (record, idx) => {
        return (
          <InputNumber
            placeholder="请输入参考供货价"
            className="ant-input-required"
            value={dataSource[idx][record.dataIndex]}
            status={dataSource[idx][record.dataIndex] ? '' : 'error'}
            onChange={(value) => {
              handleInputValue(value, record, idx);
            }}
            controls={false}
            min={0}
            max={999999999.99}
            precision={2}
          />
        );
      },
      rules: () => {
        return [{ required: true }];
      },
    },
  ];
  //table input change
  const handleInputValue = (value, record, idx) => {
    // console.log(record, idx, name);
    let arr = [...dataSource];
    arr[idx][record.dataIndex] = value;
    console.log(value);
    serDataSource(arr);
    triggerChange(arr);
  };
  //批量删除
  const handleBatchDel = () => {
    if (selectedRowKeys.length <= 0) {
      message.warning('请勾选后，在进行批量操作～');
      return;
    } else {
      let _ = [...dataSource];
      let arr = _.filter((item) => !selectedRowKeys.includes(item.key as never));
      serDataSource(arr);
      triggerChange(arr);
    }
  };
  useMemo(() => {
    if (value) {
      //多维数组 数据格式化
      let _ = [...value];
      serDataSource(_);
    }
  }, [value]);

  function triggerChange(data) {
    let _ = JSON.parse(JSON.stringify(data));
    onChange?.(_);
  }

  function onSelectChange(key) {
    setSelectedRowKeys(key);
  }

  const EditableThCell: React.FC<EditableCellProps> = ({
    children,
    title,
    titleType,
    dataIndex,
    editable,

    ...restProps
  }) => {
    let inputValue: any;
    //input 失去焦点修改
    const handleInputChange = (e) => {
      e.stopPropagation();
      inputValue = e.target.value;
      if (inputValue === '') return;
      let _arr = [...dataSource];
      let _data: any = _arr.map((item: any) => {
        item[dataIndex] = inputValue;
        return item;
      });
      serDataSource(_data);
      triggerChange(_data);
    };
    let { onCell, onHeaderCell, component, rules, ...props } = restProps;
    return (
      <th {...props}>
        {titleType && titleType === 'input' ? (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {restProps.rules && <span style={{ marginRight: 5, color: '#f00009' }}>*</span>}
            <Input value={inputValue} placeholder={title ? title : '请输入'} onBlur={handleInputChange} />
          </div>
        ) : (
          children
        )}
      </th>
    );
  };

  const mergedColumns = [...columns].map((col: any) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record, index) => {
        return {
          record,
          index,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          component: col.component,
          rules: col.rules,
        };
      },
      onHeaderCell: (columns: any) => columns,
    };
  });

  return (
    Array.isArray(dataSource) &&
    dataSource.length > 0 && (
      <>
        <Popconfirm
          onConfirm={handleBatchDel}
          placement="left"
          title="确认批量删除吗？"
          okText="确认"
          cancelText="取消"
        >
          <Button style={{ marginBottom: 10 }} type="primary">
            批量删除
          </Button>
        </Popconfirm>
        <Table
          scroll={{ x: 1200 }}
          rowKey={'skuId'}
          rowSelection={{
            selectedRowKeys,
            onChange: onSelectChange,
            // getCheckboxProps: (record) => ({
            //   // disabled: !(10 === record.isPromotion || 30 === record.isPromotion), // Column configuration not to be checked
            // }),
          }}
          components={{
            header: {
              cell: EditableThCell,
            },
            body: {
              cell: EditableTdCell,
            },
          }}
          rowClassName={() => 'editable-row'}
          className="sku__table-wrapper"
          dataSource={dataSource}
          pagination={false}
          columns={mergedColumns}
        />
      </>
    )
  );
});
SkuTablesCpt.defaultProps = {};
export default SkuTablesCpt;
