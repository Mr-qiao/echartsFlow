/**
 * @file 物料清单
 */
import { PlusOutlined } from '@ant-design/icons';
import { uuid } from '@xlion/utils';
import {
  Button,
  Form,
  FormListFieldData,
  Input,
  InputNumber,
  Select,
  Space,
  TableProps,
  Typography,
  Table
} from '@xlion/component';
import { useEffect } from 'react';

import ss from '../../index.less';
import { IStepProps } from '../../types';

const FormItem = Form.Item;
const FormList = Form.List;

const MaterialList: React.FC<IStepProps> = ({
  sampleInfo,
  proofInfo,
  onOk,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      materialDetailList: proofInfo.materialDetailList,
      // proofInfo.materialDetailList?.map((item: any) => {
      //   const sizeMaterials = item.sizeMaterials?.reduce((prev, curr) => {
      //     return {
      //       ...prev,
      //       [`size-${curr.size}`]: curr.value,
      //     };
      //   }, {});
      //   const colorMaterials = item.colorMaterials?.reduce((prev, curr) => {
      //     return {
      //       ...prev,
      //       [`color-${curr.colorName}`]: curr.materialName,
      //     };
      //   }, {});
      //   return {
      //     ...item,
      //     ...sizeMaterials,
      //     ...colorMaterials,
      //   };
      // }) || [],
    });
  }, [proofInfo]);

  const handleSave = async () => {
    try {
      const { materialDetailList = [] } = await form.validateFields();
      const data = {
        materialDetailList: materialDetailList.map((item: any) => {
          // const sizeMaterials = Object.keys(item)
          //   .filter((key) => key.startsWith('size-'))
          //   .map((key) => {
          //     const size = key.split('-')[1];
          //     const value = item[key];
          //     delete item[key];
          //     return { size, value };
          //   });
          // const colorMaterials = Object.keys(item)
          //   .filter((key) => key.startsWith('color-'))
          //   .map((key) => {
          //     const color = key.split('-')[1];
          //     const value = item[key];
          //     delete item[key];
          //     return { colorName: color, materialName: value };
          //   });

          delete item.uuid;
          return {
            ...item,
            // sizeMaterials,
            // colorMaterials,
          };
        }),
      };
      onOk(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getColumns = ({
    fields,
    remove,
  }: {
    fields: FormListFieldData[];
    remove: (index: number | number[]) => void;
  }) => {
    // const sizeColumns =
    //   sampleInfo.sizeComb?.map((size: string) => ({
    //     title: size,
    //     width: 120,
    //     render: (_: any, record: any, index: number) => {
    //       const field = fields[index];
    //       return (
    //         <FormItem
    //           {...field}
    //           className="mb-0"
    //           name={[field.name, `size-${size}`]}
    //         >
    //           <InputNumber
    //             placeholder="请输入"
    //             min={0}
    //             max={999999.99}
    //             precision={2}
    //             step={0.01}
    //           />
    //         </FormItem>
    //       );
    //     },
    //   })) || [];

    // const colorColumns =
    //   sampleInfo.colorComb?.map((color: string) => ({
    //     title: color,
    //     width: 120,
    //     render: (_: any, record: any, index: number) => {
    //       const field = fields[index];
    //       return (
    //         <FormItem
    //           {...field}
    //           className="mb-0"
    //           name={[field.name, `color-${color}`]}
    //         >
    //           <InputNumber
    //             placeholder="请输入"
    //             min={0}
    //             max={999999.99}
    //             precision={2}
    //             step={0.01}
    //           />
    //         </FormItem>
    //       );
    //     },
    //   })) || [];

    return [
      {
        title: (
          <>
            <span className={ss.required}>*</span> 采购类型
          </>
        ),
        width: 150,
        render: (_, record, index) => {
          const field = fields[index];
          return (
            <FormItem
              {...field}
              className="mb-0"
              name={[field.name, 'purchaseType']}
              rules={[{ required: true, message: '请选择' }]}
            >
              <Select
                options={[
                  {
                    value: 1,
                    label: '自购',
                  },
                  {
                    value: 2,
                    label: '厂供',
                  },
                ]}
                allowClear
                placeholder="请选择"
              />
            </FormItem>
          );
        },
      },
      {
        title: '供应商',
        width: 200,
        render: (_, record, index) => {
          const field = fields[index];
          return (
            <FormItem
              {...field}
              className="mb-0"
              name={[field.name, 'supplierName']}
            >
              <Input placeholder="请输入" maxLength={100} />
            </FormItem>
          );
        },
      },
      {
        title: '物料编号',
        width: 150,
        render: (_, record, index) => {
          const field = fields[index];
          return (
            <FormItem {...field} className="mb-0" name={[field.name, 'materialNo']}>
              <Input placeholder="请输入" maxLength={100} />
            </FormItem>
          );
        },
      },
      {
        title: '物料类型',
        width: 200,
        render: (_, record, index) => {
          const field = fields[index];
          return (
            <FormItem
              {...field}
              className="mb-0"
              name={[field.name, 'materialType']}
            >
              <Select
                options={[
                  {
                    value: '主料',
                    label: '主料',
                  },
                  {
                    value: '辅料',
                    label: '辅料',
                  },
                ]}
                allowClear
                placeholder="请选择"
              />
            </FormItem>
          );
        },
      },
      {
        title: '物料名称',
        width: 100,
        render: (_, record, index) => {
          const field = fields[index];
          return (
            <FormItem {...field} className="mb-0" name={[field.name, 'materialName']}>
              <Input placeholder="请输入" maxLength={100} />
            </FormItem>
          )
        },
      },
      {
        title: '物料用量',
        width: 200,
        render: (_, record, index) => {
          const field = fields[index];
          return (
            <FormItem
              {...field}
              className="mb-0"
              name={[field.name, 'useValue']}
            >
              <InputNumber
                placeholder="请输入"
                min={0}
                max={999999.99}
                precision={2}
                step={0.01}
              />
            </FormItem>
          );
        },
      },
      {
        title: '损耗率',
        width: 150,
        render: (_, record, index) => {
          const field = fields[index];
          return (
            <FormItem
              {...field}
              className="mb-0"
              name={[field.name, 'attritionRate']}
            >
              <InputNumber
                placeholder="请输入"
                min={0}
                max={99.99}
                precision={2}
                step={0.01}
              />
            </FormItem>
          );
        },
      },
      {
        title: '使用部位',
        width: 200,
        render: (_, record, index) => {
          const field = fields[index];
          return (
            <FormItem
              {...field}
              className="mb-0"
              name={[field.name, 'positionName']}
            >
              <Input placeholder="请输入" maxLength={100} />
            </FormItem>
          );
        },
      },
      {
        title: '门幅',
        width: 150,
        render: (_, record, index) => {
          const field = fields[index];
          return (
            <FormItem
              {...field}
              className="mb-0"
              name={[field.name, 'doorWidth']}
            >
              <InputNumber
                placeholder="请输入"
                min={0}
                max={999.99}
                precision={2}
                step={0.01}
              />
            </FormItem>
          );
        },
      },
      {
        title: '克重',
        width: 150,
        render: (_, record, index) => {
          const field = fields[index];
          return (
            <FormItem
              {...field}
              className="mb-0"
              name={[field.name, 'gramWeight']}
            >
              <InputNumber
                placeholder="请输入"
                min={0}
                max={999999.99}
                precision={2}
                step={0.01}
              />
            </FormItem>
          );
        },
      },
      {
        title: '纸筒',
        width: 150,
        render: (_, record, index) => {
          const field = fields[index];
          return (
            <FormItem
              {...field}
              className="mb-0"
              name={[field.name, 'paperTube']}
            >
              <InputNumber
                placeholder="请输入"
                min={0}
                max={999999.99}
                precision={2}
                step={0.01}
              />
            </FormItem>
          );
        },
      },
      {
        title: '空差',
        width: 150,
        render: (_, record, index) => {
          const field = fields[index];
          return (
            <FormItem
              {...field}
              className="mb-0"
              name={[field.name, 'spaceDifference']}
            >
              <InputNumber
                placeholder="请输入"
                min={0}
                max={999999.99}
                precision={2}
                step={0.01}
              />
            </FormItem>
          );
        },
      },
      {
        title: '卷重',
        width: 150,
        render: (_, record, index) => {
          const field = fields[index];
          return (
            <FormItem
              {...field}
              className="mb-0"
              name={[field.name, 'rollWeight']}
            >
              <InputNumber
                placeholder="请输入"
                min={0}
                max={999999.99}
                precision={2}
                step={0.01}
              />
            </FormItem>
          );
        },
      },
      {
        title: '单位',
        width: 150,
        render: (_, record) => {
          return record.unit ?? '-';
        },
      },
      {
        title: '经缩',
        width: 150,
        render: (_, record, index) => {
          const field = fields[index];
          return (
            <FormItem
              {...field}
              className="mb-0"
              name={[field.name, 'kneesDefects']}
            >
              <InputNumber
                placeholder="请输入"
                min={0}
                max={99.99}
                precision={2}
                step={0.01}
              />
            </FormItem>
          );
        },
      },
      {
        title: '维缩',
        width: 150,
        render: (_, record, index) => {
          const field = fields[index];
          return (
            <FormItem
              {...field}
              className="mb-0"
              name={[field.name, 'woofShrink']}
            >
              <InputNumber
                placeholder="请输入"
                min={0}
                max={99.99}
                precision={2}
                step={0.01}
              />
            </FormItem>
          );
        },
      },
      {
        title: '备注',
        // width: 300,
        render: (_, record, index) => {
          const field = fields[index];
          return (
            <FormItem {...field} className="mb-0" name={[field.name, 'remark']}>
              <Input.TextArea placeholder="请输入" maxLength={30} />
            </FormItem>
          );
        },
      },
      {
        title: '操作',
        fixed: 'right',
        width: 80,
        align: 'center',
        render: (_, record, index: number) => {
          return (
            <Typography.Link type="danger" onClick={() => remove(index)}>
              删除
            </Typography.Link>
          );
        },
      },
    ] as TableProps<any>['columns'];
  };

  return (
    <Form
      form={form}
      initialValues={{
        materialDetailList: [],
      }}
      disabled
    >
      <Space direction="vertical" className="w-full">
        <FormList name="materialDetailList">
          {(fields, { add, remove }) => (
            <FormItem noStyle shouldUpdate>
              <Table
                key={fields.length}
                rowKey="key"
                editable
                className={ss.editTable}
                columns={getColumns({ fields, remove })}
                dataSource={fields}
                scroll={{ x: 1090 }}
                pagination={false}
                footer={() => (
                  <Button
                    block
                    type="dashed"
                    icon={<PlusOutlined />}
                    onClick={() => add({ uuid: uuid() })}
                  >
                    新增一行
                  </Button>
                )}
              />
            </FormItem>
          )}
        </FormList>

        {/*<div className={ss.footer}>*/}
        {/*  <Button type="primary" onClick={handleSave}>*/}
        {/*    保存*/}
        {/*  </Button>*/}
        {/*</div>*/}
      </Space>
    </Form>
  );
};

export default MaterialList;
