import React from 'react';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, FormListFieldData, Input, Space, Typography } from 'antd';

import { IS_DISABLED } from '../../constants';
import { IPropsType } from '../../types';

interface IProps {
  field: FormListFieldData;
  rowData: IPropsType;
  [x: string]: any;
}

const SpecsInput: React.FC<IProps> = ({ field, rowData }) => {
  return (
    <Form.List name={[field.name, 'categoryPropertyValues']}>
      {(attrValues, { add: addValue, remove: removeValue }) => {
        return (
          <>
            <Space wrap>
              {attrValues.map((attrField, attrIndex) => (
                <Space key={attrIndex}>
                  <Form.Item noStyle name={[attrField.name]}>
                    <Input maxLength={10} placeholder="请输入" style={{ width: 100 }} />
                  </Form.Item>
                  <Typography.Link
                    disabled={attrValues.length === 1}
                    onClick={() => removeValue(attrIndex)}
                  >
                    <DeleteOutlined />
                  </Typography.Link>
                </Space>
              ))}
              {rowData.custom === IS_DISABLED.IS && (
                <Button
                  type="link"
                  style={{ padding: '3px' }}
                  icon={<PlusOutlined />}
                  onClick={() => addValue('')}
                >
                  添加规格分类
                </Button>
              )}
            </Space>
          </>
        );
      }}
    </Form.List>
  );
};

export default SpecsInput;
