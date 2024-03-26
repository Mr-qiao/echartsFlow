/**
 * 添加园区/编辑园区弹窗
 */
import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, ModalProps, message } from 'antd';
import { createDevice, getDeviceListApi, getParkListApi, updateDevice } from '@/services/system'
const { TextArea } = Input;

type AddModalIProps = ModalProps & {
  record?: any;
};

const DeviceModal: React.FC<AddModalIProps> = ({ onOk, record, ...restProps }) => {
  const [parkList, setParkList] = useState([])
  const [deviceList, setDeviceList] = useState([])
  const [form] = Form.useForm();
  // 用户提交操作
  const handleOk = async (e: any) => {
    try {
      const values = await form.validateFields();
      const API = record ? updateDevice : createDevice;
      const req = record ? { ...values, id: record.id } : values;
      await API(req);
      message.success(record ? '更新成功' : '添加成功');
      await onOk?.(e);
    } catch (err) {
      console.log(err);
    }
  };

  const getList = async () => {
    const res = await getParkListApi();
    setParkList(res.data)
  }

  const handleParkChange = async (value) => {
    const res = await getDeviceListApi(value);
    setDeviceList(res.data)
  }

  useEffect(() => {
    getList()
    if (record) {
      form.setFieldsValue({
        ...record
      })
    }
  }, [record])


  return (
    <Modal title={record ? '编辑设备' : "添加设备"} {...restProps} onOk={handleOk}>
      <Form form={form} labelCol={{ span: 5 }} preserve wrapperCol={{ span: 16 }} initialValues={{
        uname: '',
        passwd: '',
        role: '',
        remarks: ''
      }}>
        <Form.Item label="园区ID" name="zoneId" rules={[
          {
            required: true,
            message: '请选择园区ID',
          },
        ]}>
          <Select placeholder='请选择' onChange={handleParkChange}>
            {parkList.map(item => <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>)}
          </Select>
        </Form.Item>

        <Form.Item label="设备ID" name="deviceId" rules={[
          {
            required: true,
            message: '请选择设备ID',
          },
        ]}>
          <Select placeholder='请选择'>
            {deviceList.map(item => <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>)}
          </Select>
        </Form.Item>
        <Form.Item
          label="设备名称"
          name="name"
          rules={[
            {
              required: true,
              message: '请输入设备名称',
            },
          ]}
        >
          <Input placeholder='请输入设备名称' />
        </Form.Item>

        <Form.Item
          label="左边的距离"
          name="positionX"
          rules={[
            {
              required: true,
              message: '请输入距离图片左边的距离',
            },
          ]}
        >
          <Input placeholder='请输入距离图片左边的距离' />
        </Form.Item>

        <Form.Item
          label="上边的距离"
          name="positionY"
          rules={[
            {
              required: true,
              message: '请输入距离图片上边的距离',
            },
          ]}
        >
          <Input placeholder='请输入距离图片上边的距离' />
        </Form.Item>

        <Form.Item
          label="设备维度"
          name="lat"
          rules={[
            {
              required: true,
              message: '请输入设备维度',
            },
          ]}
        >
          <Input placeholder='请输入设备维度' />
        </Form.Item>

        <Form.Item
          label="设备经度"
          name="lng"
          rules={[
            {
              required: true,
              message: '请输入设备经度',
            },
          ]}
        >
          <Input placeholder='请输入设备经度' />
        </Form.Item>

        <Form.Item
          label="设备类型"
          name="type"
          rules={[
            {
              required: true,
              message: '请选择类型',
            },
          ]}
        >
          <Select placeholder='请选择'>
            <Select.Option value="GB28181">GB28181</Select.Option>
            <Select.Option value="STREAM">STREAM</Select.Option>
            <Select.Option value="ONVIF">ONVIF</Select.Option>
            <Select.Option value="SDK">SDK</Select.Option>
          </Select>
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


export default DeviceModal;