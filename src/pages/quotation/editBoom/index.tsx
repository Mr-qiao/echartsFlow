import { Col, Descriptions, Image, Input, InputNumber, Row, Table } from 'antd';
import { ProCard } from '@ant-design/pro-components';
import { useState } from 'react';
import BottomButton from '@/components/bottomButton';

const DescriptionsItem = Descriptions.Item;

function EditBoom() {
  const [dataSource, setDataSource] = useState([
    {
      sccb: 1,
      ppyj: 2,
      ipfy: 3,
      bzcl: 4,
      kdfy: 5,
    },
    {
      sccb: 1,
      ppyj: 2,
      ipfy: 3,
      bzcl: 4,
      kdfy: 5,
    },
    {
      sccb: 1,
      ppyj: 2,
      ipfy: 3,
      bzcl: 4,
      kdfy: 5,
    },
  ]) as any;
  const columns: any = [
    {
      title: '规格信息',
      align: 'center',
      dataIndex: 'ggxx',
    },
    {
      title: '报价项',
      children: [
        {
          title: '生产成本',
          align: 'center',
          dataIndex: 'sccb',
          render: (_: any, recode: any, index: number) => {
            return (
              <InputNumber
                min={0}
                value={recode.sccb}
                onChange={(e) => {
                  const NewArr = [...dataSource];
                  NewArr[index].sccb = e;
                  setDataSource(NewArr);
                }}
              />
            );
          },
        },
        {
          title: '品牌溢价',
          align: 'center',
          dataIndex: 'ppyj',
          render: (_: any, recode: any, index: number) => {
            return (
              <InputNumber
                min={0}
                value={recode.ppyj}
                onChange={(e) => {
                  const NewArr = [...dataSource];
                  NewArr[index].ppyj = e;
                  setDataSource(NewArr);
                }}
              />
            );
          },
        },
        {
          title: 'Ip费用',
          align: 'center',
          dataIndex: 'ipfy',
          render: (_: any, recode: any, index: number) => {
            return (
              <InputNumber
                min={0}
                value={recode.ipfy}
                onChange={(e) => {
                  const NewArr = [...dataSource];
                  NewArr[index].ipfy = e;
                  setDataSource(NewArr);
                }}
              />
            );
          },
        },
        {
          title: '包装材料',
          align: 'center',
          dataIndex: 'bzcl',
          render: (_: any, recode: any, index: number) => {
            return (
              <InputNumber
                min={0}
                value={recode.bzcl}
                onChange={(e) => {
                  const NewArr = [...dataSource];
                  NewArr[index].bzcl = e;
                  setDataSource(NewArr);
                }}
              />
            );
          },
        },
        {
          title: '快递费用',
          align: 'center',
          dataIndex: 'kdfy',
          render: (_: any, recode: any, index: number) => {
            return (
              <InputNumber
                min={0}
                value={recode.kdfy}
                onChange={(e) => {
                  const NewArr = [...dataSource];
                  NewArr[index].kdfy = e;
                  setDataSource(NewArr);
                }}
              />
            );
          },
        },
      ],
    },
    {
      title: '最终报价',
      align: 'center',
      dataIndex: 'zzbj',
    },
  ];

  return (
    <div>
      <ProCard>
        <Row>
          <Image.PreviewGroup>
            <Col>
              <Image
                width={200}
                height={200}
                src={
                  'https://img1.baidu.com/it/u=664069914,3928453659&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
                }
              />
            </Col>
            <Col>
              <Row>
                <Col span={24}>
                  <Image
                    width={60}
                    height={60}
                    src={
                      'https://img1.baidu.com/it/u=664069914,3928453659&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
                    }
                  />
                </Col>
                <Col span={24} style={{ marginTop: 10 }}>
                  <Image
                    width={60}
                    height={60}
                    src={
                      'https://img1.baidu.com/it/u=664069914,3928453659&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
                    }
                  />
                </Col>
                <Col span={24} style={{ marginTop: 10 }}>
                  <Image
                    width={60}
                    height={60}
                    src={
                      'https://img1.baidu.com/it/u=664069914,3928453659&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
                    }
                  />
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Descriptions column={2}>
                <DescriptionsItem label={'来源'}>
                  1&nbsp;&nbsp;&nbsp;<a>查看设计</a>
                </DescriptionsItem>
                <DescriptionsItem label={'提案单信息'}>1</DescriptionsItem>
                <DescriptionsItem label={'品类'}>2</DescriptionsItem>
                <DescriptionsItem label={'适用人群'}>3</DescriptionsItem>
                <DescriptionsItem label={'花板'}>4</DescriptionsItem>
                <DescriptionsItem label={'廓形'}>5</DescriptionsItem>
                <DescriptionsItem label={'设计师'}>6</DescriptionsItem>
                <DescriptionsItem label={'尺码'}>6</DescriptionsItem>
                <DescriptionsItem label={'颜色'}>6</DescriptionsItem>
              </Descriptions>
              <Descriptions column={1}>
                <DescriptionsItem label={'卖点信息'}>
                  啊实打实大师大师大师大苏打手打三打哈开机啊合法抗打击沙发哈师大会计法哈卡随机发干哈刷卡机代发哈索拉卡登记
                </DescriptionsItem>
              </Descriptions>
            </Col>
          </Image.PreviewGroup>
        </Row>
        <Table
          size={'small'}
          columns={columns}
          dataSource={dataSource}
          pagination={false}
        />
      </ProCard>
      <BottomButton
        okText={'提交报价'}
        onOk={() => {
          console.log(dataSource, 'dataSource');
        }}
      />
    </div>
  );
}

export default EditBoom;
