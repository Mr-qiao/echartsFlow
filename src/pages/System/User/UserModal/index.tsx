/**
 * 添加用户/编辑用户
 */
import React, { useEffect, useState } from 'react';
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Modal, Form, Input, Select, ModalProps, message } from 'antd';
import { createUser } from '@/services/system'




const { TextArea } = Input;

type AddModalIProps = ModalProps & {
  record?: any;
};



const UserModal: React.FC<AddModalIProps> = ({ onOk, record, ...restProps }) => {
  const [form] = Form.useForm();


  // 用户提交操作
  const handleOk = async (e: any) => {
    try {
      const values = await form.validateFields();
      await createUser(values);
      message.success(record ? '更新成功' : '添加成功');
      await onOk?.(e);
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        ...record
      })
    }
  }, [record])


  return (
    <Modal title={record ? '添加用户' : "编辑用户"} {...restProps} onOk={handleOk}>
      <Form form={form} labelCol={{ span: 4 }} preserve wrapperCol={{ span: 16 }} initialValues={{
        uname: '',
        passwd: '',
        role: '',
        remarks: ''
      }}>
        <Form.Item label="用户名" name="uname" rules={[
          {
            required: true,
            message: '请输入用户名',
          },
        ]}>
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item
          label="密码"
          name="passwd"
          rules={[
            {
              required: true,
              pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{4,16}$/g,
              message: '密码至少由4个字符组成，必须包含数字、大小写字母，区分大小写'
            }
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="权限"
          name="role"
          rules={[
            {
              required: true,
              message: '请选择权限',
            },
          ]}
        >
          <Select
            // defaultValue="1"
            options={[
              {
                value: '1',
                label: '管理员',
              },
              {
                value: '2',
                label: '普通用户',
              },

            ]}
          />
        </Form.Item>

        <Form.Item
          label="备注"
          name="remarks"
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