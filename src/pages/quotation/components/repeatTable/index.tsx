import {Button, Row, Table} from "antd";
import './index.less'

function RepeatTable(props: any) {
	const {
		columns = [], dataSource = [], setData = () => {
		}
	} = props
	const updateData = () => {
		const newData = [...dataSource]
		newData.push({})
		setData(newData)
	}
	return (
		<div className={'repeat-table'}>
			{dataSource.length > 0 ?
				<Table
					size={'small'}
					scroll={{x: 900}}
					columns={columns}
					dataSource={dataSource}
					pagination={false}
				/> : null}
			<Row>
				<Button
					className={'repeat-table-btn'}
					type="dashed"
					onClick={updateData}
				>添加一条报价 +</Button>
			</Row>
		</div>

	)
}

export default RepeatTable

