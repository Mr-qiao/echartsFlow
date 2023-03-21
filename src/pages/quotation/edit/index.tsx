import { ProCard, ProForm } from '@ant-design/pro-components';
import GoodImgEditCheck from '@/components/goodImgEditCheck';
import {
  Button,
  Descriptions,
  Image,
  Input,
  InputNumber,
  Space,
  Table,
} from 'antd';
import { useEffect, useState } from 'react';
import RepeatTable from '@/pages/quotation/components/repeatTable';
import BottomButton from '@/components/bottomButton';
import { queryById } from '@/pages/quotation/apis';
import { useParams } from '@@/exports';

function QuotationEdit() {
  const params = useParams();
  useEffect(() => {
    queryById({ id: params.id }).then((res) => {
      const arg = JSON.parse(res?.data?.itemVO?.properties || '{}');
    });
  }, []);
  // 物料列表主数据
  const [dataSourceWl, setDataSourceWl] = useState([
    {
      wllx: 1,
      gys: 2,
      wlbh: 3,
      sybw: '牛',
    },
    {
      wllx: 1,
      gys: 2,
      wlbh: 3,
      sybw: '牛',
    },
    {
      wllx: 1,
      gys: 2,
      wlbh: 3,
      sybw: '牛',
    },
  ]) as any;
  // 工艺列表主数据
  const [dataSourceGy, setDataSourceGy] = useState([
    {
      bw: 1,
      gylx: 2,
      zf: '牛',
    },
    {
      bw: 1,
      gylx: 2,
      zf: '牛',
    },
    {
      bw: 1,
      gylx: 2,
      zf: '牛',
    },
  ]) as any;
  // 汇总列表主数据
  const [dataSourceHz, setDataSourceHz] = useState([
    {
      gg: 1,
      wlbj: 2,
      gybj: '牛',
    },
    {
      gg: 1,
      wlbj: 2,
      gybj: '牛',
    },
    {
      gg: 1,
      wlbj: 2,
      gybj: '牛',
    },
  ]) as any;
  // 其他列表主数据
  const [dataSourceQt, setDataSourceQt] = useState([]) as any;
  // 暂时mock图
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
  // 尺寸列表 Columns
  const columns: any = [
    {
      title: '名称',
      align: 'center',
      dataIndex: 'name',
    },
    {
      title: '测量方法',
      align: 'center',
      dataIndex: 'clff',
    },
    {
      title: '误差范围',
      align: 'center',
      dataIndex: 'wcfw',
    },
    {
      title: '样版值',
      align: 'center',
      dataIndex: 'ybz',
    },
    {
      title: 'L',
      align: 'center',
      dataIndex: 'L',
    },
  ];
  // 物料列表 Columns
  const columnsWl: any = [
    {
      title: '物料类型',
      align: 'center',
      dataIndex: 'wllx',
    },
    {
      title: '供应商',
      align: 'center',
      dataIndex: 'gys',
    },
    {
      title: '物料编号',
      align: 'center',
      dataIndex: 'wlbh',
    },
    {
      title: '使用部位',
      align: 'center',
      dataIndex: 'sybw',
    },
    {
      title: '单价',
      align: 'center',
      dataIndex: 'dj',
      width: 100,
      render: (_: any, recode: any, index: number) => {
        return (
          <InputNumber
            min={0}
            onChange={(e) => {
              const NewArr = [...dataSourceWl];
              NewArr[index].dj = e;
              setDataSourceWl(NewArr);
            }}
          />
        );
      },
    },
    {
      title: 'sku用量',
      dataIndex: 'skuyl',
      width: 100,
      render: (_: any, recode: any, index: number) => {
        return (
          <InputNumber
            min={0}
            onChange={(e) => {
              const NewArr = [...dataSourceWl];
              NewArr[index].skuyl = e;
              setDataSourceWl(NewArr);
            }}
          />
        );
      },
    },
    {
      title: '损耗率',
      dataIndex: 'shl',
      width: 130,
      render: (_: any, recode: any, index: number) => {
        return (
          <InputNumber
            min={0}
            max={100}
            addonAfter={'%'}
            onChange={(e) => {
              const NewArr = [...dataSourceWl];
              NewArr[index].shl = e;
              setDataSourceWl(NewArr);
            }}
          />
        );
      },
    },
  ];
  // 工艺列表 Columns
  const columnsGy: any = [
    {
      title: '部位',
      align: 'center',
      dataIndex: 'bw',
    },
    {
      title: '工艺类型',
      align: 'center',
      dataIndex: 'gylx',
    },
    {
      title: '做法',
      align: 'center',
      dataIndex: 'zf',
    },
    {
      title: '单价',
      align: 'center',
      dataIndex: 'gydj',
      width: 100,
      render: (_: any, recode: any, index: number) => {
        return (
          <InputNumber
            min={0}
            onChange={(e) => {
              const NewArr = [...dataSourceGy];
              NewArr[index].gydj = e;
              setDataSourceGy(NewArr);
            }}
          />
        );
      },
    },
  ];
  // 其他列表 Columns
  const columnsQt: any = [
    {
      title: '报价项目',
      align: 'center',
      dataIndex: 'bjxm',
      render: (_: any, recode: any, index: number) => {
        return (
          <Input
            value={recode.bjxm}
            onChange={(e) => {
              const NewArr = [...dataSourceQt];
              NewArr[index].bjxm = e.target.value;
              setDataSourceQt(NewArr);
            }}
          />
        );
      },
    },
    {
      title: '报价生效规格',
      align: 'center',
      dataIndex: 'bjsxgg',
    },
    {
      title: '用途',
      align: 'center',
      dataIndex: 'yt',
      render: (_: any, recode: any, index: number) => {
        return (
          <Input
            value={recode.yt}
            onChange={(e) => {
              const NewArr = [...dataSourceQt];
              NewArr[index].yt = e.target.value;
              setDataSourceQt(NewArr);
            }}
          />
        );
      },
    },
    {
      title: '计算单位',
      align: 'center',
      dataIndex: 'jsdw',
      width: 100,
      render: (_: any, recode: any, index: number) => {
        return (
          <Input
            value={recode.jsdw}
            onChange={(e) => {
              const NewArr = [...dataSourceQt];
              NewArr[index].jsdw = e.target.value;
              setDataSourceQt(NewArr);
            }}
          />
        );
      },
    },
    {
      title: '使用数量',
      align: 'center',
      dataIndex: 'sysl',
      width: 100,
      render: (_: any, recode: any, index: number) => {
        return (
          <InputNumber
            value={recode.sysl}
            min={0}
            onChange={(e) => {
              const NewArr = [...dataSourceQt];
              NewArr[index].sysl = e;
              setDataSourceQt(NewArr);
            }}
          />
        );
      },
    },
    {
      title: '操作',
      align: 'center',
      render: (_: any, recode: any, index: number) => {
        return (
          <a
            onClick={() => {
              const NewArr = [...dataSourceQt];
              NewArr.splice(index, 1);
              setDataSourceQt(NewArr);
            }}
          >
            删除
          </a>
        );
      },
    },
  ];
  // 其他列表 Columns
  const columnsHz: any = [
    {
      title: '规格',
      align: 'center',
      dataIndex: 'gg',
    },
    {
      title: '物料报价',
      align: 'center',
      dataIndex: 'wlbj',
    },
    {
      title: '工艺报价',
      align: 'center',
      dataIndex: 'gybj',
    },
    {
      title: '其他报价',
      align: 'center',
      dataIndex: 'qtbj',
    },
  ];
  // 汇总提交表单
  const submit = () => {
    console.log(dataSourceWl, 'dataWl');
    console.log(dataSourceGy, 'dataGy');
  };
  return (
    <div>
      <ProCard>
        <GoodImgEditCheck />
      </ProCard>
      <ProCard title={'图样副图'}>
        <Descriptions column={1}>
          <Descriptions.Item label={'图片附件'}>
            <Image.PreviewGroup>
              {arr.map((item: any, index) => {
                return (
                  <span
                    key={index}
                    style={{ marginLeft: index === 0 ? 0 : 20 }}
                  >
                    <Image src={item.src} width={100} height={100} />
                  </span>
                );
              })}
            </Image.PreviewGroup>
          </Descriptions.Item>
          <Descriptions.Item label={'其他附件'}>
            <div>内部机密</div>
          </Descriptions.Item>
          <Descriptions.Item label={'尺寸标准'}>
            <Table size={'small'} scroll={{ x: 900 }} columns={columns} />
          </Descriptions.Item>
          <Descriptions.Item label={'尺寸副图'}>
            <Image
              src={
                'https://img1.baidu.com/it/u=664069914,3928453659&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
              }
              width={100}
              height={100}
            />
          </Descriptions.Item>
          <Descriptions.Item label={'物料报价'}>
            <Table
              size={'small'}
              columns={columnsWl}
              dataSource={dataSourceWl}
              scroll={{ x: 900 }}
              pagination={false}
            />
          </Descriptions.Item>
          <Descriptions.Item label={'工艺报价'}>
            <Table
              size={'small'}
              columns={columnsGy}
              dataSource={dataSourceGy}
              scroll={{ x: 900 }}
              pagination={false}
            />
          </Descriptions.Item>
          <Descriptions.Item label={'其他报价'}>
            <RepeatTable
              columns={columnsQt}
              dataSource={dataSourceQt}
              setData={setDataSourceQt}
            />
          </Descriptions.Item>
          <Descriptions.Item label={'汇总报价'}>
            <Table
              size={'small'}
              scroll={{ x: 900 }}
              columns={columnsHz}
              dataSource={dataSourceHz}
              pagination={false}
            />
          </Descriptions.Item>
        </Descriptions>
      </ProCard>
      <BottomButton onOk={submit} />
    </div>
  );
}

export default QuotationEdit;
