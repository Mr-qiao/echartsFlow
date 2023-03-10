import {Col, Row, Image} from "antd"
import './index.less'

function GoodsTableCol(props: any) {
	const {
		nameArr = [
			{
				title: '商品名称',
				key: '六位地黄丸11111111111'
			}, {
				title: '商品类目',
				key: '药'
			}, {
				title: '商品品牌',
				key: '六位'
			}, {
				title: '颜色',
				key: '黑色'
			}, {
				title: '尺码',
				key: 'xxl'
			},
		],
		showImg = true,  // 是否展示全部图片
		footerImg = true, // 是否展示底部3图
	} = props
	const arr = [
		{
			src: 'https://static.1sapp.com/qupost/images/2020/06/17/1592362881051415095.jpg?imageView2/2/w/750/q/80/format/jpeg'
		},
		{
			src: 'https://img1.baidu.com/it/u=664069914,3928453659&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
		},
		{
			src: 'https://hbimg.huabanimg.com/b886a3bc5dc7c0b8863f48b1b062fe15d582dc102633f-NnXKGZ_fw658'
		},
	]
	return (
		<Row className={'good-table-list'}>
			{showImg ? <Image.PreviewGroup>
				<Col className={'good-table-list-img'}>
					<Col>
						<Image
							width={80}
							height={80}
							src={'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202008%2F14%2F20200814193845_hoqoc.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1680685773&t=9dedb4d654cd2ed1bc54c90bf2c5ab37'}
						/>
					</Col>
					{footerImg ? <Row className={'bus-img'}>
						{
							arr.map((item: any, index) => (
								<Col key={index} style={{marginLeft: index === 0 ? 0 : 7}}>
									<Image
										width={22}
										height={22}
										src={item.src}
									/>
								</Col>
							))
						}
					</Row> : null}
				</Col>
			</Image.PreviewGroup> : null}
			<Col>
				{nameArr.map((item: any, index: number) => (
					<div key={index} className={'content-name'}><span>{item.title}</span>: {item.key}</div>
				))}
			</Col>
		</Row>
	)
}

export default GoodsTableCol