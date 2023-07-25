import React, { useRef, useState, useEffect } from 'react';

import { PlusOutlined } from '@ant-design/icons';
import type { FormRule, InputRef } from '@xlion/component';
import { Button, Divider, Input, Space, TreeSelect } from '@xlion/component';
import { RuleType, IPropsType } from '../types';

export const rules = (rules: RuleType, label: string): FormRule[] => {
  return [{ required: rules.required === 1, message: `请选择${label}` }];
};

const Index: React.FC<IPropsType> = ({ ...props }: IPropsType) => {
  const { value } = props
  const [categoryValues, setCategoryValues] = useState<any[]>([]);
  const [name, setName] = useState<string>('');
  const inputRef = useRef<InputRef>(null);



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
      disabled={props.read === 1}
      placeholder={props?.desc || `请选择${props?.categoryPropertyName}`}
      onChange={(newValue: string) => props?.onChange(newValue)}
      fieldNames={{
        label: 'label',
        value: 'value',
        children: 'children',
      }}
      style={{ width: '100%' }}
      treeData={categoryValues}
      filterTreeNode={(inputValue: any, treeNode: any) => treeNode.label.includes(inputValue)}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      dropdownRender={(menu) => (
        <>
          {menu}
          {props?.custom === 1 && (
            <>
              <Divider style={{ margin: '8px 0' }} />
              <div style={{ padding: '0 8px 4px', gap: '8px' }} className='u-f__between'>
                <Input placeholder="请输入" style={{ width: '100%' }} ref={inputRef} value={name} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setName(event.target.value);
                }} />
                <Button
                  type={name ? 'primary' : 'default'}
                  disabled={!!!name}
                  icon={<PlusOutlined />}
                  onClick={addItem}
                >
                  添加
                </Button>
              </div>
            </>
          )}
        </>
      )}
      // {...rest}
      value={value}
    ></TreeSelect>
  );
};

export default Index;
