import { Table } from '@xlion/component';
import { isNullOrUnDef } from '@xlion/utils';
import {
  Button,
  Col,
  Form,
  FormInstance,
  FormListFieldData,
  Input,
  InputNumber,
  Popconfirm,
  Row,
  TableProps,
} from 'antd';
import React, { useState } from 'react';

import Upload from '@/components/Upload';

import ss from '../index.less';

interface IProps {
  form: FormInstance;
  onChange?: (value: any) => void;
}

const MIN_PRICE = 0.01;
const MAX_PRICE = 9999999998.99;
const commonPriceProps = {
  className: 'w-full',
  controls: false,
  min: MIN_PRICE,
  max: MAX_PRICE,
  precision: 2,
};

const SkuTablesCpt: React.FC<IProps> = ({ form }) => {
  let [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  function onSelectChange(key: React.Key[]) {
    setSelectedRowKeys(key);
  }

  const handleBatchFill =
    (key: string, min: number, max: number) =>
    (e: { target: { value: any } }) => {
      let value = e.target.value;
      // 过滤非数字
      value = value.replace(/[^\d.]/g, '');

      if (value === '') return;
      if (value < min) value = min.toFixed(2);
      if (value > max) value = max.toFixed(2);
      const skus = form.getFieldValue('skus');
      skus.forEach((item: any) => {
        item[key] = value;
      });
      form.setFieldValue('skus', skus);
    };

  const getColumns = (fields: FormListFieldData[]) => {
    return [
      {
        title: '规格',
        width: 100,
        render: (_, record, index) => {
          const field = fields[index];
          const properties = form.getFieldValue([
            'skus',
            field.name,
            'properties',
          ]);
          return properties;
        },
      },
      {
        title: (
          <div className={ss.th}>
            <span className={ss.required}>*</span>货品图
          </div>
        ),
        width: 240,
        render: (_, record: any, index: number) => {
          const field = fields[index];
          return (
            <Form.Item name={[field.name, 'images']} noStyle>
              <Upload listType="picture-card" maxCount={3} tip={false} />
            </Form.Item>
          );
        },
      },
      {
        title: 'SKU商家编码',
        width: 120,
        render: (_, record: any, index: number) => {
          const field = fields[index];
          return (
            <Form.Item name={[field.name, 'skuCode']} noStyle>
              <Input placeholder="SKU商家编码" maxLength={50} />
            </Form.Item>
          );
        },
      },
      {
        title: '渠道销售SKU编码',
        width: 130,
        render: (_, record: any, index: number) => {
          const field = fields[index];
          return (
            <Form.Item name={[field.name, 'outsideSkuCode']} noStyle>
              <Input placeholder="渠道销售SKU编码" maxLength={50} />
            </Form.Item>
          );
        },
      },
      {
        title: (
          <div className={ss.th}>
            <span className={ss.required}>*</span>
            <InputNumber
              placeholder="吊牌价批量填充"
              {...commonPriceProps}
              onBlur={handleBatchFill('originPrice', MIN_PRICE, MAX_PRICE)}
            />
          </div>
        ),
        width: 120,
        render: (_, record: any, index: number) => {
          const field = fields[index];
          return (
            <Form.Item name={[field.name, 'originPrice']} noStyle>
              <InputNumber placeholder="吊牌价" {...commonPriceProps} />
            </Form.Item>
          );
        },
      },
      {
        title: (
          <div className={ss.th}>
            <span className={ss.required}>*</span>
            <InputNumber
              placeholder="参考销售价批量填充"
              {...commonPriceProps}
              onBlur={handleBatchFill('salePrice', MIN_PRICE, MAX_PRICE)}
            />
          </div>
        ),
        width: 120,
        render: (_, record: any, index: number) => {
          const field = fields[index];
          return (
            <Form.Item name={[field.name, 'salePrice']} noStyle>
              <InputNumber placeholder="参考销售价" {...commonPriceProps} />
            </Form.Item>
          );
        },
      },
      {
        title: (
          <div className={ss.th}>
            <span className={ss.required}>*</span>
            <InputNumber
              placeholder="预计直播价批量填充"
              {...commonPriceProps}
              onBlur={handleBatchFill(
                'estimateLivePrice',
                MIN_PRICE,
                MAX_PRICE,
              )}
            />
          </div>
        ),
        width: 120,
        render: (_, record: any, index: number) => {
          const field = fields[index];
          return (
            <Form.Item name={[field.name, 'estimateLivePrice']} noStyle>
              <InputNumber placeholder="预计直播价" {...commonPriceProps} />
            </Form.Item>
          );
        },
      },
      {
        title: (
          <div className={ss.th}>
            <span className={ss.required}>*</span>
            <InputNumber
              className="w-full"
              placeholder="预计佣金比例批量填充"
              controls={false}
              min={0}
              max={90}
              precision={2}
              onBlur={handleBatchFill('commissionRatio', 0, 90)}
            />
          </div>
        ),
        width: 120,
        render: (_, record: any, index: number) => {
          const field = fields[index];
          return (
            <Form.Item name={[field.name, 'commissionRatio']} noStyle>
              <InputNumber
                placeholder="预计佣金比例"
                className="w-full"
                controls={false}
                min={0}
                max={90}
                precision={2}
              />
            </Form.Item>
          );
        },
      },
      // {
      //   title: (
      //     <div className={ss.th}>
      //       <span className={ss.required}>*</span>
      //       <InputNumber
      //         placeholder="参考供货价批量填充"
      //         {...commonPriceProps}
      //         onBlur={handleBatchFill('supplyPrice', MIN_PRICE, MAX_PRICE)}
      //       />
      //     </div>
      //   ),
      //   width: 120,
      //   render: (_, record: any, index: number) => {
      //     const field = fields[index];
      //     return (
      //       <Form.Item name={[field.name, 'supplyPrice']} noStyle>
      //         <InputNumber placeholder="参考供货价" {...commonPriceProps} />
      //       </Form.Item>
      //     );
      //   },
      // },
    ] as TableProps<any>['columns'];
  };

  return (
    <Form.List
      name="skus"
      rules={[
        {
          validator: (_, value) => {
            if (!value || value.length === 0) {
              return Promise.reject('至少生成一个SKU');
            }
            const hasEmptyKey = value.some((item) => {
              return (
                !item.images ||
                item.images?.length === 0 ||
                isNullOrUnDef(item.originPrice) ||
                isNullOrUnDef(item.salePrice) ||
                isNullOrUnDef(item.estimateLivePrice) ||
                isNullOrUnDef(item.commissionRatio)
                // ||isNullOrUnDef(item.supplyPrice)
              );
            });
            if (hasEmptyKey) {
              return Promise.reject('请填写完整SKU信息');
            }

            return Promise.resolve();
          },
        },
      ]}
      initialValue={[]}
    >
      {(skus, { remove }, { errors }) => (
        <Row style={{ marginBottom: 16 }}>
          <Col span={19} offset={3}>
            <Popconfirm
              onConfirm={() => {
                remove(selectedRowKeys as number[]);
                setSelectedRowKeys([]);
              }}
              placement="left"
              title="确认批量删除吗？"
              okText="确认"
              cancelText="取消"
            >
              <Button style={{ marginBottom: 16 }}>批量删除</Button>
            </Popconfirm>
            <Table
              scroll={{ x: 1500 }}
              rowKey="name"
              editable
              rowSelection={{
                selectedRowKeys,
                onChange: onSelectChange,
              }}
              dataSource={skus}
              pagination={false}
              columns={getColumns(skus)}
            />
            <Form.ErrorList errors={errors} />
          </Col>
        </Row>
      )}
    </Form.List>
  );
};

export default SkuTablesCpt;
