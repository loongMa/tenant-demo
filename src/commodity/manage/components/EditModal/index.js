import React, { useState, useEffect, useCallback } from 'react'
import {Modal, Row, Col, Form, Input, Select, Card, Space} from 'antd';
import {webTypes, serveVersionTypes} from "../../constants";

const EditModal = (props) => {
	const { type, onCancel, data, onOk } = props;
	const [modalVisible, setModalVisible] = useState(false);

	const [form] = Form.useForm();

	useEffect(() => {
		setModalVisible(type !== 'hide')
	}, [type])

	useEffect(() => {
		if (data) {
			const { name, webType, serveVersions } = data
			let fieldsValue = {
				name, webType,
				serveVersionDurations: serveVersions
			}
			fieldsValue.serveVersions = serveVersions.map(item => {
				return item.version
			})
			form.setFieldsValue(fieldsValue);
		}
	}, [data])


	const handleServeVersionsChange = useCallback((values) => {
		const _serveVersionDurations = form.getFieldValue('serveVersionDurations');
		form.setFieldsValue({
			serveVersionDurations: values.map(item => {
				const duration = _serveVersionDurations.find(duration => duration.version === item);
				return duration || { version: item, duration: '' }
			})
		})
	}, [])

	const handleCancel = useCallback(() => {
		form.resetFields()
		onCancel && onCancel();
	}, [])

	const handleOk = useCallback(async () => {
		const formData = await form.validateFields();
		const { name, webType, serveVersionDurations } = formData;
		onOk({
			id: data ? data.id : '',
			createTime: data ? data.createTime : '',
			name,
			webType,
			serveVersions: serveVersionDurations
		});
		handleCancel()
	}, [data, type])

	return (
		<Modal
			title="新增/编辑商品"
			visible={modalVisible}
			onCancel={handleCancel}
			onOk={handleOk}
			width={800}
		>
			<Form
				layout="vertical"
				form={form}
				initialValues={{
					name: '',
					webTypes: '',
					serveVersions: [],
					serveVersionDurations: []
				}}
			>
				<Row>
					<Col span={7}>
						<Form.Item
							label="商品名称"
							name='name'
						>
							<Input
								placeholder={'请输入商品名称'}
							/>
						</Form.Item>
					</Col>

					<Col span={7} offset={1}>
						<Form.Item label="网站类型" name='webType'>
							<Select
								placeholder={'请选择网站类型'}
								options={webTypes}
							/>
						</Form.Item>
					</Col>

					<Col span={8} offset={1}>
						<Form.Item
							label="服务版本"
							name="serveVersions"
						>
							<Select
								mode="multiple"
								options={serveVersionTypes}
								onChange={handleServeVersionsChange}
							/>
						</Form.Item>
					</Col>
				</Row>

				<Form.List name="serveVersionDurations">
					{(fields) => {
						return fields.map((field, index )=> {
							const serveVersion = form.getFieldValue('serveVersions')[field.fieldKey];
							const { label, durations } = serveVersionTypes.find(item => item.value === serveVersion);
							return (
								<Card
									title={label}
									style={{width: 350, marginBottom: 10}}
									key={index}
								>
									<Form.Item
										{...field}
										label="购买时长"
										name={[field.name, 'duration']}
										fieldKey={[field.fieldKey, 'duration']}
										style={{marginBottom: 0}}
									>
										<Select
											options={durations.map((duration) => {
												const year = parseInt(duration / 12);
												const mon = duration % 12
												return {
													value: duration,
													label: `${year ? `${year}年` : ''}${mon ?  `${mon}月` : ''}`
												}
											})}
										/>
									</Form.Item>
								</Card>
							)
						})
					}}
				</Form.List>

			</Form>

		</Modal>
	)

}


export default EditModal
