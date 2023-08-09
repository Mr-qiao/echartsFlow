import { history, useParams, useSearchParams, useLocation } from '@umijs/max';
import { safeJSONParse, math } from '@xlion/utils';
import {
  Button,
  Cascader,
  Col,
  Form,
  FormInstance,
  Input,
  InputNumber,
  message,
  Row,
  Spin,
  UploadFile,
} from 'antd';
import { pick } from 'lodash-es';
import React, { createContext, useEffect, useState, useMemo } from 'react';

import Upload from '@/components/Upload';
import { useCategory } from '@/hooks';
import { sleep, uuid } from '@/utils';
import { supplierViewByIdV2Detail, supplierSaveItem } from '@/services/goods/supplier';
import BrandSelectCpt from './components/BrandSelectCpt';
import SkuProps from './components/SkuProps'
import SkuTablesProps from './components/SkuTablesProps'
import { ATTR_TYPE } from './constants';
import { useCategoryProps } from './hooks';
import styles from './index.less';
import { IPropsType } from './types';


let imgUploadSize = 5;

export enum ModalType {
  EDIT,
  ADD,
  SAMPLE_STYLE_ADD,
  PLATFORM_ADD,
}

export const CptContext = createContext<{
  form: FormInstance;
  skuOptions: Array<{ label: string; value: string | number }>;
  skuOptionsDict: Recordable<IPropsType>;
  skuProps: Array<{ label: string; value: string | number }>;
  skuPropsDict: Recordable<IPropsType>;
}>({} as any);

const Index: React.FC = () => {
  const [searchParams] = useSearchParams();
  // 样衣id
  const sampleId = searchParams.get('sampleId');

  //供应商商品绑定 id
  const scmItemId = searchParams.get('scmItemId');

  // 款式id
  const { id } = useParams();
  // 类目
  const [category] = useCategory();
  const [pending, setPending] = useState(false);

  const [
    { groupDict, propsDict, skuOptions, skuOptionsDict, skuProps, skuPropsDict, loading },
    onReloadProps,
  ] = useCategoryProps();


  const [form] = Form.useForm();


  const location = useLocation();

  const type: ModalType = useMemo(() => {
    if (location.pathname.includes('edit')) {
      return ModalType.EDIT;
    } else if (location.pathname.includes('create')) {
      //来源-样衣
      if (sampleId) {
        return ModalType.SAMPLE_STYLE_ADD;
        //来源-供应链
      } else if (scmItemId) {
        return ModalType.PLATFORM_ADD;
      } else {
        return ModalType.ADD;
      }
    } else return ModalType.ADD;
  }, [location]);

  const handleChangeCate = (value?: any[]) => {
    const cateId = value ? [...value].pop() : undefined;
    onReloadProps(cateId);
    form.resetFields(['skusOrigin', 'sku', 'saleProperties']);
  };

  useEffect(() => {
    //处理sku
    if (Object.keys(skuOptionsDict).length > 0 && type === ModalType.EDIT) {
      const saleProperties = form.getFieldValue('saleProperties');
      const newArr = saleProperties?.map((item) => {
        const { categoryPropertyType, categoryPropertyValues } = item;
        const { label } = categoryPropertyType || {};
        //过滤 空数据与空枚举
        if (!label) return item;
        const { itemCatePropertyValueEnumS = [] } = skuOptionsDict[label] || {};
        //过滤 空数据与空枚举
        if (
          !categoryPropertyValues ||
          !(itemCatePropertyValueEnumS && itemCatePropertyValueEnumS.toString())
        ) {
          return item;
        }
        const values = categoryPropertyValues?.reduce((acc: any, cur: any) => {
          const key = typeof cur === 'object' ? cur.value : cur;
          acc[key] = typeof cur === 'object' ? { ...cur } : cur;
          return acc;
        }, {});
        let keys: string[] = [];
        //二次装填数据，处理 有枚举值，合并 values
        const itemEnums = itemCatePropertyValueEnumS?.map((item) => {
          const { value } = item;
          keys.push(value);
          return { ...item, ...(values[value] && { checked: true }) };
        });
        //过滤 不再枚举【itemCatePropertyValueEnumS】内部的 value值，重新处理
        const customVal: { value: string; checked: boolean; custom: boolean }[] = Object.keys(
          values,
        )
          ?.filter((o) => !keys.includes(o))
          ?.map((o) =>
            //如果 values 为字符串 添加value 与chekced
            typeof values[o] === 'string' ? { value: values[o], checked: true } : values[o],
          );
        return { ...item, categoryPropertyValues: [...itemEnums, ...customVal] };
      });
      form.setFieldValue('saleProperties', newArr);

      console.log('skuOptionsDict skuOptionsDict', skuOptionsDict, saleProperties);
    }
  }, [skuOptionsDict]);

  //详情处理 动态属性 value
  function getPropsValue(_: string | null, type) {
    const value = _;
    if (value && type) {
      return {
        [ATTR_TYPE.TEXT]: value,
        [ATTR_TYPE.TEXTAREA]: value,
        [ATTR_TYPE.NUMBER_PRICE]: typeof value === 'string' ? Number(value) : undefined,
        [ATTR_TYPE.NUMBER_RATE]: typeof value === 'string' ? math.div(value, 100) : undefined,
        [ATTR_TYPE.RADIO]: value
          .split(',')
          ?.filter(Boolean)
          ?.map((item) => ({ label: item, value: item })),
        [ATTR_TYPE.CHECKBOX]: value
          .split(',')
          ?.filter(Boolean)
          ?.map((item) => ({ label: item, value: item })),
        [ATTR_TYPE.NUMBER]: typeof value === 'string' ? Number(value) : undefined,
        [ATTR_TYPE.NUMBER_RANGE]: value.split(',')?.filter(Boolean),
        [ATTR_TYPE.DATE]: value,
        [ATTR_TYPE.DATE_RANGE]: value.split(',')?.filter(Boolean),
        [ATTR_TYPE.IMAGE]: value.split(',')?.filter(Boolean),
        [ATTR_TYPE.IMAGE_MULTIPLE]: value.split(',')?.filter(Boolean),
        [ATTR_TYPE.FILE]: value.split(',')?.filter(Boolean),
        [ATTR_TYPE.LINK]: value,
      }[type];
    } else {
      return value;
    }
  }
  //提交 转换 动态属性 value
  function changePropsValue(_: any[] | null, type) {
    const values = _;
    try {
      switch (type) {
        case ATTR_TYPE.CHECKBOX:
          return values
            ?.map((item: any) => {
              return typeof item === 'object' ? item?.value : item;
            })
            .filter(Boolean);
        case ATTR_TYPE.RADIO:
          return values
            ?.map((item: any) => {
              return typeof item === 'object' ? item?.value : item;
            })
            .filter(Boolean);
        case ATTR_TYPE.FILE:
          return values
            ?.map((item: UploadFile) => {
              return typeof item === 'object' ? item?.url : item;
            })
            .filter(Boolean);
        case ATTR_TYPE.IMAGE:
          return values
            ?.map((item: UploadFile) => {
              return typeof item === 'object' ? item?.url : item;
            })
            .filter(Boolean);
        case ATTR_TYPE.IMAGE_MULTIPLE:
          return values
            ?.map((item: UploadFile) => {
              return typeof item === 'object' ? item?.url : item;
            })
            .filter(Boolean);
        default:
          return values;
      }
    } catch (e) {
      return values;
    }
  }

  // 详情
  async function autoCompleteWithDetail() {
    try {
      let _: { itemId?: string | number; type: number; categoryId?: string | number } = {
        type: 3,
        itemId: Number(id),
      };

      const {
        entry: { item, saleProperties, itemProperties, skus, ...entry } = {
          item: {},
          saleProperties: [],
          itemProperties: [],
          skus: [],
        },
      } = await supplierViewByIdV2Detail(_);
      //动态属性

      onReloadProps(item.categoryId);
      console.log('skuOptionsDict skuOptionsDict111', skuOptionsDict);

      const _detail = {
        ...item,
        ...entry,
        brandId: { label: item?.brandName, value: item?.brandId },
        supplierId: { label: item?.supplierName, value: item?.supplierId },
        contents: item?.contents?.map((item) => item.image),
        categoryId: item?.categoryIds,

        saleProperties: saleProperties?.map((item) => ({
          uuid: uuid(),
          categoryPropertyType: {
            label: item.itemPropertyName,
            value: item.itemPropertyCode,
          },
          categoryPropertyValues: item.salePropertyValues
            ? safeJSONParse(item.salePropertyValues)
            : item?.itemPropertyValues?.split(','),
        })),
        itemProperties: itemProperties?.reduce((acc: Recordable<any>, cur: any) => {
          console.log(
            'acc[cur.itemPropertyCode]',
            cur,
            acc,
            acc[cur.itemPropertyCode],
            getPropsValue(cur.itemPropertyValues, cur.itemPropertyType),
          );
          acc[cur.itemPropertyCode] = getPropsValue(cur.itemPropertyValues, cur.itemPropertyType);
          return acc;
        }, {}),
        skusOrigin: saleProperties?.reduce((acc: any, cur: any) => {
          acc[cur.itemPropertyName] = {
            title: cur.itemPropertyName,
            value: cur.itemPropertyValues?.split(',')?.filter(Boolean),
            key: uuid(),
            rowSpan: 0,
          };
          return acc;
        }, {}),
        skus: skus?.map(({ skuPropertyInfos = [], ...sku }: any) => {
          return {
            uuid: uuid(),
            ...sku,
            ...skuPropertyInfos?.reduce((acc: any, cur: any) => {
              // if (cur.itemPropertyCode === 'color' || cur.itemPropertyCode === 'size') {
              //   acc[cur.itemPropertyCode] = cur.itemPropertyValues;
              //   return acc;
              // }
              acc[cur.itemPropertyCode] = getPropsValue(
                cur.itemPropertyValues,
                cur.itemPropertyType,
              );

              return acc;
            }, {}),
          };
        }),
      };
      console.log('_detail_detail_detail_detail', _detail);
      form.setFieldsValue(_detail);
    } catch (e) {
      console.log(e);
    }
  }

  // 自动填充样衣信息
  // async function autoCompleteWithSample(sampleId?: number) {
  //   if (!sampleId) {
  //     form.setFieldsValue({
  //       refSampleClothesId: undefined,
  //       source: 1,
  //     });
  //     setSampleId('');
  //     return;
  //   } else {
  //     form.setFieldValue('source', 2);
  //     form.setFieldValue(
  //       ['extraMap', 'refSampleClothesId'],
  //       sampleId?.toString(),
  //     );
  //     setSampleId(sampleId?.toString());
  //   }
  //   const { entry } = await sampleDetail({ itemId: Number(sampleId) });
  //   await handleChangeCate(entry.categoryIds);

  //   form.setFieldsValue({
  //     refSampleClothesId: entry.itemId,
  //     title: entry.title,
  //     supplierStyleCode: entry.supplierStyleCode,
  //     categoryId: entry.categoryIds,
  //     brandId: entry.brandId
  //       ? {
  //         label: entry.brandName,
  //         value: entry.brandId,
  //       }
  //       : undefined,
  //     images: entry.images?.slice(0, 3) || [],
  //     baseProperties: {
  //       ...pick(entry, [
  //         'saleUrl',
  //         'sellingAdvantage',
  //         'shape',
  //         'flowerBoard',
  //         // 'style',
  //         'stage',
  //         'technologyDescription',
  //         'structureDescription',
  //         'weight',
  //       ]),
  //     },
  //     saleProperties: [
  //       {
  //         uuid: uuid(),
  //         categoryPropertyType: {
  //           label: '尺码',
  //           value: 'size',
  //         },
  //         categoryPropertyValues: entry.sizeComb,
  //       },
  //       {
  //         uuid: uuid(),
  //         categoryPropertyType: {
  //           label: '颜色',
  //           value: 'color',
  //         },
  //         categoryPropertyValues: entry.colorComb,
  //       },
  //     ],
  //   });
  // }

  // 供应商商品绑定 自动填充 商品信息
  async function autoCompleteWithSupplier(scmItemId?: number) {
    if (!scmItemId) {
      form.setFieldsValue({
        refSampleClothesId: undefined,
        source: 1,
      });
      setSampleId('');
      return;
    }
    const { entry } = await supplierViewByIdV2Detail({ itemId: Number(scmItemId) });
    form.setFieldsValue({
      ...pick(entry?.item, [
        'title',
        'supplierStyleCode',
        'categoryIds',
        'snCode',
        'outsideItemCode',
      ]),
      // supplierId: entry?.item?.supplierId
      //   ? { label: entry?.item?.supplierName, value: entry?.item?.supplierId }
      //   : undefined,
      brandId: entry?.item?.brandId
        ? { label: entry?.item?.brandName, value: entry?.item?.brandId }
        : undefined,
      images: entry?.item?.images?.slice(0, imgUploadSize) || [],
      contents: entry?.item?.contents?.map((item) => item.image),
    });
  }

  //提交
  async function onFinish() {
    try {
      const values = await form.validateFields();
      setPending(true);
      if (values.saleProperties?.length > 0 && (!values.skus || values.skus?.length === 0)) {
        message.error('请生成sku~');
        return;
      }
      const data = {
        ...values,
        images:
          values.images?.map((img: { url: string }) => (typeof img === 'object' ? img.url : img)) ||
          [],
        contents:
          values.contents?.map((img: { url: string }) => ({
            image: typeof img === 'object' ? img.url : img,
          })) || [],
        brandId: typeof values.brandId === 'object' ? values.brandId.value : values.brandId,
        supplierId:
          typeof values.supplierId === 'object' ? values.supplierId.value : values.supplierId,
        categoryId: [...values.categoryId].pop(),
        //处理sku 销售属性
        saleProperties: values.saleProperties?.map((item: any) => {
          const _values = item.categoryPropertyValues
            ?.map((item) => {
              // 过滤 checkbox
              if (typeof item === 'object') {
                return item.checked && item.value ? item : false;
              } else {
                return item ? item : false;
              }
            })
            .filter(Boolean);
          return {
            itemPropertyCode: item.categoryPropertyType.value,
            itemPropertyName: item.categoryPropertyType.label,
            salePropertyValues: _values,
            itemPropertyValues: _values
              ?.map((item) => (typeof item === 'object' ? item.value : item))
              .toString(),
          };
        }),
        //处理动态属性
        itemProperties: setMap(values.itemProperties, propsDict),
        //处理sku
        skus: values.skus?.map((item: any) => {
          const { skuId, properties, ..._ } = item;
          return {
            skuId,
            properties,
            skuPropKVParamList: setMap(_, skuPropsDict),
          };
        }),
        sourceFlag: 2
      };
      if (id) {
        data.itemId = Number(id);
      }
      await supplierSaveItem(data);
      message.success(id ? '保存成功' : '添加成功');
      await sleep(1500);
      history.replace('/goods/list');
    } catch (error) {
      console.log(error);
      if (error.errorFields && error.errorFields.length > 0) {
        message.info('请检查表单必填项～');
      }
    } finally {
      setPending(false);
    }

    function setMap(dataSource: Recordable<any>, dict: Recordable<IPropsType>) {
      return Object.keys(dataSource || {}).reduce((acc: Recordable<any>, key: string) => {
        const item = dataSource[key];
        if (item !== undefined) {
          const props = dict[key];
          if (!props) {
            acc.push({ itemPropertyCode: key, itemPropertyValues: item });
          } else {
            const { propertyType } = props;
            acc.push({
              itemPropertyId: props.propertyId,
              itemPropertyCode: key,
              itemPropertyValues: propertyType
                ? changePropsValue(item, propertyType)?.toString()
                : item,
            });
          }
        }
        return acc;
      }, []);
    }
  }

  useEffect(() => {

    if (type === ModalType.EDIT) {
      // 编辑
      autoCompleteWithDetail()
    } else if (type === ModalType.SAMPLE_STYLE_ADD) {
      // 新增 来源 - 样衣
      // autoCompleteWithSample(sampleId ? Number(sampleId) : 0)
    } else if (type === ModalType.PLATFORM_ADD) {
      // 新增 来源 - 供应链
      autoCompleteWithSupplier(scmItemId ? Number(scmItemId) : 0);
    }
  }, []);

  //渲染基础属性
  function renderBaseProps() {
    return groupDict['基本信息']?.map((item, i) => {
      let {
        props: { name },
      } = item;
      // let [, categoryPropertyCode] = name;
      // if (categoryPropertyCode === 'styleSource') {
      //   let props = propsDict[categoryPropertyCode];
      //   const _props = {
      //     label: props.categoryPropertyName,
      //     rules: [{ required: props.required === 1 ? true : false }],
      //     name: ['itemProperties', `${props.categoryPropertyCode}`],
      //     preserve: false,
      //   };
      //   return (
      //     <Col span={12} key={i}>
      //       <Form.Item {..._props} wrapperCol={{ span: 5 }}>
      //         <Select options={props.itemCatePropertyValueEnumS} placeholder="请选择" allowClear />
      //       </Form.Item>
      //       <div style={{ position: 'absolute', top: 5, left: '45%' }}>
      //         <Typography.Link style={{ marginLeft: '20px' }} onClick={handleLinkSample}>
      //           关联样衣
      //         </Typography.Link>

      //         {refSampleClothesId && (
      //           <>
      //             <Typography.Link style={{ marginLeft: '10px' }} onClick={handleNoLinkSample}>
      //               取消
      //             </Typography.Link>
      //             <span className="u-ml10">已关联(样衣Id：{refSampleClothesId})</span>
      //           </>
      //         )}
      //       </div>
      //     </Col>
      //   );
      // }
      return (
        <Col span={12} key={i}>
          {item}
        </Col>
      );
    });
  }

  //渲染其他属性
  function renderOtherProps() {
    return Object.keys(groupDict)?.map((item) => {
      if (item === '基本信息') {
        return <React.Fragment key={item}></React.Fragment>;
      }
      return (
        <React.Fragment key={item}>
          <h2>{item === '未分组' ? '' : item}</h2>
          <Row>
            {groupDict[item]?.map((component, i) => {
              return (
                <Col span={12} key={`${item}-${i}`}>
                  {component}
                </Col>
              );
            })}
          </Row>
        </React.Fragment>
      );
    });
  }

  return (
    <div className={styles.goodsCreate}>
      <Spin spinning={loading}>
        <CptContext.Provider
          value={{ form, skuOptions, skuOptionsDict, skuProps, skuPropsDict }}
        >
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
                    showSearch={{
                      filter: (inputValue, path) => {
                        return path.some(
                          (option) =>
                            option.name
                              .toLowerCase()
                              .indexOf(inputValue.toLowerCase()) > -1,
                        );
                      },
                    }}
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
              {/* 基础属性 */}
              {renderBaseProps()}

              <Col span={12}>
                <Form.Item
                  label="品牌"
                  name="brandId"
                  rules={[{ required: true, message: '请选择品牌～' }]}
                >
                  <BrandSelectCpt isCreate />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="库存" name="invSkuViewParam">
                  <InputNumber placeholder="请输入" min={0} />
                </Form.Item>
              </Col>
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
                    maxCount={imgUploadSize}
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
            {/* 其他动态属性 */}
            {renderOtherProps()}

            <h2>sku信息</h2>
            {/* <SkuCpt form={form} skuAttrOptions={skuAttr} /> */}

            {/* <SkuTablesCpt form={form} /> */}
            <SkuProps />
            <SkuTablesProps />

            <Button
              type="primary"
              danger
              loading={pending}
              style={{ marginLeft: '12.5%', marginTop: 20 }}
              onClick={onFinish.bind(null, false)}
            >
              确认提交
            </Button>
          </Form>
        </CptContext.Provider>
      </Spin>
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
};
export default Index;
