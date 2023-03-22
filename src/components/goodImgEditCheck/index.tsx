import {Col, Row, Image, Descriptions} from 'antd';
import './index.less';

const {Item} = Descriptions;

function GoodImgEditCheck(props) {
	const {data = {}} = props
	const arr = data?.imgUrlList
	// console.log(arr)
	const imgZ =  '';
	const imgF = [];
	return (
		<Row className={'good-detail'}>
			<Image.PreviewGroup>
				<Col span={10}>
					<Col>
						<Image
							width={200}
							height={200}
							src={imgZ}
						/>
					</Col>
					<Row className={'bus-img'}>
						{imgF.map((item: any, index) => (
							<Col key={index} style={{marginLeft: index === 0 ? 0 : 10}}>
								<Image width={60} height={60} src={item}/>
							</Col>
						))}
					</Row>
				</Col>
				<Col span={12} pull={4}>
					<div className={'good-detail-title'}>非常好看的羽绒服</div>
					<Descriptions column={2}>
						<Item label={'来源'}>1</Item>
						<Item label={'品类'}>2</Item>
						<Item label={'适用人群'}>3</Item>
						<Item label={'花板'}>4</Item>
						<Item label={'廓形'}>5</Item>
						<Item label={'设计师'}>6</Item>
						<Item label={'尺码'}>6</Item>
						<Item label={'颜色'}>6</Item>
					</Descriptions>
					<Descriptions column={1}>
						<Item label={'卖点信息'}>
							啊实打实大师大师大师大苏打手打三打哈开机啊合法抗打击沙发哈师大会计法哈卡随机发干哈刷卡机代发哈索拉卡登记
						</Item>
					</Descriptions>
				</Col>
			</Image.PreviewGroup>
		</Row>
	);
}

export default GoodImgEditCheck;
