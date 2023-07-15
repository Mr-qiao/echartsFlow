import React, { useEffect, useMemo, useRef, useState } from 'react';

import { PlusOutlined } from '@ant-design/icons';
import type { InputRef, FormRule } from 'antd';
import { Button, Divider, Input, Select, SelectProps, Space } from 'antd';
import { RuleType } from '../types';

interface IProps {
  dropdownRenderVisible?: boolean;
  [key: string]: any;
}

export const rules = (rules: RuleType): FormRule[] => {
  return [{ required: true }];
};

const Index: React.FC = ({ ...props }: IProps) => {
  const [values, setValues] = useState<any[]>([]);
  const [name, setName] = useState<string>('');
  const inputRef = useRef<InputRef>(null);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  useEffect(() => {
    if (props?.itemCatePropertyValueEnumS) {
      setValues(props?.itemCatePropertyValueEnumS);
    }
  }, []);

  const addItem = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setValues([{ label: name, value: name }, ...values]);
    setName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <Select
      style={{ width: 280 }}
      allowClear
      showSearch
      dropdownMatchSelectWidth
      onChange={(e: string) => props?.onChange(e)}
      dropdownRender={(menu) => (
        <>
          {menu}
          {!props?.dropdownRenderVisible && (
            <>
              <Divider style={{ margin: '8px 0' }} />
              <Space style={{ padding: '0 8px 4px' }}>
                <Input placeholder="请输入" ref={inputRef} value={name} onChange={onChange} />
                <Button
                  type={name ? 'primary' : 'default'}
                  disabled={!!!name}
                  icon={<PlusOutlined />}
                  onClick={addItem}
                >
                  添加
                </Button>
              </Space>
            </>
          )}
        </>
      )}
      options={values || []}
      {...props}
    />
  );
};

export default Index;
