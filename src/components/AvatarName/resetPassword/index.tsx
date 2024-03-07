/**
 * 添加用户/编辑用户
 */
import React from 'react';
import { Modal, Form, Input, ModalProps } from 'antd';





type AddModalIProps = ModalProps & {
  record?: Recordable<string | undefined>;
};



const RestPassword: React.FC<AddModalIProps> = ({ onOk, record, ...restProps }) => {
  const [form] = Form.useForm();

  // 用户提交操作
  const handleOk = async (e: any) => {
    try {
      const values = await form.validateFields();
      console.log(values, '提交')
      await onOk?.(e);
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <Modal title="修改密码" {...restProps} onOk={handleOk}>
      <Form form={form} labelCol={{ span: 3 }} wrapperCol={{ span: 16 }}>
        <Form.Item
          label="密码"
          name="password"
          rules={[
            {
              required: true,
              message: '请输入密码',
            },
          ]}
        >
          <Input placeholder="请输入密码" />
        </Form.Item>

        <Form.Item
          label="新密码"
          name="newpassword"
          rules={[
            {
              required: true,
              message: '请输入新密码',
            },
          ]}
        >
          <Input placeholder="请输入新密码" />
        </Form.Item>

      </Form>
    </Modal>
  )
}


export default RestPassword;