import React, { useState } from 'react';
import styles from './index.less';
import imgURL from '../../../../public/favicon.png';
import bgUrl from '../../../../public/bj.png';
// import {Button, Col, Form, Input, message, Row} from 'antd';
import { Button, Col, Form, Input, message, Row } from '@xlion/component'
import PicturesWall from '@/components/PicturesWall';
import { resetPassword, sendValidateCode } from '@/services/loginRegister';
import { Link } from '@umijs/max';
import { history } from '@@/core/history';

export default (props: any) => {
	const [form] = Form.useForm();
	const [yanZhengName, setYanZhengName] = useState('发送验证码') as any;
	// step 1 发送验证码
	const [isSend, setIsSend] = useState(false);
	// step 1 是否点击发送验证码
	const [isClick, setIsClick] = useState(false);
	// step 1 发送验证码时间
	const [count, setCount] = useState(60);
	const handleSubmit = (values: any) => {
		const arg0 = {
			...values,
		};
		resetPassword(arg0).then((res: any) => {
			if (res.status) {
				message.success('重置密码成功,请重新登陆!');
				history.push('/login');
			} else {
				message.error(res?.message);
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
	const sendCaptcha = () => {
		const mobileRegexp =
			/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$/;
		const { email } = form.getFieldsValue() || {};
		if (!email) {
			return message.error('请输入正确的邮箱');
		}
		if (!mobileRegexp.test(email)) {
			return message.error('请输入正确的邮箱');
		}
		sendValidateCode({ email: email, type: 1, bizType: 19 }).then(
			(res: any) => {
				if (res.status) {
					message.success('验证码发送成功');
					setIsSend(true);
					setYanZhengName('重新获取')
					onCount();
				} else {
					message.error(res.message);
				}
			},
		);
	};
	const bgStyle: any = {
		width: '100%',
		minHeight: '100vh',
		position: 'relative',
		overflow: 'hidden',
		backgroundImage: `url(${bgUrl})`,
	};
	return (
		<div style={bgStyle}>
			<div className={styles.icon}>
				<img src={imgURL}></img>
			</div>
			<div className={styles.box}>
				<div className={styles.register}>重设密码</div>
				<Form
					className={styles.loginForm}
					onFinish={handleSubmit}
					form={form}
					labelCol={{ span: 6 }}
					wrapperCol={{ span: 16 }}
				>
					<Form.Item
						label="邮箱"
						name="email"
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
						<Input placeholder="请输入邮箱" bordered />
					</Form.Item>
					<Form.Item
						label="验证码"
						name="emailAuthCode"
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
								<Input placeholder="请输入6位验证码" maxLength={6} bordered />
							</Col>
							<Col span={8} offset={2}>
								<Button onClick={sendCaptcha} disabled={isSend}>
									{isSend ? `${count}后再次发送` : yanZhengName}
								</Button>
							</Col>
						</Row>
					</Form.Item>
					<Form.Item
						label="登录密码"
						name="pwd"
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
							bordered
						/>
					</Form.Item>
					<Form.Item
						label="密码确认"
						name="pwdConfirm"
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
							bordered
						/>
					</Form.Item>
					<Row>
						<Col offset={6}>
							<div style={{ display: 'flex', alignItems: 'center' }}>
								<div className={styles.btn} style={{ display: 'flex' }}>
									<Button
										block
										type="primary"
										htmlType="submit"
										style={{ border: '0', height: '100%', width: '100%' }}
									>
										提交
									</Button>
								</div>
								<a
									type="link"
									style={{ border: '0', height: '100%', marginLeft: 10, color: '#466eff', padding: 0 }}
									onClick={() =>
										history.push({
											pathname: '/login',
										})
									}
								>
									返回登录
								</a>
							</div>
						</Col>
					</Row>
				</Form>
			</div>
		</div>
	);
};
