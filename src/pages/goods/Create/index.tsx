import {
	Button,
	Cascader,
	Checkbox,
	Col,
	DatePicker,
	Form,
	Input,
	InputNumber,
	message,
	Radio,
	Row,
	Select,
	Typography,
} from 'antd';
import dayjs from 'dayjs';
import React, {createContext, useEffect, useState} from 'react';
import {useModel, useNavigate, useParams} from 'umi';

import PicturesWall from '@/components/PicturesWall';

import Api from '../services';
import SkuCpt from './components/SkuCpt';
import styles from './index.less';

export const CptContext = createContext<any>(null);

const Index: React.FC = () => {
	const {id} = useParams();
	const {category} = useModel('category');
	// const [detail, setDetail] = useState<any>({});
	const [brandList, setBrandList] = useState<any[]>();

	const [dynProps, setDynProps] = useState<any[]>([]);
	const [attrEnum, setAttrEnum] = useState<any[]>([]); // sku 属性枚举
	const [saleProperties, setSaleProperties] = useState<any[]>([]); // sku 属性枚举

	const [form] = Form.useForm();

	const navigate = useNavigate();

	const handleChangeCate = (value) => {
		let cateId = value[value.length - 1];
		Api.Goods.Detail({categoryId: cateId}).then(({entry}) => {
			setDynProps(entry?.baseProperties);
			setSaleProperties(entry?.saleProperties);
			setAttrEnum(entry?.salePropertiesEnum);

			form.setFieldValue('saleProperties', []);
			form.setFieldValue('skus', []);
		});
	};
	useEffect(() => {
		// console.log(id);
		// getGoodsDetail();
		let _ = {};
		if (id) {
			_ = {itemId: id};
		}
		Promise.all([Api.Goods.Detail(_), Api.Goods.BrandList({limit: 20})]).then(
			([{entry: info}, {entry: brand}]) => {
				setBrandList(brand);
				info.categoryId = info?.categoryIds;
				//sku枚举
				setAttrEnum(info?.salePropertiesEnum);
				//动态属性
				setDynProps(info?.baseProperties);
				//sku值
				setSaleProperties(info?.saleProperties);

				// info.dynProps = [info.baseProperties];
				let _ = {...info.item, ...info};
				// setDetail(_);

				form.setFieldsValue(_);
			},
		);
	}, []);

	//提交
	async function onFinish(values) {
		console.log(values);
		let _: any = {...values};
		_.images = normFile(_.images);
		_.categoryId = (_.categoryId as []) ? _.categoryId[_.categoryId.length - 1] : '';
		_.baseProperties = _.dynProps[0];
		Api.Goods.Add(_).then(({}) => {
			message.success('添加成功', 0.5, () => {
				navigate(-1);
			});
		});
	}

	function normFile(e) {
		console.log('Upload event:', e);
		if (Array.isArray(e)) {
			return e?.map((item) => (typeof item === 'object' ? item.url : item));
		}
		return [e];
	}

	return (
		<div className={styles.goodsCreate}>
			<Form
				labelCol={{span: 6}}
				wrapperCol={{span: 14}}
				form={form}
				onFinish={onFinish}
				onValuesChange={(val, allValues) => {
					console.log(allValues);
				}}
			>
				<Form.Item label="商品类型" name="type" hidden={true} initialValue={5}>
					<Input/>
				</Form.Item>
				{/* 1pc  2小程序*/}

				<Form.Item label="商品类型" name="client" hidden={true} initialValue={1}>
					<Input/>
				</Form.Item>
				{/* 1未关联  2关联*/}
				<Form.Item label="关联样衣" name="source" hidden={true} initialValue={1}>
					<Input/>
				</Form.Item>
				<h2>基本信息</h2>
				<Row className={styles.plr20}>
					<Col span={12}>
						<Form.Item label="款式名称" name="title" rules={[{required: true}]}>
							<Input/>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label="商家款式编码" name="supplierStyleCode">
							<Input/>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label="类目" name="categoryId" rules={[{required: true, message: '请选择类目～'}]}>
							<Cascader
								options={category}
								placeholder="请选择上架类目"
								onChange={handleChangeCate}
								fieldNames={{
									children: 'children',
									label: 'name',
									value: 'categoryId',
								}}
							/>
						</Form.Item>
					</Col>
					<Col span={12} pull={2}>
						<Typography.Link style={{marginLeft: '20px'}}>关联样衣</Typography.Link>
					</Col>

					{/* <Col span={12}>
            <Form.Item label="供应商款式编码" name="supplierStyleCode">
              <Input />
            </Form.Item>
          </Col> */}
					<Col span={12}>
						<Form.Item label="渠道商品编码" name="outsideItemCode">
							<Input/>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label="69码" name="snCode">
							<Input/>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label="品牌" name="brandId" rules={[{required: true, message: '请选择品牌～'}]}>
							<Select
								placeholder="请选择"
								showSearch
								filterOption={(input, option) => option?.name.toLowerCase().includes(input.toLowerCase())}
							>
								{brandList?.map((item, i) => (
									<Select.Option key={i} value={item.id} name={item.brandName}>
										<span>{item.brandName}</span>
									</Select.Option>
								))}
							</Select>
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item label="商品图片" required labelCol={{span: 3}} wrapperCol={{span: 20}}>
							<p style={{fontSize: 12, color: '#999', marginTop: '5px'}}>
								支持jpg jpeg .png格式，小于10Mb图片不清晰将会被降低选中概率，故要求图片尺寸在 600*600以上
							</p>
							<Form.Item noStyle name="images" rules={[{required: true, message: '请选择主图～'}]}>
								<PicturesWall maxCount={3}/>
							</Form.Item>
						</Form.Item>
					</Col>
				</Row>
				<h2>类目属性</h2>

				<Row>{renderDynProps()}</Row>

				<h2>sku信息</h2>
				<CptContext.Provider value={{saleProperties: saleProperties || [], attrEnum: attrEnum}}>
					<SkuCpt
						form={form}
						// info={{ saleProperties: saleProperties || [], attrEnum: attrEnum }}
						// saleProperties={saleProperties || []}
						// attrEnum={attrEnum}
					/>
				</CptContext.Provider>
				<Button type="primary" danger htmlType="submit" style={{marginLeft: '12.5%', marginTop: 20}}>
					确认提交
				</Button>
			</Form>
		</div>
	);

	function renderDynProps() {
		return dynProps?.map((item) => (
			<Col key={item.categoryPropertyName} span={12}>
				<RenderItem propsValue={item}/>
			</Col>
		));
	}
};
export default Index;

//params type  '文本' = 1, '数字' = 2, '单选' = 3, '多选' = 4, '下拉单选' = 5, '下拉多选' = 6, '数字区间输入' = 7, '时间输入' = 8, '时间区间输入' = 9,
const RenderItem = ({propsValue}: any) => {
	let propertySelectValues =
		(propsValue?.propertySelectValues &&
			Array.isArray(propsValue?.propertySelectValues) &&
			propsValue?.propertySelectValues) ||
		[];
	let type = propsValue.type;
	let value = propsValue?.categoryPropertyValues ? propsValue?.categoryPropertyValues?.toString() : '';
	if (type === 4) {
		value = value.split(',');
	}
	if (type === 8) {
		value = dayjs(value);
	}
	// if (type === 9) {
	//   value = [dayjs(value[0]), dayjs(value)[1]];
	// }
	const props = {
		label: propsValue.categoryPropertyName,
		rules: [{required: propsValue.required ? true : false}],
		name: ['dynProps', 0, `${propsValue.categoryPropertyCode}`],
		initialValue: value,
		// ...otherProps,
	};
	return (
		<>
			{1 === type && (
				<Form.Item {...props}>
					<Input/>
				</Form.Item>
			)}
			{2 === type && (
				<Form.Item {...props}>
					<InputNumber/>
				</Form.Item>
			)}
			{3 === type && (
				<Form.Item {...props} initialValue={value}>
					<Radio.Group>
						{propertySelectValues?.map((item) => (
							<Radio key={item.valueId} value={`${item.valueId}`}>
								{item.value}
							</Radio>
						))}
					</Radio.Group>
				</Form.Item>
			)}
			{4 === type && (
				<Form.Item {...props}>
					<Checkbox.Group>
						{propertySelectValues?.map((item) => (
							<Checkbox key={item.valueId} value={`${item.valueId}`}>
								{item.value}
							</Checkbox>
						))}
					</Checkbox.Group>
				</Form.Item>
			)}
			{5 === type && (
				<Form.Item {...props}>
					<Select>
						{propertySelectValues?.map((item) => (
							<Select.Option key={item.valueId} value={`${item.valueId}`}>
								{item.value}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
			)}
			{6 === type && (
				<Form.Item {...props}>
					<Select mode="tags">
						{propertySelectValues?.map((item) => (
							<Select.Option key={item.valueId} value={`${item.valueId}`}>
								{item.value}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
			)}
			{7 === type && (
				<Form.Item {...props}>
					<InputRange/>
				</Form.Item>
			)}
			{8 === type && (
				<Form.Item {...props}>
					<DatePicker/>
				</Form.Item>
			)}
			{/* {9 === type && (
        <Form.Item {...props}>
          <DatePicker.RangePicker />
        </Form.Item>
      )} */}
		</>
	);
};
const InputRange = React.forwardRef(({value = [], onChange}: any) => {
	let [minValue, setMin] = useState(value?.[0]);
	let [maxValue, setMax] = useState(value?.[1]);

	// useEffect(() => {
	//   console.log(value);
	//   setMin(value[0] ? value[0] : '');
	//   setMax(value[1] ? value[1] : '');
	// }, [value]);

	return (
		<>
			<InputNumber
				placeholder="最小值"
				onChange={(v: any) => {
					setMin(v);
					onChange?.([v, maxValue]);
				}}
				value={minValue}
			/>
			&nbsp;<span>-</span>&nbsp;
			<InputNumber
				placeholder="最大值"
				onChange={(v: any) => {
					setMax(v);
					onChange?.([minValue, v]);
				}}
				value={maxValue}
			/>
		</>
	);
});
