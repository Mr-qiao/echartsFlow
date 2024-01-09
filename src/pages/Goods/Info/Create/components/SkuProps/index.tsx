import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Input,
  message,
  Select,
  Table,
  TableProps,
} from 'antd';
import React, { useContext } from 'react';
// import { Table } from 'antd';
import { math, uuid } from '@xlion/utils';
import { Form, FormListFieldData } from 'antd';

import { CptContext } from '../../index';
import { IPropsType } from '../../types';

import SpecsCheckboxInput from './SpecsCheckboxInput';
import SpecsInput from './SpecsInput';

import ss from '../../index.less';

// TODO: 找个时间重构这个方法
const doComb = (data: any[]): { skuId: number; properties: string }[] => {
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
        // console.log(str, temp, data);
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
  [x: string]: any;
}

const SkuProps: React.FC<IProps> = () => {
  const { form, skuOptions, skuOptionsDict } = useContext(CptContext);

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
                const fakeSkuAttrOptions = skuOptions.map((item) => ({
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
                      options={fakeSkuAttrOptions}
                      placeholder="请选择"
                      labelInValue
                      className="w-full"
                      allowClear
                      bordered
                      onChange={(val) => {
                        //  根据选择规格 ，添加规格枚举

                        form.setFieldValue(
                          [
                            'saleProperties',
                            field.name,
                            'categoryPropertyValues',
                          ],
                          val
                            ? skuOptionsDict[val.label]
                              ?.itemCatePropertyValueEnumS
                            : [],
                        );
                      }}
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
            <Form.Item
              shouldUpdate={(prev, cur) => {
                return (
                  prev?.saleProperties[
                    index
                  ]?.categoryPropertyType?.toString() !==
                  cur?.saleProperties[index]?.categoryPropertyType?.toString()
                );
              }}
              noStyle
            >
              {({ getFieldValue }) => {
                const { categoryPropertyType = '' } = getFieldValue([
                  'saleProperties',
                  index,
                ]);
                const rowData: IPropsType | undefined =
                  skuOptionsDict[categoryPropertyType?.label];
                const { itemCatePropertyValueEnumS = [] } = rowData || {};
                return categoryPropertyType && rowData ? (
                  Array.isArray(itemCatePropertyValueEnumS) &&
                    itemCatePropertyValueEnumS.length > 0 ? (
                    <SpecsCheckboxInput rowData={rowData} field={field} />
                  ) : (
                    <SpecsInput rowData={rowData} field={field} />
                  )
                ) : (
                  ''
                );
              }}
            </Form.Item>
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
      let _array: any[] = [];

      for (let i of saleProperties) {
        const categoryPropertyValues = i.categoryPropertyValues
          ? i.categoryPropertyValues
            ?.map((item) => {
              //区分对象和字符串
              if (typeof item === 'string') {
                return item;
              } else {
                return item.checked ? item.value : false;
              }
            })
            .filter(Boolean)
          : [];
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
          categoryPropertyValues?.map(
            (item) => `${i.categoryPropertyType.label}：${item}`,
          ),
        );
      }
      // console.log(_array);
      // console.log(doComb(_array));
      //重置表单数据
      try {
        const newData = doComb(_array)?.map((item) => {
          const data = item.properties.split('；');
          return {
            ...item,
            ...data?.reduce((acc: any, cur: any) => {
              const [key, value] = cur.split('：');
              acc[skuOptionsDict[key].categoryPropertyCode] = value;
              return acc;
            }, {}),
          };
        });

        form.resetFields(['skus']);
        form.setFieldValue('skus', newData);

        //原数据用于 监听 单向
        let skusOrigin: Recordable<{
          key: string;
          rowSpan: number;
          title: string;
          value: string[];
        }> = _array
          ?.map((item, idx) => {
            let title = '';
            const arr = item.reduce((acc: any, cur: any) => {
              const [key, value] = cur.split('：');
              title = key;
              return [...(acc || []), value];
            }, []);
            const rowSpan = _array
              .slice(idx + 1)
              ?.reduce((acc: any, cur: any) => math.mul(acc, cur.length), 1);
            return {
              title,
              value: arr,
              rowSpan: rowSpan,
            };
          })
          ?.reduce((acc: any, cur: any) => {
            acc[cur.title] = { ...cur, key: uuid() };
            return acc;
          }, {});
        console.log(skusOrigin);
        form.setFieldValue('skusOrigin', skusOrigin);
      } catch (e) {
        form.setFieldValue('skusOrigin', '');
        message.error('规格不匹配，无法生成sku，请确认～');
      }
    } else {
      message.info('请选择规格并输入规格值');
    }
  };

  return (
    <>
      {skuOptions.length > 0 && (
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
                // editable
                columns={getColumns({ fields: skuAttrs, remove })}
                dataSource={skuAttrs}
                pagination={false}
                footer={() => (
                  <Button
                    block
                    type="dashed"
                    disabled={skuAttrs.length >= skuOptions.length}
                    style={{ backgroundColor: 'transparent' }}
                    icon={<PlusOutlined />}
                    onClick={() => add({ uuid: uuid() })}
                  >
                    添加规格
                  </Button>
                )}
              />

              <Button style={{ marginTop: 16 }} onClick={handleCreateSku}>
                生成SKU
              </Button>
            </Form.Item>
          )}
        </Form.List>
      )}
      <Form.Item hidden={true} name="skusOrigin">
        <Input />
      </Form.Item>
    </>
  );
};

export default SkuProps;
