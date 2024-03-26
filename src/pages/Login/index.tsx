
import { useEffect, useState } from 'react';
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, message, Spin } from 'antd';
import { login } from '@/services/login';
import { history } from 'umi';
import styles from './index.less';


const bgStyle: any = {
  width: '100%',
  minHeight: '100vh',
  position: 'relative',
  overflow: 'hidden',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundColor: '#394e73',
};


const Launch: any = () => {
  const [form] = Form.useForm();

  // 登陆
  const handleSubmit = async (val: any) => {
    try {
      const res = await login(val);
      if (res?.code === 0) {
        window.localStorage.setItem('token', res.data?.token);
        window.localStorage.setItem('userInfo', JSON.stringify(res.data))
        message.success('登陆成功')
        history.push('/nationalOverview')
      } else {
        message.error(res.msg)
      }
    } catch (error) {
      console.log(error, '登陆报错~')
    }
  };


  return (
    <div style={bgStyle}>
      <div className={styles.jf}>德力西电气监控视频汇聚平台
      </div>
      <div className={styles.content}>
        <div className={styles.login}>登录</div>
        <Form
          name="basic"
          className={styles.loginForm}
          form={form}
          onFinish={handleSubmit}
          labelCol={{ span: 6 }}
        >
          <Form.Item
            label=""
            name="uname"
            rules={[
              {
                required: true,
                message: '请输入用户名',
              },
            ]}
          >
            <Input
              size={'large'}
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="请输入用户名/邮箱"
              bordered
            />
          </Form.Item>
          <Form.Item
            label=""
            name="passwd"
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
          <div className={styles.registerbtn}>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{ border: '0' }}
            >
              立即登录
            </Button>
          </div>
        </Form>
      </div>
      {/* <div className={styles.footer}>
        Copyright &copy; 2023辛橙信息科技有限公司技术研发部出品
      </div> */}
    </div>
  );
};

export default Launch;
