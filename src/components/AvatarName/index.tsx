import {Avatar, Dropdown, Menu} from "antd";
import './index.less'

export default function (){
	return (
		<div className={'avatar-name'}>
			<Dropdown
				trigger={['click']}
				overlay={
					<Menu
						items={[{
							label: '退出登陆', key: 'logout', onClick: () => {
								console.log('已经退出！！！')
							}
						}]}
					/>
				}
				placement="bottom"
			>
				<div>
					<Avatar
						size={'default'}
						src={'https://hbimg.huabanimg.com/b886a3bc5dc7c0b8863f48b1b062fe15d582dc102633f-NnXKGZ_fw658'}
						// className={styles.user_img}
					/>
					<span style={{color: '#4E5969',marginLeft:10,fontSize:14}}>{'桐生'}</span>
				</div>
			</Dropdown>
		</div>
	)
}