/**
 * @file 确认打样需求
 */
import { useNavigate, useSearchParams } from '@umijs/max';
import { useMount } from 'ahooks';
import { Button, message, Steps } from 'antd';
import { pick } from 'lodash-es';
import React, { useState } from 'react';

import { addProofDemand, updateProofDemand } from '@/services/proofDemand';

import Api from '@/pages/Goods1/services';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Step4 from './components/Step4';
import Step5 from './components/Step5';
import ss from './index.less';
import { IStepProps } from './types';

const steps: Array<{
  title: string;
  content: React.FunctionComponent<IStepProps>;
}> = [
  { title: '基本信息', content: Step1 },
  { title: '图样附图', content: Step2 },
  { title: '尺寸标准', content: Step3 },
  { title: '物料清单', content: Step4 },
  { title: '工艺指示', content: Step5 },
];

const Confirm = () => {
  const [current, setCurrent] = useState(0);
  const [sampleInfo, setSampleInfo] = useState<Recordable>({});
  const [proofInfo, setProofInfo] = useState({});
  const [searchParams] = useSearchParams();
  const itemId = searchParams.get('id');
  const sampleId = searchParams.get('sampleId');
  const navigate = useNavigate();
  const fetchProofDemand = async () => {
    if (itemId) {
      const { entry, success } = await Api.ProofDemand.Detail({
        itemId: Number(itemId),
      });
      if (success) {
        setSampleInfo(() =>
          pick(entry, [
            'refSampleClothesId',
            'source',
            'sampleClothesCode',
            'title',
            'brandName',
            'yearStr',
            'seasonStr',
            'stage',
            'forPeople',
            'categoryId',
            'supplierId',
            'saleUrl',
            'images',
            'colorComb',
            'sizeComb',
            'designerId',
            'designerName',
          ]),
        );
        setProofInfo(entry);
      }
    }
  };

  useMount(async () => {
    fetchProofDemand();

    if (sampleId) {
      const { entry } = await Api.Sample.Detail({ itemId: Number(sampleId) });
      setSampleInfo(entry);
    }
  });

  const handleStepChange = (current: number) => {
    setCurrent(current);
    fetchProofDemand();
  };

  const onOk = async (data: Recordable<any>) => {
    const params: any = {
      ...sampleInfo,
      //样衣编码
      sampleClothesCode: sampleInfo?.sysItemCode,
      ...proofInfo,
      ...data,
    };
    let api = addProofDemand;
    if (itemId) {
      params.itemId = Number(itemId);
      api = updateProofDemand;
    }
    if (sampleId) {
      params.refSampleClothesId = sampleId;
    }
    const { success } = await api(params);
    if (success) {
      message.success('保存成功', 0.5, () => {
        navigate(-1);
      });
    }
  };

  return (
    <div className={ss.container}>
      <div className={ss.title}>
        <Button
          onClick={() => {
            history.back();
          }}
          style={{ color: '#666' }}
          className="u-mr10"
        >
          返回
        </Button>
      </div>
      <Steps
        className={ss.steps}
        current={current}
        size="small"
        items={steps.map(({ title }) => ({ title }))}
        onChange={handleStepChange}
      />
      {React.createElement(steps[current].content, {
        sampleInfo,
        proofInfo,
        onOk,
      })}
    </div>
  );
};

export default Confirm;
