import React, { useRef, useState, useEffect } from 'react';

import { PlusOutlined } from '@ant-design/icons';
import type { FormRule, InputRef } from 'antd';
import { Button, Divider, Input, Space, TreeSelect } from 'antd';
import { useModel } from 'umi';

import { RuleType } from '../types';

interface IProps {
  dropdownRenderVisible?: boolean;
  [key: string]: any;
}

export const rules = (rules: RuleType): FormRule[] => {
  return [{ required: true }];
};

const Index: React.FC = ({ ...props }: IProps) => {
  const [categoryValues, setCategoryValues] = useState<any[]>([]);
  const [name, setName] = useState<string>('');
  const inputRef = useRef<InputRef>(null);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  useEffect(() => {
    if (props?.itemCatePropertyValueEnumS) {
      setCategoryValues(props?.itemCatePropertyValueEnumS);
    }
  }, []);

  const addItem = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    setCategoryValues([{ label: name, value: name, children: [] }, ...categoryValues]);
    setName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <TreeSelect
      treeCheckable
      multiple
      maxTagCount="responsive"
      showArrow
      allowClear
      onChange={(newValue: string) => props?.onChange(newValue)}
      fieldNames={{
        label: 'label',
        value: 'value',
        children: 'children',
      }}
      style={{ width: 280 }}
      treeData={categoryValues}
      filterTreeNode={(inputValue: any, treeNode: any) => treeNode.label.includes(inputValue)}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
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
      {...props}
    ></TreeSelect>
  );
};

export default Index;
