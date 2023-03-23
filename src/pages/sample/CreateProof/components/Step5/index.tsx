/**
 * @file 工艺指示
 */
import { PlusOutlined } from '@ant-design/icons';
import { Table } from '@xlion/component';
import { uuid } from '@xlion/utils';
import { Button, Form, FormListFieldData, Input, Select, Space, TableProps, Typography } from 'antd';
import { pick } from 'lodash-es';
import { useEffect } from 'react';

import Upload from '@/components/Upload';
import { useSelectDict } from '@/hooks';

import ss from '../../index.less';
import { IStepProps } from '../../types';

const FormItem = Form.Item;
const FormList = Form.List;

const ProcessInstruct: React.FC<IStepProps> = ({ proofInfo, onOk }) => {
  const [form] = Form.useForm();
  const [selectDict] = useSelectDict(['type_process']);

  useEffect(() => {
    const values = form.getFieldsValue(); // 为了获取表单有哪些key
    const data = pick(proofInfo, Object.keys(values));
    form.setFieldsValue({
      ...data,
      workmanshipImages: data.workmanshipImages?.map((url: string) => ({ url })) || [],
    });
  }, [proofInfo]);

  const handleSave = async () => {
    try {
      const values = await form.getFieldsValue();
      const data = {
        ...values,
        workmanshipImages: values.workmanshipImages.map((item: any) => item.url),
      };
      onOk(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getColumns = ({
    fields,
    remove,
  }: {
    fields: FormListFieldData[];
    remove: (index: number | number[]) => void;
  }) => {
    return [
      {
        title: (
          <>
            <span className={ss.required}>*</span> 部位
          </>
        ),
        width: 200,
        render: (_, record, index) => {
          const field = fields[index];
          return (
            <FormItem
              {...field}
              className="mb-0"
              name={[field.name, 'positionName']}
              rules={[{ required: true, message: '请输入' }]}
            >
              <Input placeholder="请输入" maxLength={100} />
            </FormItem>
          );
        },
      },
      {
        title: '工艺类型',
        width: 200,
        render: (_, record, index) => {
          const field = fields[index];
          return (
            <FormItem {...field} className="mb-0" name={[field.name, 'processType']}>
              <Select placeholder="请选择" options={selectDict.typeProcess} />
            </FormItem>
          );
        },
      },
      {
        title: '做法',
        width: 200,
        render: (_, record, index) => {
          const field = fields[index];
          return (
            <FormItem {...field} className="mb-0" name={[field.name, 'practice']}>
              <Input placeholder="请输入" maxLength={100} />
            </FormItem>
          );
        },
      },
      {
        title: '操作',
        width: 80,
        align: 'center',
        render: (_, record, index) => {
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
    <Space direction="vertical" className="w-full">
      <Form
        form={form}
        initialValues={{
          clippingRequest: '',
          followingProcess: '',
          acceptanceStandard: '',
          workmanshipDetailList: [],
          workmanshipImages: [],
        }}
      >
        <FormItem label="裁剪要求" name="clippingRequest">
          <Input.TextArea rows={3} showCount maxLength={500} />
        </FormItem>
        <FormItem label="后道工序" name="followingProcess">
          <Input.TextArea rows={3} showCount maxLength={500} />
        </FormItem>
        <FormItem label="验收标准" name="acceptanceStandard">
          <Input.TextArea rows={3} showCount maxLength={500} />
        </FormItem>
        <FormList name="workmanshipDetailList">
          {(fields, { add, remove }) => (
            <FormItem label="工艺指示">
              <Table
                key={fields.length}
                rowKey="uuid"
                editable
                className={ss.editTable}
                columns={getColumns({ fields, remove })}
                dataSource={fields}
                pagination={false}
                scroll={{ x: 900 }}
                footer={() => (
                  <Button block type="dashed" icon={<PlusOutlined />} onClick={() => add({ uuid: uuid() })}>
                    新增一行
                  </Button>
                )}
              />
            </FormItem>
          )}
        </FormList>
        <FormItem label="图片附件" name="workmanshipImages">
          <Upload listType="picture-card" maxCount={6} />
        </FormItem>
      </Form>
      {/*<div className={ss.footer}>*/}
      {/*  <Button type="primary" onClick={handleSave}>*/}
      {/*    保存*/}
      {/*  </Button>*/}
      {/*</div>*/}
    </Space>
  );
};

export default ProcessInstruct;
