import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { Form, Input, Button, Spin, message } from 'antd';
import imgURL from '../../../public/favicon.png';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { history } from 'umi';
import Encrypt from '@/utils/encrypt';
import {
  registerSlide,
  fakeAccountLogin,
  queryApplyInfo,
} from '@/services/loginRegister';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import bgUrl from '../../../public/bj.png';
import { setCookie } from '@/utils/utils';

const Launch: any = () => {
  const [form] = Form.useForm();
  const bgStyle: any = {
    width: '100%',
    minHeight: '100vh',
    position: 'relative',
    overflow: 'hidden',
    backgroundImage: `url(${bgUrl})`,
  };
  const [showText, setShowText] = useState(false);
  const [showWaiting, setShowWaiting] = useState(false);
  const [captchaKey, setCaptchaKey] = useState('');
  const [validated, setValidated] = useState(false);
  const [validateTime, setValidateTime] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [gt, setGt] = useState({});
  const onValuesChange = () => {
    const { loginName, password } = form.getFieldsValue();
    const boo = Boolean(loginName && password && validated);
    setIsReady(boo);
  };
  const handleSubmit = (val: any) => {
    const captchaObj = gt;
    //@ts-ignore
    const result = captchaObj?.getValidate();
    const diff = Date.now() - validateTime;
    if (diff >= 10 * 60 * 1000) {
      // api1验证通过后，搁置10分钟不动，geetest_challenge参数会失效，页面需要重载
      location.reload();
      return;
    }
    fakeAccountLogin(
      {
        flagForLogin: 1,
        account: val.loginName,
        pwd: val.password,
        key: captchaKey,
        redirect: null,
        geeTestChallenge: result.geetest_challenge,
        geeTestValidate: result.geetest_validate,
        geeTestSeccode: result.geetest_seccode,
      },
      {
        headers: {
          dataType: '1',
        },
      },
    ).then((res: any) => {
      if (res.status) {
        console.log(res, 'res');
        queryApplyInfo(
          {},
          {
            headers: {
              token: res.entry.token,
            },
          },
        ).then((res) => {
          console.log(res, 'res');
          if (res.status) {
            if (res.entry.auditStatus === 0) {
              history.push({
                pathname: '/register/2',
              });
            } else if (res.entry.auditStatus === 1) {
              history.push({
                pathname: '/goods/list',
              });
            } else {
              history.push({
                pathname: '/register/1',
              });
            }
          }
        });
        window.localStorage.setItem('token', res.entry.token);
        window.localStorage.setItem('info', JSON.stringify(res.entry));
        setCookie('token', res.entry.token);
        setCookie('local_token', res.entry.token);
        // history.push('/goods/list');
      }
      if (!res || (res && !res.status)) {
        //@ts-ignore
        captchaObj.reset(); // 登录失败需要对接口进行重置
        setIsReady(false);
        setValidated(false); // 登录失败的情况
        message.error(res.message || '登录失败');
      }
    });
  };
  const handler = (captchaObj: any) => {
    captchaObj.appendTo('#captcha');
    captchaObj.onReady(function () {
      setShowWaiting(false);
    });
    captchaObj.onSuccess(function () {
      setValidated(true);
      setValidateTime(Date.now());
      const { loginName, password } = form.getFieldsValue();
      const boo = Boolean(loginName && password);
      setIsReady(boo);
    });
    setGt(captchaObj);
  };
  const getRegisterSlide = () => {
    registerSlide().then((res: any) => {
      let { sessionStatus, login } = res;
      // if (login) {
      //   history.push({ pathname: '/artwork/list' });
      //   return;
      // }
      sessionStatus = JSON.parse(sessionStatus);
      setShowWaiting(true);
      setShowText(false);
      setCaptchaKey(res.key);
      //@ts-ignore
      window?.initGeetest(
        {
          // 以下 4 个配置参数为必须，不能缺少
          gt: sessionStatus.gt,
          challenge: sessionStatus.challenge,
          offline: !!res.offline, // 表示当前验证码是否走离线模式，此开关由服务端控制
          new_captcha: sessionStatus.new_captcha, // 用于宕机时表示是新验证码的宕机
          product: 'custom', // 产品形式，包括：float，popup
          width: '320px',
          https: true,
        },
        handler,
      );
    });
  };
  useEffect(() => {
    getRegisterSlide();
  }, []);
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  return (
    <div style={bgStyle}>
      <div className={styles.icon}>
        <img src={imgURL}></img>
      </div>
      <div className={styles.jf}>设计师平台-工厂端</div>
      <div className={styles.content}>
        <div className={styles.login}>登录</div>
        <Form
          name="basic"
          className={styles.loginForm}
          form={form}
          onFinish={handleSubmit}
          onValuesChange={onValuesChange}
          labelCol={{ span: 6 }}
        >
          <Form.Item
            label=""
            name="loginName"
            rules={[
              {
                required: true,
                message: '请输入用户名',
                pattern: new RegExp(/^[A-Za-z0-9]+$/, 'g'),
              },
            ]}
          >
            <Input
              size={'large'}
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="请输入用户名/手机号"
              maxLength={20}
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
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              maxLength={20}
            />
          </Form.Item>
          <Form.Item label="" style={{ textAlign: 'left' }}>
            <Spin spinning={showWaiting}>
              <div id="captcha">
                {showText && <div>行为验证™ 安全组件加载中</div>}
              </div>
            </Spin>
          </Form.Item>
          <div className={styles.registerbtn}>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{ border: '0' }}
              disabled={!isReady}
              // @ts-ignore
              className={!isReady && styles.disabled}
            >
              立即登录
            </Button>
          </div>
          <div className={styles.footerBtn}>
            <Button
              type="link"
              onClick={() =>
                history.push({
                  pathname: '/reset-password',
                })
              }
            >
              忘记密码？
            </Button>
            <Button
              type="link"
              onClick={() =>
                history.push({
                  pathname: '/register/0',
                })
              }
            >
              商家入驻
            </Button>
          </div>
        </Form>
      </div>
      <div className={styles.footer}>
        Copyright &copy; 2023辛橙信息科技有限公司技术研发部出品
      </div>
    </div>
  );
};

export default Launch;
