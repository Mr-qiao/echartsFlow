import {
  Col,
  Descriptions,
  Image,
  Input,
  InputNumber,
  message,
  Row,
  Table,
} from 'antd';
import { ProCard } from '@ant-design/pro-components';
import { useEffect, useState } from 'react';
import BottomButton from '@/components/bottomButton';
import { queryById, updateById } from '@/pages/quotation/apis';
import { useParams } from '@umijs/max';

const DescriptionsItem = Descriptions.Item;

function EditBoom() {
  const [dataSource, setDataSource] = useState([]) as any;
  const hj = (index: any) => {
    const NewArr = [...dataSource];
    const data = NewArr[index];
    const hjs =
      Number(data.sccb || 0) +
      Number(data.ppyj || 0) +
      Number(data.ipfy || 0) +
      Number(data.bzcl || 0) +
      Number(data.kdfy || 0);
    console.log(hjs, 'hj');
    NewArr[index].zzbj = hjs;
    setDataSource(NewArr);
  };
  const columns: any = [
    {
      title: '规格信息',
      align: 'center',
      dataIndex: 'properties',
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
                  hj(index);
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
                  hj(index);
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
                  hj(index);
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
                  hj(index);
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
                  hj(index);
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
  const [dataObj, setDataObj] = useState({}) as any;
  const [itemProperties, setItemProperties] = useState([]) as any;
  const { id } = useParams();
  useEffect(() => {
    queryById({ id: id }).then((res) => {
      console.log(res, 'res');
      if (res.success) {
        setDataObj(res.entry);
        setItemProperties(res.entry?.itemProperties || []);
        if (res.entry.goodsInfo) {
          setDataSource(JSON.parse(res?.entry?.goodsInfo || '{}'));
        } else {
          setDataSource(res.entry?.itemSkuList);
        }
      } else {
        message.error('获取信息失败');
      }
    });
  }, []);
  return (
    <div>
      <ProCard>
        <Row>
          <Image.PreviewGroup>
            <Col>
              <Image
                width={260}
                height={260}
                src={dataObj?.imgUrlList?.length > 0 && dataObj.imgUrlList[0]}
              />
            </Col>
            <Col style={{ marginLeft: 10 }}>
              <Row>
                <Col span={24}>
                  <Image
                    width={80}
                    height={80}
                    src={
                      dataObj?.imgUrlList?.length > 0 && dataObj.imgUrlList[1]
                    }
                  />
                </Col>
                <Col span={24} style={{ marginTop: 10 }}>
                  <Image
                    width={80}
                    height={80}
                    src={
                      dataObj?.imgUrlList?.length > 0 && dataObj.imgUrlList[2]
                    }
                  />
                </Col>
                <Col span={24} style={{ marginTop: 10 }}>
                  <Image
                    width={80}
                    height={80}
                    src={
                      dataObj?.imgUrlList?.length > 0 && dataObj.imgUrlList[3]
                    }
                  />
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <h1 style={{ margin: 0 }}>{dataObj?.itemTitle}</h1>
              <Descriptions column={2}>
                {itemProperties.map((item: any, index: any) => {
                  return (
                    item.propertyValues && (
                      <DescriptionsItem key={index} label={item.propertyName}>
                        {item.propertyValues}
                      </DescriptionsItem>
                    )
                  );
                })}
              </Descriptions>
              {/*<Descriptions column={1}>*/}
              {/*	<DescriptionsItem label={'卖点信息'}>*/}
              {/*		啊实打实大师大师大师大苏打手打三打哈开机啊合法抗打击沙发哈师大会计法哈卡随机发干哈刷卡机代发哈索拉卡登记*/}
              {/*	</DescriptionsItem>*/}
              {/*</Descriptions>*/}
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
          const arg0 = {
            ...dataObj,
            goodsInfo: dataSource,
          };
          updateById(arg0).then((res) => {
            console.log(res, 'res');
          });
        }}
      />
    </div>
  );
}

export default EditBoom;
