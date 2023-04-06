import {Avatar, Dropdown, Menu, message} from 'antd';
import './index.less';
import {history} from 'umi';
import Cookies from "js-cookie";
import {useEffect} from "react";

export default function () {
	const info: any = window.localStorage.getItem('info') || '';
	const JSONInfo = JSON.parse(info || '{}');
	// const clearAllCookie = () => {
	// 	var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
	// 	if (keys) {
	// 		for (var i = keys.length; i--;)
	// 			document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
	// 	}
	// }
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
				overlay={
					<Menu
						items={[
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
						]}
					/>
				}
				placement="bottom"
			>
				<div>
					{/*<Avatar*/}
					{/*  size={'default'}*/}
					{/*  // src={'https://hbimg.huabanimg.com/b886a3bc5dc7c0b8863f48b1b062fe15d582dc102633f-NnXKGZ_fw658'}*/}
					{/*  // className={styles.user_img}*/}
					{/*/>*/}
					<span style={{color: '#4E5969', cursor: 'pointer', fontWeight: 600, marginLeft: 10, fontSize: 18}}>
            {JSONInfo.supplierName || '重新登陆'}
          </span>
				</div>
			</Dropdown>
		</div>
	);
}
