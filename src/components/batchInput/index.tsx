import {Col, Input, Popover, Row} from 'antd';
import './index.less';
import _ from "lodash";

const {TextArea} = Input;

function BatchInput(props: any) {
	const {onChange, value} = props;
	return (
		<div className={'batch-input'}>
			<Row className={'batch-input-row'}>
				<Col span={18}>
					<Input
						placeholder={'请输入'}
						onChange={(e) => {
							const val = e.target.value;
							onChange(val);
						}}
						value={value}
					/>
				</Col>
				<Col span={6}>
					<Popover
						title={false}
						trigger="click"
						placement="bottom"
						content={
							<TextArea
								style={{height: 200}}
								value={value}
								onKeyPress={(e: any) => {
									if (e.code === 'Enter') {
										e.stopPropagation()
									}
								}}
								onChange={(e) => {
									let val = _.trim(e.target.value, '↵');
									val = val.replace(/[\r\n]/g, ""); //去掉回车换行
									onChange(val);
								}}
								placeholder={'批量输入，用逗号分割'}
							/>
						}
					>
						<a>批量添加</a>
					</Popover>
				</Col>
			</Row>
		</div>
	);
}

export default BatchInput;
