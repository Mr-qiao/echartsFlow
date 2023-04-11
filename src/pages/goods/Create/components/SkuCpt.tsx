import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Table } from '@xlion/component';
import { uuid } from '@xlion/utils';
import {
  Button,
  Form,
  FormInstance,
  FormListFieldData,
  Input,
  message,
  Select,
  Space,
  TableProps,
  Typography,
} from 'antd';
import React from 'react';

import ss from '../index.less';

// TODO: 找个时间重构这个方法
const doComb = (data: any[]) => {
  const temp: number[] = [];
  const results = [] as any[];
  const comb0 = (arr: any[], depth: number = 0) => {
    const currentArr = arr[depth];
    currentArr.forEach((c: any) => {
      temp[depth] = c as never;
      if (depth !== arr.length - 1) {
        comb0(arr, depth + 1);
      } else {
        let str = temp?.length > 0 ? temp?.join('；') : temp;
        let item = JSON.parse(
          JSON.stringify({ skuId: results.length, properties: str }),
        );
        results.push(item); // 深度拷贝temp
      }
    });
  };
  comb0(data);
  return results;
};

interface IProps {
  form: FormInstance;
  skuAttrOptions: Array<{ label: string; value: string }>;
}

const SkuCpt: React.FC<IProps> = ({ form, skuAttrOptions = [] }) => {
  const getColumns = ({
    fields,
    remove,
  }: {
    fields: FormListFieldData[];
    remove: (index: number) => void;
  }) => {
    return [
      {
        title: '规格名称',
        width: 130,
        render: (_, record, index) => {
          const field = fields[index];
          return (
            <Form.Item noStyle shouldUpdate>
              {({ getFieldValue }) => {
                const row = getFieldValue(['saleProperties']);
                const fakeSkuAttrOptions = skuAttrOptions.map((item) => ({
                  ...item,
                  disabled: row.some(
                    (r: any) => r.categoryPropertyType?.value === item.value,
                  ),
                }));
                return (
                  <Form.Item
                    name={[field.name, 'categoryPropertyType']}
                    noStyle
                  >
                    <Select
                      allowClear
                      options={fakeSkuAttrOptions}
                      placeholder="请选择"
                      labelInValue
                      className="w-full"
                    />
                  </Form.Item>
                );
              }}
            </Form.Item>
          );
        },
      },
      {
        title: '规格分类',
        render: (_, record, index) => {
          const field = fields[index];
          return (
            <Form.List
              name={[field.name, 'categoryPropertyValues']}
              initialValue={['']}
            >
              {(attrValues, { add: addValue, remove: removeValue }) => (
                <Space wrap>
                  {attrValues.map((attrField, attrIndex) => (
                    <Space key={attrIndex}>
                      <Form.Item noStyle name={[attrField.name]}>
                        <Input
                          maxLength={10}
                          placeholder="请输入"
                          style={{ width: 100 }}
                        />
                      </Form.Item>
                      <Typography.Link
                        disabled={attrValues.length === 1}
                        onClick={() => removeValue(attrIndex)}
                      >
                        <DeleteOutlined />
                      </Typography.Link>
                    </Space>
                  ))}
                  {attrValues.length < 10 && (
                    <Button
                      type="link"
                      style={{ padding: '3px' }}
                      icon={<PlusOutlined />}
                      onClick={() => addValue('')}
                    >
                      添加规格分类
                    </Button>
                  )}
                </Space>
              )}
            </Form.List>
          );
        },
      },
      {
        title: '操作',
        dataIndex: 'operation',
        width: 80,
        align: 'center',
        key: 3,
        render: (_, record, index) => {
          return (
            <Button
              type="link"
              disabled={fields.length === 1}
              icon={<DeleteOutlined />}
              onClick={() => remove(index)}
            />
          );
        },
      },
    ] as TableProps<any>['columns'];
  };

  //生成sku
  const handleCreateSku = () => {
    const saleProperties = form.getFieldValue('saleProperties');
    if (Array.isArray(saleProperties) && saleProperties.length > 0) {
      let _array = [];
      for (let i of saleProperties) {
        const categoryPropertyValues = i.categoryPropertyValues.filter(Boolean);
        if (
          Array.from(new Set(categoryPropertyValues)).length !==
          categoryPropertyValues.length
        ) {
          message.info('规格分类不允许重名');
          return;
        }
        if (
          !i.categoryPropertyType?.value ||
          !(
            Array.isArray(categoryPropertyValues) &&
            categoryPropertyValues.length > 0
          )
        ) {
          message.info('请选择规格并输入规格值');
          return;
        }

        _array.push(
          categoryPropertyValues.map(
            (item) => `${i.categoryPropertyType.label}：${item}`,
          ),
        );
      }

      //重置表单数据
      form.resetFields(['skus']);
      form.setFieldValue('skus', doComb(_array));
    } else {
      message.info('请选择规格并输入规格值');
    }
  };

  return (
    <Form.List
      name="saleProperties"
      initialValue={[
        {
          categoryPropertyType: undefined,
          categoryPropertyValues: [''],
        },
      ]}
    >
      {(skuAttrs, { add, remove }) => (
        <Form.Item
          label="生成SKU"
          required
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 19 }}
        >
          <Table
            className={ss.skuAttrTable}
            rowKey="name"
            editable
            columns={getColumns({ fields: skuAttrs, remove })}
            dataSource={skuAttrs}
            pagination={false}
            footer={() => (
              <Button
                block
                type="dashed"
                disabled={skuAttrs.length >= skuAttrOptions.length}
                style={{ backgroundColor: 'transparent' }}
                icon={<PlusOutlined />}
                onClick={() => add({ uuid: uuid() })}
              >
                添加规格
              </Button>
            )}
          />

          <Button
            type="primary"
            style={{ marginTop: 16 }}
            onClick={handleCreateSku}
          >
            生成SKU
          </Button>
        </Form.Item>
      )}
    </Form.List>
  );
};

export default SkuCpt;
