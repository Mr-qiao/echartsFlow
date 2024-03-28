/**
 * 添加用户/编辑用户
 */
import React, { useEffect, } from 'react';
import { Modal, Form, Input, Select, ModalProps, message } from 'antd';
import { createUserApi } from '@/services/system'
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
      await createUserApi(values);
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
    return () => {
      form.resetFields()
    }
  }, [record])


  return (
    <Modal title={record ? '编辑用户' : "添加用户"} {...restProps} onOk={handleOk}>
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
        >
          <TextArea showCount maxLength={500} rows={5} placeholder="请输入内容" />
        </Form.Item>
      </Form>
    </Modal>
  )
}


export default UserModal;