/**
 * 添加用户/编辑用户
 */
import React, { useState } from 'react';
import { Button, Modal, Form, Input, Select, ModalProps } from 'antd';




const { TextArea } = Input;

type AddModalIProps = ModalProps & {
  record?: Recordable<string | undefined>;
};



const UserModal: React.FC<AddModalIProps> = ({ onOk, record, ...restProps }) => {
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
    <Modal title="添加用户" {...restProps} onOk={handleOk}>
      <Form form={form} labelCol={{ span: 3 }} wrapperCol={{ span: 16 }}>
        <Form.Item label="用户名" name="userName" rules={[
          {
            required: true,
            message: '请输入密码',
          },
        ]}>
          <Input placeholder="请输入用户名" />
        </Form.Item>
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
          <Input placeholder="请输入密码" />;
        </Form.Item>

        <Form.Item
          label="权限"
          name="password"
          rules={[
            {
              required: true,
              message: '请输入密码',
            },
          ]}
        >
          <Select
            defaultValue="default"
            options={[
              {
                value: 'admin',
                label: '管理员',
              },
              {
                value: 'default',
                label: '普通用户',
              },

            ]}
          />
        </Form.Item>

        <Form.Item
          label="备注"
          name="remark"
          rules={[
            {
              required: true,
              message: '请输入备注内容',
            },
          ]}
        >
          <TextArea showCount maxLength={500} rows={5} placeholder="请输入内容" />
        </Form.Item>
      </Form>
    </Modal>
  )
}


export default UserModal;