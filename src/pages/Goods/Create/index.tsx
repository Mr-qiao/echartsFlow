import { history, useParams, useSearchParams } from '@umijs/max';
import { InputNumberRange } from '@xlion/component';
import { math } from '@xlion/utils';
import {
  Button,
  Cascader,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
} from 'antd';
import { groupBy, omit, pick } from 'lodash-es';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

import Upload from '@/components/Upload';
import { useCategory } from '@/hooks';
import { sleep, transformFen2Yuan, uuid } from '@/utils';
// import Api from '../services';
import { goodsAdd, goodsDetail, sampleDetail } from '@/services/goods';
import BrandSelectCpt from './components/BrandSelectCpt';
import SkuCpt from './components/SkuCpt';
import SkuTablesCpt from './components/SkuTablesCpt';
import { AttrTypes } from './constant';
import styles from './index.less';

const PriceKeys = [
  'estimateLivePrice',
  'originPrice',
  'salePrice',
  'supplyPrice',
];

const Index: React.FC = () => {
  const [searchParams] = useSearchParams();
  const sampleId = searchParams.get('sampleId');

  const { id } = useParams();
  // const { category } = useModel('category');
  const [category] = useCategory();
  // console.log(category, '-----');
  // const [detail, setDetail] = useState<any>({});
  const [refSampleClothesId, setSampleId] = useState<any>();
  // const [brandList, setBrandList] = useState<any[]>();

  const [dynProps, setDynProps] = useState<any[]>([]);
  const [skuAttr, setSkuAttr] = useState<any[]>([]); // sku 属性枚举

  // const [saleProperties, setSaleProperties] = useState<any[]>([]); // sku 属性枚举

  const [form] = Form.useForm();

  //   const sampleListRef = useRef<any>(null);

  const handleChangeCate = (value?: any[]) => {
    let cateId = value ? value[value.length - 1] : undefined;
    return goodsDetail({ categoryId: cateId, type: 3 }).then(({ entry }) => {
      setDynProps(
        groupBy(
          entry?.baseProperties.sort((a, b) => a.order - b.order),
          (item) => {
            return item.bizGroupName;
          },
        ),
      );

      // setSaleProperties(entry?.saleProperties);

      //sku枚举
      setSkuAttr(
        entry?.salePropertiesEnum.map((item: any) => ({
          label: item.categoryPropertyName,
          value: item.categoryPropertyCode,
        })),
      );

      form.setFieldValue('saleProperties', []);
      form.setFieldValue('skus', []);
    });
  };
  const handleLinkSample = () => {
    // sampleListRef.current?.show();
  };
  const handleNoLinkSample = () => {
    form.setFieldValue('source', 1);
    form.setFieldValue(['extraMap', 'refSampleClothesId'], '');
    setSampleId('');
  };

  useEffect(() => {
    let _: {
      itemId?: string | number;
      type: number;
      categoryId?: string | number;
    } = { type: 3 };
    if (id) {
      _ = { itemId: Number(id), type: 3 };

      Promise.all([goodsDetail(_)]).then(([{ entry }]) => {
        //动态属性
        setDynProps(
          groupBy(
            entry?.baseProperties.sort((a, b) => a.order - b.order),
            (item) => {
              return item.bizGroupName;
            },
          ),
        );
        //sku枚举
        setSkuAttr(
          entry?.salePropertiesEnum.map((item: any) => ({
            label: item.categoryPropertyName,
            value: item.categoryPropertyCode,
          })),
        );
        //sku值
        // setSaleProperties(entry?.saleProperties);

        form.setFieldsValue({
          ...entry?.item,
          ...entry,
          brandId: {
            label: entry?.item?.brandName,
            value: entry?.item?.brandId,
          },

          saleProperties: entry?.saleProperties.map((item) => ({
            uuid: uuid(),
            categoryPropertyType: {
              label: item.categoryPropertyName,
              value: item.categoryPropertyCode,
            },
            categoryPropertyValues: item.categoryPropertyValues,
          })),
          baseProperties: entry?.baseProperties?.reduce(
            (acc: Recordable<any>, cur: any) => {
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
                    value = cur.categoryPropertyValues.map((item: string) =>
                      moment(item),
                    );
                    break;
                  default:
                    value = cur.categoryPropertyValues;
                }
              }
              acc[cur.categoryPropertyCode] = value;
              return acc;
            },
            {},
          ),
          categoryId: entry?.item?.categoryIds,
          skus: entry?.skus?.map((sku: any) => ({
            uuid: uuid(),
            ...sku,
            images: sku.images?.map((url: string) => ({ url })),
            commissionRatio: math.div(sku.itemPrice.commissionRatio, 100),
            ...transformFen2Yuan(sku.itemPrice, PriceKeys),
          })),
        });
      });
    } else if (sampleId) {
      autoCompleteWithSample(sampleId);
    } else {
      handleChangeCate();
    }
  }, []);

  // useEffect(() => {

  // }, [sampleId]);

  // 自动填充样衣信息
  async function autoCompleteWithSample(sampleId?: number) {
    if (!sampleId) {
      form.setFieldsValue({
        refSampleClothesId: undefined,
        source: 1,
      });
      setSampleId('');
      return;
    } else {
      form.setFieldValue('source', 2);
      form.setFieldValue(
        ['extraMap', 'refSampleClothesId'],
        sampleId?.toString(),
      );
      setSampleId(sampleId?.toString());
    }
    const { entry } = await sampleDetail({ itemId: Number(sampleId) });
    await handleChangeCate(entry.categoryIds);

    form.setFieldsValue({
      refSampleClothesId: entry.itemId,
      title: entry.title,
      supplierStyleCode: entry.supplierStyleCode,
      categoryId: entry.categoryIds,
      brandId: entry.brandId
        ? {
            label: entry.brandName,
            value: entry.brandId,
          }
        : undefined,
      images: entry.images?.slice(0, 3) || [],
      baseProperties: {
        ...pick(entry, [
          'saleUrl',
          'sellingAdvantage',
          'shape',
          'flowerBoard',
          'style',
          'stage',
          'technologyDescription',
          'structureDescription',
          'weight',
        ]),
      },
      saleProperties: [
        {
          uuid: uuid(),
          categoryPropertyType: {
            label: '尺码',
            value: 'size',
          },
          categoryPropertyValues: entry.sizeComb,
        },
        {
          uuid: uuid(),
          categoryPropertyType: {
            label: '颜色',
            value: 'color',
          },
          categoryPropertyValues: entry.colorComb,
        },
      ],
    });
  }

  //提交
  async function onFinish() {
    try {
      const values = await form.validateFields();
      // setPending(true);

      const attrKeyTypeMap = Object.keys(dynProps).reduce(
        (acc: any, cur: any) => {
          dynProps[cur].forEach((item) => {
            acc[item.categoryPropertyCode] = item.type;
          });
          return acc;
        },
        {},
      );
      const data = {
        ...values,
        images:
          values.images?.map((img: { url: string }) =>
            typeof img === 'object' ? img.url : img,
          ) || [],
        contents:
          values.contents?.map((img: { url: string }) =>
            typeof img === 'object'
              ? { image: img.url, jumpUrl: '' }
              : { image: img, jumpUrl: '' },
          ) || [],
        brandId:
          typeof values.brandId === 'object'
            ? values.brandId.value
            : values.brandId,
        supplierId:
          typeof values.supplierId === 'object'
            ? values.supplierId.value
            : values.supplierId,
        categoryId: [...values.categoryId].pop(),

        saleProperties: values.saleProperties?.map((item: any) => ({
          categoryPropertyCode: item.categoryPropertyType.value,
          categoryPropertyName: item.categoryPropertyType.label,
          categoryPropertyValues: item.categoryPropertyValues,
        })),
        baseProperties: Object.keys(values.baseProperties).reduce(
          (acc: Recordable<any>, key: string) => {
            if (values.baseProperties[key] !== undefined) {
              const type = attrKeyTypeMap[key];
              switch (type) {
                case AttrTypes.DATE:
                  acc[key] = moment(values.baseProperties[key]).format(
                    'YYYY-MM-DD',
                  );
                  break;
                case AttrTypes.DATE_RANGE:
                  acc[key] = [
                    moment(values.baseProperties[key][0]).format('YYYY-MM-DD'),
                    moment(values.baseProperties[key][1]).format('YYYY-MM-DD'),
                  ];
                  break;
                default:
                  acc[key] = values.baseProperties[key];
                  break;
              }
            }
            return acc;
          },
          {},
        ),
        skus: values.skus.map((item: any) => ({
          ...omit(item, ['images', ...PriceKeys]),
          images: item.images?.map((img: { url: string }) =>
            typeof img === 'object' ? img.url : img,
          ),
          itemPrice: {
            commissionRatio: math.mul(item.commissionRatio, 100),
            ...transformFen2Yuan(item, PriceKeys, true),
          },
        })),
      };
      await goodsAdd(data);
      message.success('添加成功');
      await sleep(1500);
      history.push('/goods/list');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.goodsCreate}>
      {/* <Button
        onClick={() => {
          history.back();
        }}
        style={{ color: '#666' }}
        className="u-mr10 u-mb20"
      >
        返回
      </Button> */}
      <Form labelCol={{ span: 6 }} wrapperCol={{ span: 14 }} form={form}>
        {/* 样衣 or 款式 */}
        <Form.Item label="类型" name="type" hidden={true} initialValue={3}>
          <Input />
        </Form.Item>
        <Form.Item
          label="关联样衣 "
          name={['extraMap', 'refSampleClothesId']}
          hidden={true}
        >
          <Input />
        </Form.Item>
        {/* 1pc  2小程序*/}
        <Form.Item
          label="商品类型"
          name={['extraMap', 'client']}
          hidden={true}
          initialValue={1}
        >
          <Input />
        </Form.Item>
        {/* 1未关联  2关联*/}
        <Form.Item
          label="关联样衣"
          name="source"
          hidden={true}
          initialValue={5}
        >
          <Input />
        </Form.Item>
        <h2>基本信息</h2>
        <Row className={styles.plr20}>
          <Col span={12}>
            <Form.Item
              label="款式名称"
              name="title"
              rules={[{ required: true }]}
            >
              <Input placeholder="请输入" maxLength={50} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="商家款式编码" name="supplierStyleCode">
              <Input maxLength={50} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="69码"
              name="snCode"
              rules={[{ message: '仅支持数字', pattern: /^[\d]+$/ }]}
            >
              <Input placeholder="请输入" maxLength={20} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="渠道商品编码" name="outsideItemCode">
              <Input maxLength={50} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="类目"
              name="categoryId"
              rules={[{ required: true, message: '请选择类目～' }]}
            >
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
          {/*<Col span={12} pull={2}>*/}
          {/*  <Typography.Link style={{ marginLeft: '20px' }} onClick={handleLinkSample}>*/}
          {/*    关联样衣*/}
          {/*  </Typography.Link>*/}

          {/*  {refSampleClothesId && (*/}
          {/*    <>*/}
          {/*      <Typography.Link style={{ marginLeft: '10px' }} onClick={handleNoLinkSample}>*/}
          {/*        取消关联*/}
          {/*      </Typography.Link>*/}
          {/*      <span className="u-ml10">已关联(样衣Id：{refSampleClothesId})</span>*/}
          {/*    </>*/}
          {/*  )}*/}
          {/*</Col>*/}

          <Col span={12}>
            <Form.Item
              label="品牌"
              name="brandId"
              rules={[{ required: true, message: '请选择品牌～' }]}
            >
              <BrandSelectCpt isCreate />
            </Form.Item>
          </Col>
          {renderDynProps(true)}

          <Col span={24}>
            <Form.Item
              label="商品图片"
              name="images"
              rules={[{ required: true, message: '请选择主图～' }]}
              labelCol={{ span: 3 }}
              wrapperCol={{ span: 20 }}
            >
              <Upload
                listType="picture-card"
                maxCount={5}
                size={10}
                tip="支持jpg、jpeg、png格式，小于10Mb图片不清晰将会被降低选中概率，故要求图片尺寸在600*600以上"
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="商品详情"
              name="contents"
              labelCol={{ span: 3 }}
              wrapperCol={{ span: 20 }}
            >
              <Upload
                listType="picture-card"
                maxCount={20}
                size={10}
                tip="支持jpg、jpeg、png格式，小于10Mb图片不清晰将会被降低选中概率，故要求图片尺寸在600*600以上"
              />
            </Form.Item>
          </Col>
        </Row>
        {renderDynProps()}

        <h2>sku信息</h2>
        <SkuCpt form={form} skuAttrOptions={skuAttr} />

        <SkuTablesCpt form={form} />

        <Button
          type="primary"
          danger
          style={{ marginLeft: '12.5%', marginTop: 20 }}
          onClick={onFinish.bind(null, false)}
        >
          确认提交
        </Button>
      </Form>
      {/* <SampleListModal
        // ref={sampleListRef}
        onChange={(value) => {
          // form.setFieldValue('source', 2);
          // form.setFieldValue(['extraMap', 'refSampleClothesId'], value.toString());

          // // form.setFieldValue('refSampleClothesId', );
          // // setSampleId(value.toString());
          autoCompleteWithSample(value);
        }}
      /> */}
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
    const propertySelectValues = Array.isArray(attr?.propertySelectValues)
      ? attr?.propertySelectValues
      : [];
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
            <Input placeholder="请输入" maxLength={50} />
          </Form.Item>
        );
      case AttrTypes.NUMBER:
        return (
          <Form.Item {...props}>
            <InputNumber
              className="w-full"
              placeholder="请输入"
              addonAfter={attr.unit}
            />
          </Form.Item>
        );
      case AttrTypes.SELECT:
        return (
          <Form.Item {...props}>
            <Select allowClear options={options} placeholder="请选择" />
          </Form.Item>
        );
      case AttrTypes.MULTIPLE_SELECT:
        return (
          <Form.Item {...props}>
            <Select
              allowClear
              mode="tags"
              options={options}
              placeholder="请选择"
            />
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
            <DatePicker className="w-full" placeholder="请选择" />
          </Form.Item>
        );
      case AttrTypes.DATE_RANGE:
        return (
          <Form.Item {...props}>
            <DatePicker.RangePicker className="w-full" />
          </Form.Item>
        );
      case AttrTypes.TEXTAREA:
        return (
          <Form.Item {...props}>
            <Input.TextArea placeholder="请输入" maxLength={500} />
          </Form.Item>
        );
      case AttrTypes.LINK:
        return (
          <Form.Item
            {...props}
            rules={[
              {
                message: '请输入正确的链接',
                pattern:
                  /(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/gi,
              },
            ]}
          >
            <Input placeholder="请输入" maxLength={200} />
          </Form.Item>
        );
      case AttrTypes.IMAGE:
        return (
          <Form.Item {...props}>
            <Upload listType="picture-card" />
          </Form.Item>
        );
      case AttrTypes.MULTIPLE_IMAGE:
        return (
          <Form.Item {...props}>
            <Upload listType="picture-card" maxCount={6} />
          </Form.Item>
        );
      case AttrTypes.FILE:
        return (
          <Form.Item {...props}>
            <Upload maxCount={6} />
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
    const attrGroupKeys = Object.keys(dynProps).filter(
      (key) => key !== '基本信息',
    );
    if (attrGroupKeys.length === 0) return null;

    return attrGroupKeys.map((key, idx) => {
      if (isBaseProps) {
        return dynProps[key].map((item: any) => (
          <Col key={item.categoryPropertyName} span={12}>
            {renderAttrItem(item)}
          </Col>
        ));
      }
      return (
        <React.Fragment key={idx}>
          <h2>{key}</h2>
          <Row>
            {dynProps[key].map((item: any) => (
              <Col key={item.categoryPropertyName} span={12}>
                {renderAttrItem(item)}
              </Col>
            ))}
          </Row>
        </React.Fragment>
      );
    });
  }
};
export default Index;
