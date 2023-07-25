import React, { useEffect, useRef, useState } from 'react';

import { PlusOutlined } from '@ant-design/icons';
import type { InputRef, FormRule } from '@xlion/component';
import { Button, Divider, Input, Select, Space } from '@xlion/component';
import { RuleType, IPropsType } from '../types';

export const rules = (rules: RuleType, label: string): FormRule[] => {
  return [{ required: rules.required === 1, message: `请选择${label}` }];
};
const Index: React.FC<IPropsType> = ({ ...props }: IPropsType) => {
  const { value } = props;
  const [values, setValues] = useState<any[]>([]);
  const [name, setName] = useState<string>('');
  const inputRef = useRef<InputRef>(null);


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
      style={{ width: '100%' }}
      allowClear
      showSearch
      disabled={props.read === 1}
      placeholder={props?.desc || `请选择${props?.categoryPropertyName}`}
      dropdownMatchSelectWidth
      onChange={(e: string) => props?.onChange(e)}
      dropdownRender={(menu) => (
        <>
          {menu}
          {props?.custom === 1 && (
            <>
              <Divider style={{ margin: '8px 0' }} />
              <div style={{ padding: '0 8px 4px', gap: '8px' }} className='u-f__between'>
                <Input placeholder="请输入" ref={inputRef} value={name} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
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
      options={values || []}
      // {...rest}
      value={value}
    />
  );
};

export default Index;
