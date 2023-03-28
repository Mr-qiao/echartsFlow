/**
 * @file 基本信息
 */
import { PlusOutlined } from '@ant-design/icons';
import { Table } from '@xlion/component';
import { uuid } from '@xlion/utils';
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Descriptions,
  Form,
  FormListFieldData,
  Input,
  Row,
  Select,
  TableProps,
  Typography,
} from 'antd';
import { pick } from 'lodash-es';
import moment from 'moment';
import { useEffect } from 'react';

import Upload from '@/components/Upload';
import { useSelectDict } from '@/hooks';

import ss from '../../index.less';
import { IStepProps } from '../../types';
import PlateDivisionSelect from '../PlateDivisionSelect';

const FormItem = Form.Item;
const FormList = Form.List;

// 需要日期转化到key
const shouldDateTransformKeys = [
  'liningRequirementTime',
  'bomRequirementTime',
  'sampleClothesRequirementTime',
  'liningFinishTime',
  'rimFinishTime',
  'sampleClothesAuditTime',
  'sampleClothesFinishTime',
];

const dictKeys = ['type_for_people', 'type_sample_source', 'type_model', 'type_season'];

const BasicInfo: React.FC<IStepProps> = ({ sampleInfo, proofInfo, onOk }) => {
  const [form] = Form.useForm();
  const [selectDict, selectDictMap] = useSelectDict(dictKeys);

  // 初始化表单数据
  useEffect(() => {
    const values = form.getFieldsValue(); // 为了获取表单有哪些key
    const data = pick(proofInfo, Object.keys(values));
    form.setFieldsValue({
      ...data,
      ...shouldDateTransformKeys.reduce((acc: Recordable<any>, cur) => {
        if (data[cur]) {
          acc[cur] = moment(data[cur]);
        }
        return acc;
      }, {}),
      skcList:
        data.skcList?.map((skc: any) => ({
          ...skc,
          skcImageUrls: skc.skcImageUrls.map((url: string) => ({ url })),
        })) || [],
    });
  }, [proofInfo]);

  // 保存
  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const data = {
        ...values,
        ...shouldDateTransformKeys.reduce((acc: Recordable<any>, cur) => {
          if (values[cur]) {
            acc[cur] = moment(values[cur]).format('YYYY-MM-DD');
          }
          return acc;
        }, {}),
        urgentType: values.urgentType ? 1 : 0,
        skcList: values.skcList.map((skc: any) => ({
          ...skc,
          skcMainColor: skc.skcMainColor ? 1 : 0,
          skcImageUrls: skc.skcImageUrls.map((item: any) => item.url),
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
            <span className={ss.required}>*</span> 颜色名称
          </>
        ),
        width: 140,
        render: (_, record, index: number) => {
          const field = fields[index];
          const options = sampleInfo.colorComb.map((color) => ({ label: color, value: color }));
          return (
            <FormItem
              {...field}
              className="mb-0"
              name={[field.name, 'skcColorName']}
              rules={[{ required: true, message: '请选择' }]}
            >
              <Select allowClear options={options} />
            </FormItem>
          );
        },
      },
      {
        title: '是否主色',
        width: 100,
        align: 'center',
        render: (_, record, index: number) => {
          const field = fields[index];
          return (
            <FormItem {...field} className="mb-0" name={[field.name, 'skcMainColor']} valuePropName="checked">
              <Checkbox>加急</Checkbox>
            </FormItem>
          );
        },
      },
      {
        title: '图片',
        render: (_, record, index: number) => {
          const field = fields[index];
          return (
            <FormItem {...field} className="mb-0" name={[field.name, 'skcImageUrls']}>
              <Upload listType="picture-card" maxCount={6} tip={false} />
            </FormItem>
          );
        },
      },
      {
        title: (
          <>
            <span className={ss.required}>*</span> 尺码
          </>
        ),
        width: 140,
        render: (_, record, index: number) => {
          const field = fields[index];
          const options = sampleInfo.sizeComb.map((size) => ({ label: size, value: size }));
          return (
            <FormItem
              {...field}
              className="mb-0"
              name={[field.name, 'skcSize']}
              rules={[{ required: true, message: '请选择' }]}
            >
              <Select allowClear options={options} />
            </FormItem>
          );
        },
      },
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
    <Form form={form} labelCol={{ style: { width: 100 } }}>
      <Descriptions labelStyle={{ width: 100, justifyContent: 'flex-end' }}>
        <Descriptions.Item label="款式来源" span={3}>
          {selectDictMap.typeSampleSource?.[sampleInfo.source] ?? '-'}
        </Descriptions.Item>
        <Descriptions.Item label="样衣编号">{sampleInfo.sampleClothesCode ?? '-'}</Descriptions.Item>
        <Descriptions.Item label="样衣名称">{sampleInfo.title}</Descriptions.Item>
        <Descriptions.Item label="品牌">{sampleInfo.brandName ?? '-'}</Descriptions.Item>
        <Descriptions.Item label="年份">{sampleInfo.yearStr ?? '-'}</Descriptions.Item>
        <Descriptions.Item label="季节">{selectDictMap.typeSeason?.[sampleInfo.seasonStr] ?? '-'}</Descriptions.Item>
        <Descriptions.Item label="波段">{sampleInfo.stage ?? '-'}</Descriptions.Item>
        <Descriptions.Item label="适合人群">
          {selectDictMap.typeSampleSource?.[sampleInfo.forPeople] ?? '-'}
        </Descriptions.Item>
        <Descriptions.Item label="品类">服装鞋包 / 女装/女士精品 / POLO衫</Descriptions.Item>
        <Descriptions.Item label="设计师">{sampleInfo.designerName ?? '-'}</Descriptions.Item>
        <Descriptions.Item label="供应商">供应商</Descriptions.Item>
        {/* <Descriptions.Item label="部门" span={2}>
          -
        </Descriptions.Item> */}
        <Descriptions.Item label="在售链接" span={3}>
          {sampleInfo.saleUrl ?? '-'}
        </Descriptions.Item>
      </Descriptions>
      <div className="divider"></div>
      <Row gutter={12}>
        <Col span={24}>
          <FormItem label="是否加急" name="urgentType" valuePropName="checked">
            <Checkbox>加急</Checkbox>
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem
            label="打样方式"
            name="sampleClothesRequirementType"
            rules={[{ required: true, message: '请选择打样方式' }]}
          >
            <Select
              placeholder="请选择"
              options={[
                {
                  value: 1,
                  label: '外发打样',
                },
                {
                  value: 2,
                  label: '自主打样',
                },
              ]}
            />
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label="物料情况" name="bomOfferType">
            <Select
              placeholder="请选择"
              options={[
                {
                  value: 1,
                  label: '供应商提供',
                },
                {
                  value: 2,
                  label: '需采购开发物料',
                },
              ]}
            />
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label="面料需求时间" name="liningRequirementTime">
            <DatePicker className="w-full" placeholder="请选择" />
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label="物料需求时间" name="bomRequirementTime">
            <DatePicker className="w-full" placeholder="请选择" />
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem
            label="样衣需求时间"
            name="sampleClothesRequirementTime"
            rules={[{ required: true, message: '请选择样衣需求时间' }]}
          >
            <DatePicker className="w-full" placeholder="请选择" />
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label="面料完成时间" name="liningFinishTime">
            <DatePicker className="w-full" placeholder="请选择" />
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label="辅料完成时间" name="rimFinishTime">
            <DatePicker className="w-full" placeholder="请选择" />
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label="样衣评审时间" name="sampleClothesAuditTime">
            <DatePicker className="w-full" placeholder="请选择" />
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label="样衣完成时间" name="sampleClothesFinishTime">
            <DatePicker className="w-full" placeholder="请选择" />
          </FormItem>
        </Col>
      </Row>
      <div className="divider"></div>
      <Row gutter={12}>
        <Col span={8}>
          <FormItem label="版师" name="sampleDesignerId">
            <PlateDivisionSelect placeholder="请选择" />
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label="样板类型" name="modelType">
            <Select placeholder="请选择" options={selectDict.typeModel} />
          </FormItem>
        </Col>
        <Col span={24}>
          <FormItem label="重打原因" name="returnReason">
            <Input.TextArea rows={3} showCount maxLength={500} placeholder="请输入" />
          </FormItem>
        </Col>
        <Col span={24}>
          <FormItem label="款式要求" name="styleRequest">
            <Input.TextArea rows={3} showCount maxLength={500} placeholder="请输入" />
          </FormItem>
        </Col>
        <Col span={24}>
          <FormItem label="物料要求" name="sampleRequest">
            <Input.TextArea rows={3} showCount maxLength={500} placeholder="请输入" />
          </FormItem>
        </Col>
        <Col span={24}>
          <FormItem label="制板要求" name="modelRequest">
            <Input.TextArea rows={3} showCount maxLength={500} placeholder="请输入" />
          </FormItem>
        </Col>
        <Col span={24}>
          <FormItem label="工艺要求" name="techniqueRequest">
            <Input.TextArea rows={3} showCount maxLength={500} placeholder="请输入" />
          </FormItem>
        </Col>
        <Col span={24}>
          <FormItem label="备注" name="remark">
            <Input.TextArea rows={3} showCount maxLength={500} placeholder="请输入" />
          </FormItem>
        </Col>

        <Col span={24}>
          <FormList
            name="skcList"
            rules={[
              {
                validator(_, value, callback) {
                  if (!value || value.length === 0) {
                    callback('请添加SKC');
                    return;
                  }
                  callback();
                },
              },
            ]}
          >
            {(fields, { add, remove }, { errors }) => (
              <FormItem label="SKC" shouldUpdate required>
                <Table
                  key={fields.length}
                  rowKey="name"
                  editable
                  className={ss.editTable}
                  columns={getColumns({ fields, remove })}
                  dataSource={fields}
                  scroll={{ x: 989 }}
                  footer={() => (
                    <Button
                      block
                      type="dashed"
                      icon={<PlusOutlined />}
                      onClick={() => {
                        add({
                          uuid: uuid(),
                          skcColorName: undefined,
                          skcMainColor: undefined,
                          skcImageUrls: [],
                          skcSize: undefined,
                        });
                      }}
                    >
                      新增一行
                    </Button>
                  )}
                />

                <Form.ErrorList errors={errors} />
              </FormItem>
            )}
          </FormList>
        </Col>
      </Row>
      {/*<div className={ss.footer}>*/}
      {/*  <Button type="primary" onClick={handleSave}>*/}
      {/*    保存*/}
      {/*  </Button>*/}
      {/*</div>*/}
    </Form>
  );
};

export default BasicInfo;
