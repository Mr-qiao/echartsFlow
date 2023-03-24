import React, {useEffect, useState} from 'react';
import {history} from 'umi';
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
	Upload,
	Alert,
} from 'antd';
import imgURL from '../../../public/favicon.png';
import bgUrl from '../../../public/bj.png';
import Cookies from 'js-cookie';
import Encrypt from '@/utils/encrypt';
import {
	sendValidateCode,
	designerRegister,
	register,
	checkCompanyName,
	applyName,
	getCiphertext,
	queryCompanyInfo,
} from '@/services/loginRegister';
import {Link, useParams} from '@umijs/max';
import PicturesWall from '@/components/PicturesWall';
import {UploadOutlined} from '@ant-design/icons';
import ImgUpload from '@/pages/register/imgUpload';
import {setCookie} from '@/utils/utils';

const bgStyle: any = {
	width: '100%',
	minHeight: '100vh',
	position: 'relative',
	overflow: 'hidden',
	backgroundImage: `url(${bgUrl})`,
};

const Launch: any = () => {
	const [form] = Form.useForm();
	const params = useParams();
	const [yanZhengName,setYanZhengName] =  useState('发送验证码') as any;
	const [yanZhengNameTwo,setYanZhengNameTwo] = useState('发送验证码') as any;
	// 当前第几步
	const [current, setCurrnt] = useState(params.id) as any;
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
	const [queryByIdList, setqueryById] = useState({}) as any;
	useEffect(() => {
		if (params.id === '1') {
			queryCompanyInfo().then((res) => {
				if (res.status) {
					form.setFieldsValue(res.entry);
					setqueryById(res.entry);
				}
			});
		}
	}, []);
	const handleSubmit = (val: any) => {
		// step 1 总提交
		const {pwd, pwdConfirm} = val;
		if (pwd !== pwdConfirm) {
			return message.error('登录密码不一致');
		}
		if (!isClick) {
			return message.error('请发送验证码');
		}
		register({
			...val,
		}).then((res: any) => {
			if (res.status) {
				message.success('注册成功');
				window.localStorage.setItem('token', res.entry.token);
				window.localStorage.setItem('info', JSON.stringify(res.entry));
				setCookie('token', res.entry.token);
				setCookie('local_token', res.entry.token);
				history.push('/register/1');
			} else {
				message.error(res.message);
			}
		});
	};
	const handleSubmitTwo = (val: any) => {
		getCiphertext({
			plaintext: val.contactsPhone,
			typeCode: 'SUPPLIER_CONTACTS_PHONE',
		}).then((ress: any) => {
			if (ress.status) {
				applyName(
					{
						...val,
						contactsPhoneId: ress.entry.sensitiveInformationId,
						supplierId: queryByIdList?.supplierInfoId
							? queryByIdList.supplierInfoId
							: undefined,
					},
					{
						headers: {
							token: Cookies.get('token'),
						},
					},
				).then((params: any) => {
					if (params.status) {
						history.push('/register/2');
					} else {
						message.error(params?.message);
					}
				});
			}
		});
		// step 2 总提交
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
		const mobileRegexp =
			/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$/;
		const {email} = form.getFieldsValue() || {};
		if (!email) {
			return message.error('请输入正确的邮箱');
		}
		if (!mobileRegexp.test(email)) {
			return message.error('请输入正确的邮箱');
		}
		sendValidateCode({
			email: email,
			type: 1,
			bizType: 18,
		}).then((res: any) => {
			if (res.status) {
				message.success('验证码发送成功');
				setIsSend(true);
				setYanZhengName('重新发送');
				onCount();
			} else {
				message.error(res.message);
			}
		});
	};
	const sendCaptchaTwo = () => {
		const mobileRegexp = /^1[1-9]\d{9}$/;
		const res = form.getFieldsValue() || {};
		if (!res.contactsPhone) {
			return message.error('请输入正确的手机号');
		}
		if (!mobileRegexp.test(res.contactsPhone)) {
			return message.error('请输入正确的手机号');
		}
		sendValidateCode({bizType: 21, type: 2, mobile: res.contactsPhone}).then(
			(res: any) => {
				if (res.status) {
					message.success('验证码发送成功');
					setIsSendTwo(true);
					setYanZhengNameTwo('重新发送');
					onCountTwo();
				} else {
					message.error(res.message);
				}
			},
		);
	};
	const beforeUpload = async (file: any): Promise<any> => {
		return false;
	};

	const validatePsw = async (_: any, value: any) => {
		const arg0 = {
			companyName: value,
			// unifyCreditCode: val.unifyCreditCode
		};
		const res = await checkCompanyName(arg0, {
			headers: {
				token: Cookies.get('token'),
			},
		});
		if (!res.status) {
			return Promise.reject(new Error('公司已经入住过，无法入驻'));
		} else {
			return Promise.resolve();
		}
	};
	return (
		<div style={bgStyle}>
			<div className={styles.icon}>
				<img src={imgURL}></img>
			</div>
			<div className={styles.content}>
				{queryByIdList.supplierInfoId && (
					<Alert
						type="error"
						message={`驳回原因：${queryByIdList?.auditorReason}`}
						banner
					/>
				)}
				<div className={styles.register}>工厂入驻</div>
				<Steps
					current={Number(current)}
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
				{params.id === '0' ? (
					<Form
						name="basic"
						className={styles.loginForm}
						onFinish={handleSubmit}
						form={form}
						labelCol={{span: 5}}
						wrapperCol={{span: 16}}
					>
						<Form.Item
							label={'公司全称'}
							name={'companyName'}
							help="同一个企业仅可入驻 1 次，请填写完整公司名称，以避免重复注册"
							rules={[
								{
									required: true,
									message: '请输入公司全称',
								},
							]}
						>
							<Input maxLength={50} placeholder={'请输入营业执照上的公司全称'}/>
						</Form.Item>
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
							/>
						</Form.Item>
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
							<Input placeholder="请输入邮箱"/>
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
									<Input placeholder="请输入6位验证码" maxLength={6}/>
								</Col>
								<Col span={8} offset={2}>
									<Button onClick={sendCaptcha} disabled={isSend}>
										{isSend ? `${count}后再次发送` : yanZhengName}
									</Button>
								</Col>
							</Row>
						</Form.Item>
						<Form.Item
							wrapperCol={{
								xs: {span: 24},
								sm: {span: 18, offset: 5},
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
									style={{color: '#2A69D4'}}
								>
									《平台服务协议》
								</Link>
								<Link
									target="_blank"
									to={`/help/0`}
									style={{color: '#2A69D4'}}
								>
									《隐私政策》
								</Link>
							</Checkbox>
						</Form.Item>
						<Row>
							<Col offset={6} span={18}>
								<div className={styles.btnFlex}>
									<div className={styles.btn}>
										<Button
											block
											// disabled={!check}
											type="primary"
											htmlType="submit"
											style={{border: '0', height: '100%'}}
										>
											注册
										</Button>
									</div>
									<div className={styles.link}>
										<span style={{color: '#333333'}}>已经入驻？</span>
										<div>
											<a
												type="link"
												style={{border: '0', height: '100%', color: '#466eff', padding: 0}}
												onClick={() =>
													history.push({
														pathname: '/login',
													})
												}
											>
												返回登录
											</a>
										</div>
									</div>
								</div>
							</Col>
						</Row>
					</Form>
				) : params.id === '1' ? (
					<Form
						className={styles.loginForm}
						form={form}
						initialValues={queryByIdList}
						onFinish={handleSubmitTwo}
						labelCol={{span: 8}}
						wrapperCol={{span: 16}}
					>
						<Form.Item
							label={'公司全称'}
							name={'companyName'}
							validateTrigger="onBlur"
							help="同一个企业仅可入驻 1 次，请填写完整公司名称，以避免重复注册"
							rules={[
								{
									required: true,
									message: '请输入公司全称',
								},
								{
									validator: validatePsw,
								},
							]}
						>
							<Input maxLength={50} placeholder={'请输入营业执照上的公司全称'}/>
						</Form.Item>
						<Form.Item
							label="统一社会信用代码"
							name="unifyCreditCode"
							help={'请输入91或93开头的18位阿拉伯数字或大写英文字母'}
							rules={[
								{
									required: true,
									message: '请输入正确的登录名',
									pattern: new RegExp(
										/[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}/,
										'g',
									),
								},
								{
									max: 18,
									message: '请输入91或93开头的18位阿拉伯数字或大写英文字母',
								},
							]}
						>
							<Input placeholder="请输入统一社会信用代码" maxLength={18}/>
						</Form.Item>
						<Form.Item
							label={'营业执照'}
							name="bizLicense"
							help={'请上传文件'}
							rules={[{required: true, message: '请选择文件'}]}
						>
							<ImgUpload/>
						</Form.Item>
						<Form.Item
							label={'联系人'}
							name={'contactsName'}
							rules={[
								{
									required: true,
									message: '请输入联系人名称',
								},
							]}
						>
							<Input maxLength={15} placeholder="请输入联系人名称"/>
						</Form.Item>
						<Form.Item
							label={'手机号码'}
							name={'contactsPhone'}
							rules={[
								{
									required: true,
									message: '请输入正确手机号码',
									pattern: new RegExp(/^[0-9]+$/, 'g'),
								},
							]}
						>
							<Input maxLength={11} placeholder="请输入手机号码"/>
						</Form.Item>
						<Form.Item
							label="验证码"
							name="verifyCode"
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
									<Input placeholder="请输入6位验证码" maxLength={6}/>
								</Col>
								<Col span={8} offset={2}>
									<Button onClick={sendCaptchaTwo} disabled={isSendTwo}>
										{isSendTwo ? `${countTwo}后再次发送` : yanZhengNameTwo}
									</Button>
								</Col>
							</Row>
						</Form.Item>
						<Form.Item
							label={'微信号'}
							name={'wechatNo'}
							rules={[
								{
									required: true,
									message: '请输入正确的微信号',
									pattern: new RegExp(/^[a-zA-Z][a-zA-Z\d_-]{5,19}$/, 'g'),
								},
							]}
						>
							<Input placeholder="请输入微信号"/>
						</Form.Item>
						<Form.Item label={'第三方店铺链接（可选）'} name={'otherShopLink'}>
							<Input placeholder={'填写店铺链接有助于快速通过审核'}/>
						</Form.Item>
						<Row>
							<Col offset={6}>
								<div className={styles.btnFlex}>
									<div className={styles.btn}>
										<Button
											block
											type="primary"
											htmlType="submit"
											style={{border: '0', height: '100%'}}
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
						style={{marginBottom: 100}}
						status="success"
						title="提交审核成功"
						subTitle="企业认证信息已提交，工作人员将在 1-2 个工作日完成资料审核"
						extra={[
							<div className={styles.btnFlex} style={{justifyContent: 'center'}}>
								<div className={styles.btn}>
									<Button
										type="primary"
										key="console"
										style={{border: '0', height: '100%', width: '100%'}}
										onClick={() => {
											history.push('/login');
										}}
									>
										返回
									</Button>
								</div>
							</div>
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
