import { Dropdown } from 'antd'
import './index.less';
import { history } from 'umi';
import Cookies from "js-cookie";
import { useEffect } from "react";

export default function () {
	const info: any = window.localStorage.getItem('info') || '';
	const JSONInfo = JSON.parse(info || '{}');

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
							label: '退出登录',
							key: 'logout',
							onClick: () => {
								Cookies.remove('supplier-token')
								localStorage.removeItem('supplier-token')
								history.replace('/login');
								console.log('已经退出！！！');
							},
						},
					]
				}}
				placement="bottom"
			>
				<div>
					<span style={{ color: '#4E5969', cursor: 'pointer', fontWeight: 600, marginLeft: 10, fontSize: 18 }}>
						{JSONInfo.supplierName || '重新登陆'}
					</span>
				</div>
			</Dropdown>
		</div>
	);
}
