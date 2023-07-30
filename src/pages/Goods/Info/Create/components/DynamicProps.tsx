import React from 'react';
import { Form } from 'antd';

import { IPropsType } from '../types';

import renderProps from './Props';

type IProps = IPropsType;

const DynamicProps: React.FC<IProps> = ({ ...props }) => {
  const renderFormItem = () => {
    if (!props.propertyType) {
      return <></>;
    }
    const { Component, rules } = renderProps(props.propertyType);

    const _FormItemProps = {
      label: props.categoryPropertyName,
      rules: rules({ ...props.categoryPropertyRule, required: props.required }, props.categoryPropertyName),
      name: ['itemProperties', `${props.categoryPropertyCode}`],
      preserve: false,
    };
    // console.log(_FormItemProps, props.categoryPropertyName, props.categoryPropertyCode);
    return (
      <Form.Item {..._FormItemProps}>
        <Component {...props}></Component>
      </Form.Item>
    );
  };

  return renderFormItem();
};

export default DynamicProps;
