import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, message, Row, Select, Table } from 'antd';
import React, { useContext, useState } from 'react';

import { CptContext } from '../index';
import SkuTablesCpt from './SkuTablesCpt';

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editable: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: any;
  rules: any;
  component: any;
  index: number;
  children: React.ReactNode;
}

const SkuCpt: any = ({ form }: any) => {
  const info = useContext(CptContext);

  let { saleProperties = [], attrEnum = [] } = info;

  let keyRef = React.useRef(0);
  let [dataSource, setDataSource] = useState<any[]>();
  let [enmu, setEnmu] = useState(attrEnum); //规格下拉筛选项

  const columns = [
    {
      title: '规格名称',
      dataIndex: 'categoryPropertyName',
      width: '25%',
      editable: true,
      key: 1,
      // component:,
      // rules: () => {
      //   return [{ required: true, message: '请选择规格名称～' }];
      // },
    },
    {
      title: '规格分类',
      dataIndex: 'categoryPropertyValues',
      width: '40%',
      key: 2,
      editable: true,
      // component: <Input placeholder="请输入规格分类～" />,
      rules: () => {
        return [{ required: true, message: '请输入规格分类～' }];
      },
    },
    {
      title: '设置',
      dataIndex: 'operation',
      width: '10%',
      fixed: 'right',
      key: 3,
      render: (_, record, idx) => (
        <>
          {idx >= 1 ? (
            <DeleteOutlined
              style={{ transform: 'translateY(5px)', color: '#ff3029' }}
              onClick={() => {
                handleDelete(record.key);
              }}
            ></DeleteOutlined>
          ) : null}
        </>
      ),
    },
  ];
  //删除
  const handleDelete = (key) => {
    let list = form.getFieldValue('saleProperties');
    let _ = list.filter((item) => item.key !== key);

    setDataSource(_);
    form.setFieldValue('saleProperties', _);
    //移除筛选项
    removeSelected(_, enmu);
  };
  //添加
  const handleAdd = () => {
    let list = form.getFieldValue('saleProperties');
    keyRef.current++;
    let key = keyRef.current;
    let _ = [...list, { key: key }];
    setDataSource(_);
    form.setFieldValue('saleProperties', _);
  };
  //生成sku
  const handleCreateSku = () => {
    let list = form.getFieldValue('saleProperties');
    if (Array.isArray(list) && list.length > 0) {
      let _array = [];
      for (let i of list) {
        let categoryPropertyName: string = i['categoryPropertyName'] || '';
        let categoryPropertyValues = i['categoryPropertyValues'].filter(Boolean);

        if (!categoryPropertyName) {
          message.info('请选择规格并输入规格值');
          return;
        }
        if (!(Array.isArray(categoryPropertyValues) && categoryPropertyValues.length > 0)) {
          message.info('请选择规格并输入规格值');
          return;
        }
        _array.push(categoryPropertyValues.map((item) => (categoryPropertyName || '') + ':' + item) as never);
      }
      //重置表单数据
      form.resetFields(['skus']);
      form.setFieldValue('skus', doComb(_array));
    } else {
      message.info('请选择规格并输入规格值');
    }
  };
  React.useEffect(() => {
    //添加key

    let _: any[] = [];
    if (saleProperties.length > 0) {
      _ = [...saleProperties].map((item, idx) => {
        item.key = idx;
        keyRef.current = idx;

        return item;
      });
    } else {
      _ = [{ key: 0 }];
    }

    setDataSource(_);
    form.setFieldValue('saleProperties', _);
    //移除筛选项

    removeSelected(saleProperties, attrEnum);
  }, [info]);
  //遍历去除选中项
  function removeSelected(list, _) {
    let _enum = [..._].map((o) => {
      let _ = list.filter((item) => o.categoryPropertyCode === item.categoryPropertyCode);

      if (_.length > 0) {
        o.selected = true;
      } else {
        o.selected = false;
      }
      return o;
    });
    setEnmu(_enum);
  }

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
          // editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          component: col.component,
          rules: col.rules,
        };
      },
    };
  });
  return (
    <Row>
      <Col span={3}>
        <p style={{ textAlign: 'right' }}>
          <span style={{ color: '#ff4d4f' }}>*</span> 生成SKU
          <span style={{ margin: '0 8px 0 2px' }}>:</span>
        </p>
      </Col>

      <Col span={19}>
        <Button
          onClick={handleAdd}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          新增一行
        </Button>
        <Button style={{ marginLeft: 20 }} onClick={handleCreateSku}>
          生成SKU
        </Button>

        <Table
          // scroll={{ x: 700 }}
          rowKey={'key'}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          rowClassName={() => 'editable-row'}
          dataSource={dataSource}
          pagination={false}
          columns={mergedColumns}
        />
      </Col>

      <Col span={24} offset={3} style={{ marginTop: 20 }}>
        <Form.Item
          label=""
          name="skus"
          wrapperCol={{ span: 19 }}
          rules={[
            () => ({
              validator(_, value) {
                if (!(value && value.length > 0)) {
                  return Promise.reject('请至少生成一条SKU');
                }
                for (let i = 0; i < value.length; i++) {
                  if (!(value[i].images && value[i].images.length > 0)) {
                    return Promise.reject('请至少选择一张图片');
                  }
                  if (!value[i].originPrice) {
                    return Promise.reject('请输入吊牌价');
                  }
                  if (!value[i].salePrice) {
                    return Promise.reject('请输入参考销售价');
                  }
                  if (!value[i].estimateLivePrice) {
                    return Promise.reject('estimateLivePrice');
                  }
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <SkuTablesCpt></SkuTablesCpt>
        </Form.Item>
      </Col>
    </Row>
  );
  function EditableCell({
    children,
    dataIndex,
    index,
    record,
    rules,
    // component,
    ...restProps
  }: EditableCellProps) {
    let rule = rules?.(index);
    let childNode: React.ReactNode;
    if ('categoryPropertyValues' === dataIndex) {
      childNode = (
        <>
          <Form.Item name={['saleProperties', index, 'key']} hidden={true}>
            <Input />
          </Form.Item>
          {record.skuId && (
            <Form.Item name={['saleProperties', index, 'skuId']} initialValue={record.skuId} hidden={true}>
              <Input />
            </Form.Item>
          )}
          {record.sysCode && (
            <Form.Item name={['saleProperties', index, 'sysCode']} initialValue={record.sysCode} hidden={true}>
              <Input />
            </Form.Item>
          )}
          <Form.List name={['saleProperties', index, dataIndex]} initialValue={['']}>
            {(lv1, { add, remove }) => {
              return (
                <>
                  <div className={`sku__list-main `}>
                    {lv1.map((o) => {
                      return (
                        <Form.Item key={`plan_${o.key}_${index}`} wrapperCol={{ span: 16 }}>
                          <Form.Item
                            name={[o.name]}
                            noStyle
                            rules={rule}
                            // initialValue={children2.length > 1 ? 1 : 2}
                          >
                            <Input style={{ width: '80%' }} placeholder="请输入规格分类～" />
                          </Form.Item>
                          {o.name !== 0 && (
                            <DeleteOutlined
                              onClick={(e) => {
                                e.stopPropagation();
                                remove(o.name);
                              }}
                              style={{ display: 'inline-block', marginLeft: 10, color: '#ff3029' }}
                            />
                          )}
                        </Form.Item>
                      );
                    })}
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      top: '17px',
                      left: '65%',
                      fontSize: '12px',
                    }}
                  >
                    <span
                      className="t-c__blue"
                      onClick={() => {
                        add();
                      }}
                    >
                      <PlusOutlined /> 添加规格分类
                    </span>
                  </div>
                </>
              );
            }}
          </Form.List>
        </>
      );
    } else {
      childNode =
        'categoryPropertyName' === dataIndex ? (
          <>
            <Form.Item name={['saleProperties', index, 'categoryPropertyCode']} hidden={true}>
              <Input />
            </Form.Item>
            <Form.Item name={['saleProperties', index, dataIndex]} rules={rule}>
              <Select
                placeholder="请选择"
                onChange={(val, option: any) => {
                  form.setFieldValue(['saleProperties', index, 'categoryPropertyCode'], option?.key);
                  let list = form.getFieldValue('saleProperties');
                  removeSelected(list, enmu);
                }}
              >
                {enmu?.map((item) => (
                  <Select.Option
                    key={item?.categoryPropertyCode}
                    value={item?.categoryPropertyName}
                    disabled={item.selected}
                  >
                    {item?.categoryPropertyName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </>
        ) : (
          <div
            style={{
              marginBottom: 24,
            }}
          >
            {children}
          </div>
        );
    }
    return <td {...restProps}>{childNode}</td>;
  }
};
export default SkuCpt;

const doComb = (arr) => {
  const temp = [];
  const results = [] as any[];
  const comb0 = (arr, depth: number = 0) => {
    const currentArr = arr[depth];
    currentArr.forEach((c: any) => {
      temp[depth] = c as never;
      if (depth !== arr.length - 1) {
        comb0(arr, depth + 1);
        // let a=depth
        // comb0(arr, ++a)
      } else {
        let str = temp?.length > 0 ? temp?.join('；') : temp;
        let item = JSON.parse(JSON.stringify({ skuId: results.length, properties: str }));
        results.push(item); // 深度拷贝temp
      }
    });
  };
  comb0(arr);
  return results;
};
