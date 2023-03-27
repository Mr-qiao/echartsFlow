/**
 * @file 确认打样需求
 */
import {useSearchParams} from '@umijs/max';
import {useMount} from 'ahooks';
import {message, Steps} from 'antd';
import {pick} from 'lodash';
import React, {useState} from 'react';

import {updateProofDemand} from '@/services/proofDemand';

import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Step4 from './components/Step4';
import Step5 from './components/Step5';
import ss from './index.less';
import {IStepProps} from './types';
import {detail} from "@/pages/sample/apis";

const steps: Array<{
	title: string;
	content: React.FunctionComponent<IStepProps>;
}> = [
	{title: '基本信息', content: Step1},
	{title: '图样附图', content: Step2},
	{title: '尺寸标准', content: Step3},
	{title: '物料清单', content: Step4},
	{title: '工艺指示', content: Step5},
];

const Confirm = () => {
	const [current, setCurrent] = useState(0);
	const [sampleInfo, setSampleInfo] = useState({});
	const [proofInfo, setProofInfo] = useState({});
	const [searchParams] = useSearchParams();
	const itemId = searchParams.get('id');
	const sampleId = searchParams.get('sampleId');

	const fetchProofDemand = async () => {
		if (itemId) {
			const {entry, success} = await detail({
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
					]),
				);
				setProofInfo(entry);
			}
		}
	};

	useMount(async () => {
		// fetchProofDemand();

		if (sampleId) {
			const {entry} = await detail({itemId: Number(sampleId)});
			setSampleInfo(() => ({
				...pick(entry, [
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
				]),
			}));
		}
	});

	const handleStepChange = (current: number) => {
		setCurrent(current);
		fetchProofDemand();
	};

	const onOk = async (data: any) => {
		const {success} = await updateProofDemand({
			itemId: Number(itemId),
			...sampleInfo,
			...proofInfo,
			...data,
		});
		if (success) {
			message.success('保存成功');
		}
	};

	return (
		<div className={ss.container}>
			<Steps
				className={ss.steps}
				current={current}
				size="small"
				items={steps.map(({title}) => ({title}))}
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
