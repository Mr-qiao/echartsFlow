import { useModel, useNavigate, useParams, useSearchParams } from '@umijs/max';
import { InputNumberRange } from '@xlion/component';
import { Button, Cascader, Col, DatePicker, Form, Input, InputNumber, message, Row, Select, Typography } from 'antd';
import { groupBy } from 'lodash-es';
import moment from 'moment';
import React, { createContext, useEffect, useRef, useState } from 'react';

import PicturesWall from '@/components/PicturesWall';

import BrandSelectCpt from './components/BrandSelectCpt';
import Api from '../services';
import { SampleListModal } from './components/Modal';
import SkuCpt from './components/SkuCpt';
import { AttrTypes } from './constant';
import styles from './index.less';

export const CptContext = createContext<any>(null);

const Index: React.FC = () => {
  const [searchParams] = useSearchParams();
  const sampleId = searchParams.get('sampleId');

  const { id } = useParams();
  const { category } = useModel('category');
  // const [detail, setDetail] = useState<any>({});
  const [refSampleClothesId, setSampleId] = useState<any>();
  // const [brandList, setBrandList] = useState<any[]>();

  const [dynProps, setDynProps] = useState<any[]>([]);
  const [attrEnum, setAttrEnum] = useState<any[]>([]); // sku 属性枚举
  const [saleProperties, setSaleProperties] = useState<any[]>([]); // sku 属性枚举

  const [form] = Form.useForm();

  const sampleListRef = useRef<any>();
  const navigate = useNavigate();

  const handleChangeCate = (value) => {
    let cateId = value[value.length - 1];
    Api.Goods.Detail({ categoryId: cateId, type: 3 }).then(({ entry }) => {
      setDynProps(
        groupBy(
          entry?.baseProperties.sort((a, b) => a.order - b.order),
          (item) => {
            return item.bizGroupName;
          },
        ),
      );

      setSaleProperties(entry?.saleProperties);
      setAttrEnum(entry?.salePropertiesEnum);

      form.setFieldValue('saleProperties', []);
      form.setFieldValue('skus', []);
    });
  };
  const handleLinkSample = () => {
    sampleListRef.current?.show();
  };
  const handleNoLinkSample = () => {
    form.setFieldValue('source', 1);
    form.setFieldValue('refSampleClothesId', '');
    setSampleId('');
  };
  useEffect(() => {
    let _: { itemId?: string | number; type: number; categoryId?: string | number } = { type: 3 };
    if (id) {
      _ = { itemId: id, type: 3 };
    }
    Promise.all([Api.Goods.Detail(_)]).then(([{ entry: info }]) => {
      // setBrandList(brand);
      // info.categoryId = info?.categoryIds;
      //动态属性
      setDynProps(
        groupBy(
          info?.baseProperties.sort((a, b) => a.order - b.order),
          (item) => {
            return item.bizGroupName;
          },
        ),
      );
      //sku枚举
      setAttrEnum(info?.salePropertiesEnum);
      //sku值
      setSaleProperties(info?.saleProperties);

      // info.dynProps = [info.baseProperties];
      let _ = { ...info.item, ...info };
      if (sampleId) {
        _.source = 2;
        _.refSampleClothesId = sampleId;
        setSampleId(sampleId);
      }
      //删除type，新建都是 款式
      delete _?.type;

      // setDetail(_);
      form.setFieldsValue({
        ..._,
        categoryId: _?.categoryIds,

        baseProperties: info.baseProperties?.reduce((acc: Recordable<any>, cur) => {
          let value: any;
          if (Array.isArray(cur.categoryPropertyValues)) {
            switch (cur.type) {
              case AttrTypes.TEXT:
              case AttrTypes.NUMBER:
              case AttrTypes.SELECT:
              case AttrTypes.TEXTAREA:
                value = cur.categoryPropertyValues[0];
                break;
              case AttrTypes.DATE:
                value = moment(cur.categoryPropertyValues[0]);
                break;
              case AttrTypes.DATE_RANGE:
                value = value.map((item: string) => moment(item));
                break;
              default:
                value = cur.categoryPropertyValues;
            }
          }
          acc[cur.categoryPropertyCode] = value;
          return acc;
        }, {}),
      });
    });
  }, []);

  //提交
  async function onFinish(values) {
    let _: any = { ...values };
    _.images = normFile(_.images);
    _.categoryId = (_.categoryId as []) ? _.categoryId[_.categoryId.length - 1] : '';
    Api.Goods.Add(_).then(({}) => {
      message.success('添加成功', 0.5, () => {
        navigate(-1);
      });
    });
  }

  function normFile(e) {
    if (Array.isArray(e)) {
      return e?.map((item) => (typeof item === 'object' ? item.url : item));
    }
    return [e];
  }

  return (
    <div className={styles.goodsCreate}>
      <Button
        onClick={() => {
          history.back();
        }}
        style={{ color: '#666' }}
        className="u-mr10 u-mb20"
      >
        返回
      </Button>
      <Form labelCol={{ span: 6 }} wrapperCol={{ span: 14 }} form={form} onFinish={onFinish}>
        {/* 样衣 or 款式 */}
        <Form.Item label="类型" name="type" hidden={true} initialValue={3}>
          <Input />
        </Form.Item>
        <Form.Item label="关联样衣 " name="refSampleClothesId" hidden={true}>
          <Input />
        </Form.Item>
        {/* 1pc  2小程序*/}
        <Form.Item label="商品类型" name="client" hidden={true} initialValue={1}>
          <Input />
        </Form.Item>
        {/* 1未关联  2关联*/}
        <Form.Item label="关联样衣" name="source" hidden={true} initialValue={1}>
          <Input />
        </Form.Item>
        <h2>基本信息</h2>
        <Row className={styles.plr20}>
          <Col span={12}>
            <Form.Item label="款式名称" name="title" rules={[{ required: true }]}>
              <Input placeholder="请输入" maxLength={50} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="商家款式编码" name="supplierStyleCode">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="69码" name="snCode" rules={[{ message: '仅支持数字', pattern: /^[\d]+$/ }]}>
              <Input placeholder="请输入" maxLength={20} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="渠道商品编码" name="outsideItemCode">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="类目" name="categoryId" rules={[{ required: true, message: '请选择类目～' }]}>
              <Cascader
                options={category}
                placeholder="请选择上架类目"
                onChange={handleChangeCate}
                fieldNames={{
                  children: 'children',
                  label: 'name',
                  value: 'categoryId',
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12} pull={2}>
            <Typography.Link style={{ marginLeft: '20px' }} onClick={handleLinkSample}>
              关联样衣
            </Typography.Link>

            {refSampleClothesId && (
              <>
                <Typography.Link style={{ marginLeft: '10px' }} onClick={handleNoLinkSample}>
                  取消关联
                </Typography.Link>
                <span className="u-ml10">已关联(样衣Id：{refSampleClothesId})</span>
              </>
            )}
          </Col>

          <Col span={12}>
            <Form.Item label="品牌" name="brandId" rules={[{ required: true, message: '请选择品牌～' }]}>
              <BrandSelectCpt />
            </Form.Item>
          </Col>
          {renderDynProps(true)}

          <Col span={24}>
            <Form.Item label="商品图片" required labelCol={{ span: 3 }} wrapperCol={{ span: 20 }}>
              <p style={{ fontSize: 12, color: '#999', marginTop: '5px', marginBottom: 5 }}>
                支持jpg jpeg .png格式，小于10Mb图片不清晰将会被降低选中概率，故要求图片尺寸在 600*600以上
              </p>
              <Form.Item noStyle name="images" rules={[{ required: true, message: '请选择主图～' }]}>
                <PicturesWall maxCount={3} />
              </Form.Item>
            </Form.Item>
          </Col>
        </Row>
        {renderDynProps()}
        {/* {dynProps && dynProps.length > 0 && (
          <>
            <h2>类目属性</h2>

            <Row>
              {dynProps?.map((item) => (
                <Col key={item.categoryPropertyName} span={12}>
                  <RenderItem propsValue={item} />
                </Col>
              ))}
            </Row>
          </>
        )} */}

        <h2>sku信息</h2>
        <CptContext.Provider value={{ saleProperties: saleProperties || [], attrEnum: attrEnum }}>
          <SkuCpt
            form={form}
            // info={{ saleProperties: saleProperties || [], attrEnum: attrEnum }}
            // saleProperties={saleProperties || []}
            // attrEnum={attrEnum}
          />
        </CptContext.Provider>
        <Button type="primary" danger htmlType="submit" style={{ marginLeft: '12.5%', marginTop: 20 }}>
          确认提交
        </Button>
      </Form>
      <SampleListModal
        ref={sampleListRef}
        onChange={(value) => {
          form.setFieldValue('source', 2);
          form.setFieldValue('refSampleClothesId', value.toString());
          setSampleId(value.toString());
        }}
      />
    </div>
  );
  function renderAttrItem(attr: {
    type: number;
    required: 0 | 1;
    categoryPropertyCode: string;
    categoryPropertyName: string;
    unit: string;
    propertySelectValues: any[];
  }) {
    const propertySelectValues = Array.isArray(attr?.propertySelectValues) ? attr?.propertySelectValues : [];
    const props = {
      label: attr.categoryPropertyName,
      rules: [{ required: attr.required === 1 ? true : false }],
      name: ['baseProperties', `${attr.categoryPropertyCode}`],
      preserve: false,
    };
    let options = propertySelectValues.map(({ valueId, value }) => ({
      label: value,
      value: `${valueId}`,
    }));
    switch (attr.type) {
      case AttrTypes.TEXT:
        return (
          <Form.Item {...props}>
            <Input placeholder="请输入" />
          </Form.Item>
        );
      case AttrTypes.NUMBER:
        return (
          <Form.Item {...props}>
            <InputNumber className="w-full" placeholder="请输入" addonAfter={attr.unit} />
          </Form.Item>
        );
      case AttrTypes.SELECT:
        return (
          <Form.Item {...props}>
            <Select options={options} placeholder="请选择" />
          </Form.Item>
        );
      case AttrTypes.MULTIPLE_SELECT:
        return (
          <Form.Item {...props}>
            <Select mode="tags" options={options} placeholder="请选择" />
          </Form.Item>
        );
      case AttrTypes.NUMBER_RANGE:
        return (
          <Form.Item {...props}>
            <InputNumberRange addonAfter={attr.unit} />
          </Form.Item>
        );
      case AttrTypes.DATE:
        return (
          <Form.Item {...props}>
            <DatePicker placeholder="请选择" />
          </Form.Item>
        );
      case AttrTypes.DATE_RANGE:
        return (
          <Form.Item {...props}>
            <DatePicker.RangePicker />
          </Form.Item>
        );
      case AttrTypes.TEXTAREA:
        return (
          <Form.Item {...props}>
            <Input.TextArea placeholder="请输入" />
          </Form.Item>
        );
      case AttrTypes.LINK:
        return (
          <Form.Item
            {...props}
            rules={[
              {
                message: '请输入正确的链接',
                pattern: /(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/gi,
              },
            ]}
          >
            <Input placeholder="请输入" />
          </Form.Item>
        );
      default:
        return null;
    }
  }

  function renderDynProps(isBaseProps = false) {
    if (isBaseProps && dynProps['基本信息']) {
      return dynProps['基本信息'].map((item: any) => (
        <Col key={item.categoryPropertyName} span={12}>
          {renderAttrItem(item)}
        </Col>
      ));
    }
    const attrGroupKeys = Object.keys(dynProps).filter((key) => key !== '基本信息');
    if (attrGroupKeys.length === 0) return null;

    return attrGroupKeys.map((key) => {
      if (isBaseProps) {
        return dynProps[key].map((item: any) => (
          <Col key={item.categoryPropertyName} span={12}>
            {renderAttrItem(item)}
          </Col>
        ));
      }
      return (
        <>
          <h2>{key}</h2>
          <Row>
            {dynProps[key].map((item: any) => (
              <Col key={item.categoryPropertyName} span={12}>
                {renderAttrItem(item)}
              </Col>
            ))}
          </Row>
        </>
      );
    });
  }
};
export default Index;
