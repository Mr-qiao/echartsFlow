/**
 * 添加园区/编辑园区弹窗
 */
import React, { useEffect, useState } from 'react';
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Modal, Form, Input, Select, ModalProps, message } from 'antd';
import { createUserApi, createZoneApi, updateZoneApi } from '@/services/system'




const { TextArea } = Input;

type AddModalIProps = ModalProps & {
  record?: any;
};



const ParkModal: React.FC<AddModalIProps> = ({ onOk, record, ...restProps }) => {
  const [form] = Form.useForm();
  console.log(record, 'record')
  // 用户提交操作
  const handleOk = async (e: any) => {
    try {
      const values = await form.validateFields();
      const API = record ? updateZoneApi : createZoneApi;
      const req = record ? { ...values, id: record.id } : values;
      await API(req);
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
      console.log(1111)
      form.resetFields();
    }
  }, [record])


  return (
    <Modal title={record ? '编辑园区' : "添加园区"} {...restProps} onOk={handleOk}>
      <Form form={form} labelCol={{ span: 4 }} preserve wrapperCol={{ span: 16 }} initialValues={{
        uname: '',
        passwd: '',
        role: '',
        remarks: ''
      }}>
        <Form.Item label="分组 ID" name="groupId" rules={[
          {
            required: true,
            message: '请输入用户名',
          },
        ]}>
          <Input placeholder="请输入分组 ID" />
        </Form.Item>
        <Form.Item
          label="园区名称"
          name="name"
          rules={[
            {
              required: true,
              message: '请输入园区名称',
            },
          ]}
        >
          <Input placeholder='请输入园区名称' />
        </Form.Item>

        <Form.Item
          label="园区维度"
          name="lat"
          rules={[
            {
              required: true,
              message: '请输入园区维度',
            },
          ]}
        >
          <Input placeholder='请输入园区维度' />
        </Form.Item>

        <Form.Item
          label="园区经度"
          name="lng"
          rules={[
            {
              required: true,
              message: '请输入园区经度',
            },
          ]}
        >
          <Input placeholder='请输入园区经度' />
        </Form.Item>

        <Form.Item
          label="园区图片"
          name="imageUrl"
          rules={[
            {
              required: true,
              message: '请输入园区图片',
            },
          ]}
        >
          <Input placeholder='请输入园区图片' />
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


export default ParkModal;