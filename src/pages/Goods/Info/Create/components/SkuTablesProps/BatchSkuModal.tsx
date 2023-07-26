import { Col, ModalProps, Row } from '@xlion/component';
import { Form, message } from 'antd';
import React, { useEffect, useState } from 'react';

import CustomModal from '@/components/CustomModal';
import { sleep } from '@/utils';

import { IS_DISABLED } from '../../constants';
import { IPropsType } from '../../types';
import DynamicProps from '../DynamicProps';

interface IProps extends Omit<ModalProps, 'onOk' | 'onCancel'> {
  skuPropsDict: Recordable<IPropsType>;
  onOk?: (values: any) => void;
  onCancel?: () => void;
}
export const BatchSkuModal: React.FC<IProps> = ({ skuPropsDict, ...props }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  useEffect(() => {
    // console.log(skuProps, skuOptionsDict, skuPropsDict);
  }, []);
  //提交
  async function onFinish() {
    try {
      setLoading(true);
      const { itemProperties } = await form.validateFields();

      let values: any = {};
      for (let i of Object.keys(itemProperties)) {
        let item = itemProperties[i];
        if (!item) {
          continue;
        }
        values[i] = item;
      }
      message.success('填充成功~');
      await sleep(300);
      console.log(values, 'BatchSkuModal');
      setLoading(false);
      props.onOk?.(values);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }
  //渲染其他属性
  function renderProps() {
    return Object.keys(skuPropsDict).map((item, i) => {
      const props = skuPropsDict[item];
      return (
        <Col span={12} key={`${item}-${i}`}>
          <DynamicProps {...props} required={IS_DISABLED.DISABLED} />
        </Col>
      );
    });
  }
  return (
    <CustomModal
      {...props}
      title={'批量填充'}
      className="dialog__menu-form u-pl20 u-pr20"
      width={960}
      onOk={onFinish}
      confirmLoading={loading}
      getContainer={false}
    >
      <Form labelCol={{ span: 8 }} wrapperCol={{ span: 14 }} form={form}>
        <Row>{renderProps()}</Row>
      </Form>
    </CustomModal>
  );
};
