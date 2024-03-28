/**
 * 添加园区/编辑园区弹窗
 */
import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, ModalProps, message } from 'antd';
import { createDevice, getParkListApi, updateDevice } from '@/services/system'
import dian from '@/assets/img/dian.jpg'
import { css, cx } from '@emotion/css';
const { TextArea } = Input;

type AddModalIProps = ModalProps & {
  record?: any;
};

const DeviceModal: React.FC<AddModalIProps> = ({ onOk, record, ...restProps }) => {
  const [parkList, setParkList] = useState([])
  const [url, setUrl] = useState('')
  // 坐标
  const [coordinate, setCoordinate] = useState({
    left: 0,
    top: 0
  })

  // 坐标
  const [viewCoordinate, setViewCoordinate] = useState({
    left: 0,
    top: 0
  })
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

  const handleImgClick = (event) => {
    const urlNode = document.getElementById('url') as HTMLElement
    const urlNodeClient = urlNode.getBoundingClientRect()
    let x = (event.clientX - urlNodeClient.left) / urlNodeClient.width; //按比例获取 
    let y = (event.clientY - urlNodeClient.top) / urlNodeClient.height;
    setViewCoordinate({
      left: event.clientX - urlNodeClient.left,
      top: event.clientY - urlNodeClient.top
    })
    form.setFieldsValue({
      positionX: x.toFixed(3),
      positionY: y.toFixed(3)
    })
  }


  const getList = async () => {
    const res = await getParkListApi();
    setParkList(res.data)
  }

  const handleParkChange = async (value) => {
    const img = parkList.find(item => item.id === value)?.imageUrl || ''
    setUrl(img)
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
          <Input placeholder='请输入设备 ID' />
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

        {
          url && <div style={{
            position: 'relative',
            marginBottom: 20
          }}>
            <img id='url' onClick={handleImgClick} width='100%' height={240} src={`http://121.40.237.64:16816${url}`} />
            <img src={dian} alt='' className={cx(css`
            width: 16px;
            height: 16px;
              position: absolute;
              left:${viewCoordinate.left - 8}px;
              top: ${viewCoordinate.top - 16}px;
            `)} />
          </div>
        }

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
        >
          <TextArea showCount maxLength={500} rows={5} placeholder="请输入内容" />
        </Form.Item>
      </Form>
    </Modal >
  )
}


export default DeviceModal;