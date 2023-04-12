/**
 * @file 尺寸标准
 */
import { PlusOutlined } from '@ant-design/icons';
import { Table } from '@xlion/component';
import { math, uuid } from '@xlion/utils';
import {
  Button,
  Col,
  DatePicker,
  Form,
  FormListFieldData,
  Input,
  InputNumber,
  Row,
  TableProps,
  Typography,
} from 'antd';
import { pick } from 'lodash-es';
import moment from 'moment';
import { useEffect } from 'react';

import ss from '../../index.less';
import { IStepProps } from '../../types';

const FormItem = Form.Item;
const FormList = Form.List;

const StandardSize: React.FC<IStepProps> = ({ sampleInfo, proofInfo, onOk }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      fangMaId: proofInfo.fangMaId,
      fangMaTime: proofInfo.fangMaTime ? moment(proofInfo.fangMaTime) : undefined,
      sizeDetailList:
        proofInfo.sizeDetailList?.map(({ sizeList = [], ...rest }: any) => {
          return {
            ...rest,
            ...sizeList.reduce((acc: any, cur: any) => {
              acc[`size-${cur.size}`] = math.div(cur.sizePrice, 100);
              return acc;
            }, {}),
          };
        }) || [],
    });
  }, [proofInfo]);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const data = {
        ...values,
        fangMaTime: values.fangMaTime ? moment(values.fangMaTime).format('YYYY-MM-DD') : undefined,
        sizeDetailList: values.sizeDetailList.map((item: any) => ({
          ...pick(item, ['positionName', 'measureType', 'errorRange', 'modelPrice']),
          sizeList: Object.keys(item)
            .filter((key) => key.startsWith('size-'))
            .map((key) => {
              const size = key.split('-')[1];
              return {
                size,
                sizePrice: math.mul(item[key], 100),
              };
            }),
        })),
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
    return [
      {
        title: (
          <>
            <span className={ss.required}>*</span> 名称
          </>
        ),
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
        title: '测量方法',
        render: (_, record, index) => {
          const field = fields[index];
          return (
            <FormItem {...field} className="mb-0" name={[field.name, 'measureType']}>
              <Input placeholder="请输入" maxLength={100} />
            </FormItem>
          );
        },
      },
      {
        title: '误差范围',
        render: (_, record, index) => {
          const field = fields[index];
          return (
            <FormItem {...field} className="mb-0" name={[field.name, 'errorRange']}>
              <InputNumber placeholder="请输入" min={0} max={999999.99} precision={2} step={0.01} />
            </FormItem>
          );
        },
      },
      {
        title: '样板值',
        render: (_, record, index) => {
          const field = fields[index];
          return (
            <FormItem {...field} className="mb-0" name={[field.name, 'modelPrice']}>
              <InputNumber placeholder="请输入" min={0} max={999999.99} precision={2} step={0.01} />
            </FormItem>
          );
        },
      },
      ...(sampleInfo.sizeComb?.map((size: string) => ({
        title: size,
        width: 120,
        render: (_, record, index) => {
          const field = fields[index];
          return (
            <FormItem {...field} className="mb-0" name={[field.name, `size-${size}`]}>
              <InputNumber placeholder="请输入" min={0} max={999999.99} precision={2} step={0.01} />
            </FormItem>
          );
        },
      })) || []),
      {
        title: '操作',
        width: 80,
        align: 'center',
        render: (_, record, index: number) => {
          return (
            <Typography.Link
              type="danger"
              onClick={() => {
                remove(index);
              }}
            >
              删除
            </Typography.Link>
          );
        },
      },
    ] as TableProps<any>['columns'];
  };

  return (
    <Form form={form} disabled>
      <Row gutter={12}>
        <Col span={6}>
          <FormItem label="放码人" name="fangMaId">
            <Input />
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem label="放码时间" name="fangMaTime">
            <DatePicker style={{ width: '100%' }} />
          </FormItem>
        </Col>
      </Row>

      <FormList name="sizeDetailList">
        {(fields, { add, remove }) => (
          <FormItem noStyle shouldUpdate>
            <Table
              key={fields.length}
              editable
              className={ss.editTable}
              rowKey="name"
              columns={getColumns({ fields, remove })}
              dataSource={fields}
              scroll={{ x: 1090 }}
              footer={() => (
                <Button block type="dashed" icon={<PlusOutlined />} onClick={() => add({ uuid: uuid() })}>
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
    </Form>
  );
};

export default StandardSize;
