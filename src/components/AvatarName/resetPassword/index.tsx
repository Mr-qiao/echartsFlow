/**
 * 添加用户/编辑用户
 */
import React from 'react';
import { Modal, Form, Input, ModalProps, message } from 'antd';


import { changePasswd } from '@/services/login'

type AddModalIProps = ModalProps & {
  record?: Recordable<string | undefined>;
};



const RestPassword: React.FC<AddModalIProps> = ({ onOk, record, ...restProps }) => {
  const [form] = Form.useForm();

  // 用户提交操作
  const handleOk = async (e: any) => {
    try {
      const values = await form.validateFields();
      await changePasswd({ passwd: values?.passwd })
      message.success('更新密码成功')
      await onOk?.(values);
    } catch (err) {
      console.log(err);
    }
  };

  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue('password')) {
      return Promise.reject('两次密码必须一致');
    } else if (!value) {
      return Promise.reject('请再次输入密码')
    } else {
      return Promise.resolve();
    }
  };


  return (
    <Modal title="修改密码" {...restProps} onOk={handleOk}>
      <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
        <Form.Item
          label="密码"
          name="password"
          hasFeedback
          extra="密码至少由4个字符组成，必须包含数字、字母，区分大小写"
          rules={[
            {
              required: true,
              pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{4,16}$/g,
              message: '密码至少由8个字符组成，必须包含数字、大小写字母，区分大小写'
            }
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="新密码"
          name="passwd"
          hasFeedback
          extra="请再次输入密码"
          rules={[
            {
              required: true,
              validator: compareToFirstPassword,
            }
          ]}
        >
          <Input.Password />
        </Form.Item>

      </Form>
    </Modal>
  )
}


export default RestPassword;