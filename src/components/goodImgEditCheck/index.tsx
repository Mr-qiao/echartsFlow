import { Col, Row, Image, Descriptions } from 'antd';
import './index.less';

const { Item } = Descriptions;

function GoodImgEditCheck() {
  const arr = [
    {
      src: 'https://static.1sapp.com/qupost/images/2020/06/17/1592362881051415095.jpg?imageView2/2/w/750/q/80/format/jpeg',
    },
    {
      src: 'https://img1.baidu.com/it/u=664069914,3928453659&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
    },
    {
      src: 'https://hbimg.huabanimg.com/b886a3bc5dc7c0b8863f48b1b062fe15d582dc102633f-NnXKGZ_fw658',
    },
  ];
  return (
    <Row className={'good-detail'}>
      <Image.PreviewGroup>
        <Col span={10}>
          <Col>
            <Image
              width={200}
              height={200}
              src={
                'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg1.gamersky.com%2Fimage2018%2F05%2F20180522_yxy_415_14%2Fimage015_S.jpg&refer=http%3A%2F%2Fimg1.gamersky.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1680674026&t=cc97053f08e42dff4d5bd6faaf92ba6d'
              }
            />
          </Col>
          <Row className={'bus-img'}>
            {arr.map((item: any, index) => (
              <Col key={index} style={{ marginLeft: index === 0 ? 0 : 10 }}>
                <Image width={60} height={60} src={item.src} />
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
