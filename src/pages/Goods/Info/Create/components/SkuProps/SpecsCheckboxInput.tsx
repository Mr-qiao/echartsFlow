import React, { useContext } from 'react';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Col,
  Form,
  FormListFieldData,
  Input,
  Row,
  Space,
  Typography,
} from 'antd';

import { IS_DISABLED } from '../../constants';
import { CptContext } from '../../index';
import { IPropsType } from '../../types';

interface IProps {
  rowData: IPropsType;
  field: FormListFieldData;

  value?: OptionsType[];
  [x: string]: any;
}
type OptionsType = { label: string; value: string | number; custom: boolean; checked: boolean };

const SpecsCheckboxInput: React.FC<IProps> = ({ field, rowData }) => {
  const { form } = useContext(CptContext);

  //添加
  // const handleAdd = () => {
  //   triggerChange([...value, { checked: false, custom: true }]);
  // };
  // //删除
  // const handleDel = (idx) => {
  //   value?.splice(idx, 1);
  //   console.log(value);
  //   triggerChange([...value]);
  // };

  // useEffect(() => {
  //   console.log('itemCatePropertyValueEnumS', itemCatePropertyValueEnumS);
  //   triggerChange([...itemCatePropertyValueEnumS]);
  //   // setExtendData([...itemCatePropertyValueEnumS] as any);
  //   // setExtendDataDict(
  //   //   [...itemCatePropertyValueEnumS]?.reduce((acc: any, cur: any) => {
  //   //     acc[cur.value] = { ...cur };
  //   //     return acc;
  //   //   }, {}),
  //   // );
  // }, []);

  // const { run: handleSearch } = useDebounceFn(
  //   (e, item, idx) => {
  //     value[idx] = { ...item, value: e.target.value };
  //     triggerChange(value);
  //   },
  //   {
  //     wait: 500,
  //     leading: true,
  //     trailing: true,
  //   },
  // );

  // console.log('value----', value, field);

  return (
    <Form.List name={[field.name, 'categoryPropertyValues']}>
      {(attrValues, { add: addValue, remove: removeValue }) => {
        return (
          <Row gutter={[10, 10]}>
            {attrValues?.map((attrField, attrIndex) => {
              const { categoryPropertyValues: data } = form.getFieldValue([
                'saleProperties',
                field.name,
              ]);
              const row: OptionsType = data[attrIndex];
              return (
                <Col span={5} key={attrIndex}>
                  {!row?.custom ? (
                    <Form.Item noStyle name={[attrField.name, 'checked']} valuePropName="checked">
                      <Checkbox style={{ marginRight: 10 }}>{row?.value}</Checkbox>
                    </Form.Item>
                  ) : (
                    rowData.custom === IS_DISABLED.IS && (
                      <Space style={{ marginRight: 10 }}>
                        <Form.Item
                          noStyle
                          name={[attrField.name, 'checked']}
                          valuePropName="checked"
                        >
                          <Checkbox />
                        </Form.Item>
                        <Form.Item noStyle name={[attrField.name, 'value']}>
                          <Input maxLength={10} placeholder="请输入" style={{ width: 100 }} />
                        </Form.Item>
                        <Typography.Link
                          disabled={attrValues.length === 1}
                          onClick={() => removeValue(attrIndex)}
                        >
                          <DeleteOutlined />
                        </Typography.Link>
                      </Space>
                    )
                  )}
                </Col>
              );
            })}
            {rowData.custom === IS_DISABLED.IS && attrValues?.length < 10 && (
              <Col>
                <Button
                  type="link"
                  style={{ padding: '3px' }}
                  icon={<PlusOutlined />}
                  onClick={() => {
                    addValue({ checked: false, custom: true });
                  }}
                >
                  添加规格分类
                </Button>
              </Col>
            )}
          </Row>
        );
      }}
    </Form.List>
  );
};

export default SpecsCheckboxInput;
