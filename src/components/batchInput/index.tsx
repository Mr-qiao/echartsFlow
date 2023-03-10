import {Col, Input, Popover, Row} from "antd";

const {TextArea} = Input;


function BatchInput(props: any) {
	const {onChange, value} = props
	return (
		<div>
			<Row>
				<Col span={17}>
					<Input placeholder={'请输入'} onChange={e => {
						const val = e.target.value
						onChange(val)
					}} value={value}/>
				</Col>
				<Col span={6} offset={1}><Popover
					title={false}
					placement="bottom"
					content={
						<TextArea
							style={{height: 200}}
							value={value}
							onChange={e => {
								const val = e.target.value
								onChange(val)
							}
							}
							placeholder={'批量输入，用逗号分割'}
						/>
					}
				>
					<a href="#">批量添加</a>
				</Popover></Col>
			</Row>
		</div>
	)
}


export default BatchInput