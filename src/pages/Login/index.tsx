import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, message, Spin } from 'antd';
import { useEffect, useState } from 'react';
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
  const handleSubmit = (val: any) => {
    history.push('/nationalOverview')
  };



  return (
    <div style={bgStyle}>
      <div className={styles.jf}>设计师平台-工厂端</div>
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
            name="loginName"
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
