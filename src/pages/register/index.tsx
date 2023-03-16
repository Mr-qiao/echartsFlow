import React, { useEffect, useState } from 'react';
import { history } from 'umi';
import styles from './index.less';
import {
  Form,
  Input,
  Row,
  Col,
  Button,
  message,
  Steps,
  Checkbox,
  Result,
} from 'antd';
import imgURL from '../../../public/favicon.png';
import bgUrl from '../../../public/bj.png';
import Encrypt from '@/utils/encrypt';
import { sendValidateCode, designerRegister } from '@/services/loginRegister';
import { Link } from '@umijs/max';
import PicturesWall from '@/components/PicturesWall';

const bgStyle: any = {
  width: '100%',
  minHeight: '100vh',
  position: 'relative',
  overflow: 'hidden',
  backgroundImage: `url(${bgUrl})`,
};

const Launch: any = () => {
  const [form] = Form.useForm();
  // 当前第几步
  const [current, setCurrnt] = useState(1);
  // step 1 发送验证码时间
  const [count, setCount] = useState(60);
  // step 2 发送验证码时间
  const [countTwo, setCountTwo] = useState(60);
  // step 1 是否阅读
  const [check, setCheck] = useState(false);

  // step 1 发送验证码
  const [isSend, setIsSend] = useState(false);
  // step 2 发送验证码
  const [isSendTwo, setIsSendTwo] = useState(false);
  // step 1 是否点击发送验证码
  const [isClick, setIsClick] = useState(false);
  // step 2 是否点击发送验证码
  const [isClickTwo, setIsClickTwo] = useState(false);

  const handleSubmit = (val: any) => {
    // step 1 总提交
    setCurrnt(1);
    const { password, confirmPassword } = val;
    if (password !== confirmPassword) {
      return message.error('登录密码不一致');
    }
    if (!isClick) {
      return message.error('请发送验证码');
    }
    designerRegister(
      Object.assign(val, {
        password: Encrypt(password),
        confirmPassword: Encrypt(password),
      }),
    ).then((res: any) => {
      if (res.status) {
        message.success('成功');
        history.push({ pathname: './login' });
      } else {
        message.error(res.message);
      }
    });
  };
  const handleSubmitTwo = (val: any) => {
    // step 2 总提交
    const { password, confirmPassword } = val;
    if (password !== confirmPassword) {
      return message.error('登录密码不一致');
    }
    if (!isClickTwo) {
      return message.error('请发送验证码');
    }
    designerRegister(
      Object.assign(val, {
        password: Encrypt(password),
        confirmPassword: Encrypt(password),
      }),
    ).then((res: any) => {
      if (res.status) {
        message.success('成功');
        history.push({ pathname: './login' });
      } else {
        message.error(res.message);
      }
    });
  };

  const onCount = () => {
    let time = setInterval(() => {
      setIsClick(true);
      setCount((val) => {
        if (val === 0) {
          clearInterval(time);
          setIsSend(false);
          return 60;
        }
        return val - 1;
      });
    }, 1000);
  };
  const onCountTwo = () => {
    let time = setInterval(() => {
      setIsClickTwo(true);
      setCountTwo((val) => {
        if (val === 0) {
          clearInterval(time);
          setIsSendTwo(false);
          return 60;
        }
        return val - 1;
      });
    }, 1000);
  };
  const sendCaptcha = () => {
    const mobileRegexp = /^1[1-9]\d{9}$/;
    const { phone } = form.getFieldsValue() || {};
    if (!phone) {
      return message.error('请输入正确的手机号');
    }
    if (!mobileRegexp.test(phone)) {
      return message.error('请输入正确的手机号');
    }
    sendValidateCode({ mobile: phone }).then((res: any) => {
      if (res.status) {
        message.success('验证码发送成功');
        setIsSend(true);
        onCount();
      } else {
        message.error(res.message);
      }
    });
  };
  const sendCaptchaTwo = () => {
    const mobileRegexp = /^1[1-9]\d{9}$/;
    const { phone } = form.getFieldsValue() || {};
    if (!phone) {
      return message.error('请输入正确的手机号');
    }
    if (!mobileRegexp.test(phone)) {
      return message.error('请输入正确的手机号');
    }
    sendValidateCode({ mobile: phone }).then((res: any) => {
      if (res.status) {
        message.success('验证码发送成功');
        setIsSendTwo(true);
        onCountTwo();
      } else {
        message.error(res.message);
      }
    });
  };
  return (
    <div style={bgStyle}>
      <div className={styles.icon}>
        <img src={imgURL}></img>
      </div>
      <div className={styles.content}>
        <div className={styles.register}>商家入驻</div>
        <Steps
          current={current}
          className={styles.steps}
          labelPlacement="vertical"
          items={[
            {
              title: '注册账号',
            },
            {
              title: '填写企业信息',
            },
            {
              title: '提交审核成功',
            },
          ]}
        />
        {current === 0 ? (
          <Form
            name="basic"
            className={styles.loginForm}
            onFinish={handleSubmit}
            form={form}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
          >
            {/*<Form.Item*/}
            {/*  label={'公司全称'}*/}
            {/*  name={'name'}*/}
            {/*  help="同一个企业仅可入驻 1 次，请填写完整公司名称，以避免重复注册"*/}
            {/*  rules={[*/}
            {/*    {*/}
            {/*      required: true,*/}
            {/*      message: '请输入公司全称',*/}
            {/*    },*/}
            {/*  ]}*/}
            {/*>*/}
            {/*  <Input />*/}
            {/*</Form.Item>*/}
            <Form.Item
              label="登录名"
              name="loginName"
              help={'支持英文（区分大小写）、数字或者下划线，最长 16 位'}
              rules={[
                {
                  required: true,
                  message: '请输入正确的登录名',
                  pattern: new RegExp(/^[A-Za-z0-9]+$/, 'g'),
                },
                {
                  max: 16,
                  message: '支持英文（区分大小写）、数字或者下划线，最长 16 位',
                },
              ]}
            >
              <Input
                placeholder="请输入登录账号"
                autoComplete="new-password"
                maxLength={16}
              />
            </Form.Item>
            <Form.Item
              label="登录密码"
              name="password"
              rules={[
                {
                  required: true,
                  message: '请输入登录密码',
                  pattern: new RegExp(/^[A-Za-z0-9]+$/, 'g'),
                },
              ]}
            >
              <Input.Password
                type="password"
                placeholder="请输入密码"
                autoComplete="new-password"
                maxLength={20}
              />
            </Form.Item>
            <Form.Item
              label="密码确认"
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: '请输入密码',
                  pattern: new RegExp(/^[A-Za-z0-9]+$/, 'g'),
                },
              ]}
            >
              <Input.Password
                type="password"
                placeholder="请输入密码"
                maxLength={20}
              />
            </Form.Item>
            <Form.Item
              label="邮箱"
              name="phone"
              rules={[
                {
                  required: true,
                  message: '请输入正确邮箱',
                  pattern: new RegExp(
                    /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$/,
                    'g',
                  ),
                },
              ]}
            >
              <Input placeholder="请输入邮箱" maxLength={11} />
            </Form.Item>
            <Form.Item
              label="验证码"
              name="validateCode"
              rules={[
                {
                  required: true,
                  message: '请输入验证码',
                  pattern: new RegExp(/^[0-9]+$/, 'g'),
                },
              ]}
            >
              <Row>
                <Col span={12}>
                  <Input placeholder="请输入6位验证码" maxLength={6} />
                </Col>
                <Col span={8} offset={2}>
                  <Button onClick={sendCaptcha} disabled={isSend}>
                    {isSend ? `${count}后再次发送` : '发送验证码'}
                  </Button>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item
              wrapperCol={{
                xs: { span: 24 },
                sm: { span: 18, offset: 5 },
              }}
            >
              <Checkbox
                checked={check}
                onClick={() => {
                  setCheck(!check);
                }}
              >
                已阅读并同意{' '}
                <Link
                  target="_blank"
                  to={`/help/1`}
                  style={{ color: '#2A69D4' }}
                >
                  《平台服务协议》
                </Link>
                <Link
                  target="_blank"
                  to={`/help/0`}
                  style={{ color: '#2A69D4' }}
                >
                  《隐私政策》
                </Link>
              </Checkbox>
            </Form.Item>
            <Row>
              <Col offset={6}>
                <div className={styles.btnFlex}>
                  <div className={styles.btn}>
                    <Button
                      block
                      disabled={!check}
                      type="primary"
                      htmlType="submit"
                      style={{ border: '0', height: '100%' }}
                    >
                      注册
                    </Button>
                  </div>
                  <div className={styles.link}>
                    <span style={{ color: '#333333' }}>已经入驻？</span>
                    <Button
                      type="link"
                      style={{ border: '0', height: '100%' }}
                      onClick={() =>
                        history.push({
                          pathname: './login',
                        })
                      }
                    >
                      返回登录
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Form>
        ) : current === 1 ? (
          <Form
            className={styles.loginForm}
            onFinish={handleSubmitTwo}
            form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
          >
            <Form.Item
              label={'公司全称'}
              name={'name'}
              help="同一个企业仅可入驻 1 次，请填写完整公司名称，以避免重复注册"
              rules={[
                {
                  required: true,
                  message: '请输入公司全称',
                },
              ]}
            >
              <Input placeholder={'请输入公司全称'} />
            </Form.Item>
            <Form.Item
              label="统一社会信用代码"
              name="loginName"
              help={'请输入91或93开头的18位阿拉伯数字或大写英文字母'}
              rules={[
                {
                  required: true,
                  message: '请输入正确的登录名',
                  pattern: new RegExp(/^[A-Z0-9]+$/, 'g'),
                },
                {
                  max: 18,
                  message: '请输入91或93开头的18位阿拉伯数字或大写英文字母',
                },
              ]}
            >
              <Input
                placeholder="请输入统一社会信用代码"
                autoComplete="new-password"
                maxLength={18}
              />
            </Form.Item>
            <Form.Item
              label={'营业执照'}
              name={'yyzz'}
              rules={[
                {
                  required: true,
                  message: '请上传营业执照',
                },
              ]}
            >
              <PicturesWall />
            </Form.Item>
            <Form.Item
              label={'联系人'}
              name={'name'}
              rules={[
                {
                  required: true,
                  message: '请输入联系人名称',
                },
              ]}
            >
              <Input maxLength={15} placeholder="请输入联系人名称" />
            </Form.Item>
            <Form.Item
              label={'手机号码'}
              name={'phone'}
              rules={[
                {
                  required: true,
                  message: '请输入正确手机号码',
                  pattern: new RegExp(/^[0-9]+$/, 'g'),
                },
              ]}
            >
              <Input maxLength={11} placeholder="请输入手机号码" />
            </Form.Item>
            <Form.Item
              label="验证码"
              name="validateCode"
              rules={[
                {
                  required: true,
                  message: '请输入验证码',
                  pattern: new RegExp(/^[0-9]+$/, 'g'),
                },
              ]}
            >
              <Row>
                <Col span={12}>
                  <Input placeholder="请输入6位验证码" maxLength={6} />
                </Col>
                <Col span={8} offset={2}>
                  <Button onClick={sendCaptchaTwo} disabled={isSendTwo}>
                    {isSendTwo ? `${countTwo}后再次发送` : '发送验证码'}
                  </Button>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item
              label={'微信号'}
              name={'wx'}
              rules={[
                {
                  required: true,
                  message: '请输入正确的微信号',
                  pattern: new RegExp(/^[a-zA-Z][a-zA-Z\d_-]{5,19}$/, 'g'),
                },
              ]}
            >
              <Input placeholder="请输入微信号" />
            </Form.Item>
            <Form.Item label={'第三方店铺链接（可选）'} name={'dsf'}>
              <Input placeholder={'填写店铺链接有助于快速通过审核'} />
            </Form.Item>
            <Row>
              <Col offset={6}>
                <div className={styles.btnFlex}>
                  <div className={styles.btn}>
                    <Button
                      block
                      type="primary"
                      htmlType="submit"
                      style={{ border: '0', height: '100%' }}
                    >
                      提交审核
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Form>
        ) : (
          <Result
            style={{ marginBottom: 100 }}
            status="success"
            title="提交审核成功"
            subTitle="企业认证信息已提交，工作人员将在 1-2 个工作日完成资料审核"
            extra={[
              <Button
                type="primary"
                key="console"
                onClick={() => {
                  history.push('/login');
                }}
              >
                返回
              </Button>,
            ]}
          />
        )}
      </div>
      <div className={styles.footer}>
        Copyright &copy; 2023辛橙信息科技有限公司技术研发部出品
      </div>
    </div>
  );
};

export default Launch;
