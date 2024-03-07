import React, { useState } from 'react';
import { Dropdown, Avatar, Modal, Form, Input } from 'antd'
import './index.less';
import { history } from 'umi';
import Cookies from "js-cookie";
import { useEffect } from "react";
import styles from './index.less'

export default function () {
	const info: any = window.localStorage.getItem('info') || '';
	const [form] = Form.useForm()
	const [isModalOpen, setIsModalOpen] = useState(false);
	const JSONInfo = JSON.parse(info || '{}');
	// const clearAllCookie = () => {
	// 	var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
	// 	if (keys) {
	// 		for (var i = keys.length; i--;)
	// 			document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
	// 	}
	// }

	const handleModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	useEffect(() => {
		console.log(history)
		if (!info) {
			history.replace('/login');
		}
	}, [])
	return (
		<div className={'avatar-name'}>
			<Dropdown
				trigger={['click']}
				menu={{
					items: [
						{
							label: '系统管理',
							key: 'system',
							onClick: () => {
								history.replace('/system');
							},
						},
						{
							label: '修改密码',
							key: 'rePassWord',
							onClick: handleModal,
						},
						{
							label: '退出登录',
							key: 'logout',
							onClick: () => {
								Cookies.remove('supplier-token')
								// clearAllCookie()
								localStorage.removeItem('supplier-token')
								history.replace('/login');
								console.log('已经退出！！！');
							},
						},
					]
				}}
				// }
				placement="bottom"
			>
				<div>
					<Avatar
						size={'default'}
						src={'https://hbimg.huabanimg.com/b886a3bc5dc7c0b8863f48b1b062fe15d582dc102633f-NnXKGZ_fw658'}
						className={styles.user_img}
					/>
					{/* <span style={{ color: '#4E5969', cursor: 'pointer', fontWeight: 600, marginLeft: 10, fontSize: 18 }}>
						{JSONInfo.supplierName || '重新登陆'}
					</span> */}
				</div>
			</Dropdown>

			<Modal title="修改密码" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
				<Form form={form} labelCol={{ span: 3 }} wrapperCol={{ span: 16 }}>

					<Form.Item
						label="密码"
						name="password"
						rules={[
							{
								required: true,
								message: '请输入密码',
							},
						]}
					>
						<Input placeholder="请输入密码" />
					</Form.Item>

					<Form.Item
						label="新密码"
						name="newpassword"
						rules={[
							{
								required: true,
								message: '请输入新密码',
							},
						]}
					>
						<Input placeholder="请输入新密码" />
					</Form.Item>

				</Form>
			</Modal>

		</div>
	);
}
