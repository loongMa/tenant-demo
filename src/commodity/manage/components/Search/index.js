import React, { useCallback } from 'react'
import {Row, Col, Form, Input, Select, DatePicker, Button} from "antd";

import { serveVersionTypes } from "../../constants";

const { RangePicker } = DatePicker;

const Search = ({onSearch}) => {
	const [form] = Form.useForm()

	const handleSearch = useCallback(() => {
		onSearch(form.getFieldsValue())
	}, [])

	return (
		<Form
			layout="vertical"
			form={form}
			initialValues={{
				name: '',
				createTimeSpace: null,
				versions: []
			}}
		>
			<Row>
				<Col span={6} >
					<Form.Item  label="商品名称" name="name">
						<Input placeholder="请输入商品名称"/>
					</Form.Item>
				</Col>

				<Col span={6} offset={1}>
					<Form.Item label="创建日期" name="createTimeSpace">
						<RangePicker style={{width: '100%'}}/>
					</Form.Item>
				</Col>

				<Col span={6} offset={1}>
					<Form.Item  label="服务版本" name="versions">
						<Select
							mode="multiple"
							placeholder="请选择服务版本"
							options={serveVersionTypes}
						/>
					</Form.Item>
				</Col>

				<Col offset={1} span={2}>
					<Form.Item label={' '}>
						<Button type="primary" onClick={handleSearch}>查询</Button>
					</Form.Item>
				</Col>
			</Row>
		</Form>
	)
}

export default Search
