/**
 * 添加用户/编辑用户
 */
import React from 'react';
import { Modal, Form, Input, ModalProps } from 'antd';
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
type AddModalIProps = ModalProps & {
  record?: Recordable<string | undefined>;
};



const RestPassword: React.FC<AddModalIProps> = ({ onOk, record, ...restProps }) => {
  const [form] = Form.useForm();

  // 用户提交操作
  const handleOk = async (e: any) => {
    try {
      const values = await form.validateFields();
      await onOk?.(values);
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
              pattern: new RegExp(/^[A-Za-z0-9]+$/, 'g'),
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            size={'large'}
            placeholder="请输入密码"
            bordered
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            maxLength={20}
          />
        </Form.Item>

        <Form.Item
          label="新密码"
          name="passwd"
          rules={[
            {
              required: true,
              message: '请输入新密码',
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            size={'large'}
            placeholder="请输入密码"
            bordered
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            maxLength={20}
          />
        </Form.Item>

      </Form>
    </Modal>
  )
}


export default RestPassword;