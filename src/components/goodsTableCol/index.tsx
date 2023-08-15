/**
 * 商品信息
 */
import { Col, Row, Typography } from '@xlion/component';
import { Image } from '@xlion/component'
import React from 'react';
import './index.less';

interface propsType {
  infoList?: Array<{ title: string; key: any }>;
  isMainImg?: boolean; // 是否可展示主图
  isFooterImg?: boolean; // 是否可展示底部小图
  imgList?: any;
  isDeleted?: number;
}

const GoodsTableCol: React.FC<propsType> = ({
  infoList = [],
  isMainImg = true,
  isFooterImg = true,
  imgList = [],
  isDeleted = 0,
}) => {
  const mainImg = imgList[0]?.src; // 主图
  const subplotImg = imgList.slice(1, 4); // 副图
  return (
    <Row className={'good-table-list'}>
      {isMainImg && (
        <Image.PreviewGroup>
          <Col className={'good-table-list-img'}>
            <Col>
              <Image width={80} height={80} src={mainImg} preview={{ src: mainImg }} />
              {isDeleted === 1 && <div className={'imageTitle'}>已作废</div>}
            </Col>
            {isFooterImg && subplotImg.length > 0 && (
              <Row className={'bus-img'}>
                {subplotImg.map((item: any, index: any) => (
                  <Col key={index} style={{ marginLeft: index === 0 ? 0 : 7 }}>
                    <Image width={22} height={22} src={item.src} preview={{ src: item.src }} />
                  </Col>
                ))}
              </Row>
            )}
          </Col>
        </Image.PreviewGroup>
      )}
      <Col>
        {infoList.map((item: any, index: number) => (
          <div key={index} className={'content-name'}>
            <label>{item.title}：</label>
            <Typography.Paragraph
              style={{
                color: 'rgb(0 0 0 / 45%)',
                fontSize: 8,
                marginBottom: 0,
              }}
              ellipsis={{ tooltip: item.key }}
            >
              {item.key || '-'}
            </Typography.Paragraph>
          </div>
        ))}
      </Col>
    </Row>
  );
};

export default GoodsTableCol;
