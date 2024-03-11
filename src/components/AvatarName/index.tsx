import React, { useState } from 'react';
import { Dropdown, Avatar, Modal, Form, Input } from 'antd'
import './index.less';
import { history } from 'umi';
import Cookies from "js-cookie";
import { useEffect } from "react";
import styles from './index.less'
import { logout, changePasswd } from '@/services/login'
import { userList } from '@/services/user'
import RestPassword from './resetPassword';

export default function () {
	const info: any = window.localStorage.getItem('info') || '';
	const JSONInfo = JSON.parse(info || '{}');
	const [visible, setVisible] = useState(false);
	// const clearAllCookie = () => {
	// 	var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
	// 	if (keys) {
	// 		for (var i = keys.length; i--;)
	// 			document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
	// 	}
	// }

	const handleModal = () => {
		setVisible(true);
	};

	const handleSubmitRestPasswd = async (val) => {
		try {
			const parmas = {
				passwd: val.passwd
			}
			const res = await changePasswd(parmas);
			console.log(res, 'res')
			if (res.code === 200) {
				setVisible(false);
			}
		} catch (error) {
			console.log(error, 'error')
		}
	}
	// useEffect(() => {
	// 	if (!info) {
	// 		history.replace('/login');
	// 	}
	// }, [])
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
							onClick: async () => {
								try {
									// await logout();
									await userList()
									// localStorage.removeItem('token')
									// history.replace('/login');
								} catch (error) {
								}
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

			<RestPassword open={visible} onCancel={() => setVisible(false)} onOk={handleSubmitRestPasswd} />
			{/* <Modal title="修改密码" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
			</Modal> */}


		</div>
	);
}
