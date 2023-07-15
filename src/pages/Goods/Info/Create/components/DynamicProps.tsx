import { Form } from 'antd';
import React, { Suspense } from 'react';

import { IPropsType } from '../types';

import renderProps from './Props';

type IProps = IPropsType;

const DynamicProps: React.FC<IProps> = ({ ...props }) => {
  const renderFormItem = () => {
    const { Component, rules } = renderProps(props.propertyType);
    const _FormItemProps = {
      label: props.categoryPropertyName,
      rules: rules({ ...props.categoryPropertyRule, required: props.required }),
      name: ['baseProperties', `${props.categoryPropertyCode}`],
      preserve: false,
    };
    return (
      <Suspense fallback={<>loading</>}>
        <Form.Item {..._FormItemProps}>
          <Component {...props}></Component>
        </Form.Item>
      </Suspense>
    );
  };

  return renderFormItem();
};

export default DynamicProps;
