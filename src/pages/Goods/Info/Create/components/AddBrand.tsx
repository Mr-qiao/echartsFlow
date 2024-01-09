/* eslint-disable react/require-default-props */
import { Form, Input, message } from 'antd';
import React, { ReactNode, useRef } from 'react';

import CustomModal from '@/components/CustomModal';
import Upload from '@/components/Upload';
import { doBrandCreateOrUpdate } from '@/services/common';

interface PageProps {
  onSuccess?: any;
  children: ReactNode;
}

const AddBrand: React.FC<PageProps> = ({ children, onSuccess }) => {
  const [form] = Form.useForm();
  const brandName = Form.useWatch('brandName', form);
  const brandNameEn = Form.useWatch('brandNameEn', form);
  const addRef = useRef();
  const onConfirm = (): any =>
    form.validateFields().then((values) => {
      if (values.brandImgUrl) {
        values.brandImgUrl = values.brandImgUrl[0].url;
      }
      doBrandCreateOrUpdate(values)
        .then((res: any) => {
          if (res.entry) {
            message.success('品牌创建成功');
            addRef.current?.hide();
            if (onSuccess) {
              onSuccess({ ...values, id: res.entry });
            }
            return;
          }
          message.error('创建失败～');
        })
        .catch((e: any) => {
          message.error('遇到一点问题，请重试');
        });
    });

  return (
    <>
      <CustomModal title="创建品牌" ref={addRef} onConfirm={onConfirm}>
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          preserve={false}
        >
          <Form.Item
            label="品牌中文名"
            name="brandName"
            extra="字母、数字或者英文符号，最长16 位，区分大小写"
            rules={[{ required: !brandNameEn }]}
          >
            <Input maxLength={16} />
          </Form.Item>
          <Form.Item
            label="品牌英文名"
            name="brandNameEn"
            extra="字母、数字或者英文符号，最长16 位，区分大小写"
            rules={[{ required: !brandName }]}
          >
            <Input maxLength={16} />
          </Form.Item>
          <Form.Item label="品牌图标" name="brandImgUrl">
            <Upload listType="picture-card" tip={false} />
          </Form.Item>
        </Form>
      </CustomModal>
      <a
        className="u-f__center"
        onClick={() => {
          console.log('==========');
          addRef.current.show();
        }}
        style={{ padding: '4px 0' }}
      >
        {children}
      </a>
    </>
  );
};
export default AddBrand;
