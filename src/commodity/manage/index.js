import React, { useReducer, useState, useCallback, useRef, useMemo } from 'react'
import {Table, Button, Space} from "antd";
import moment from 'moment'
import Header from "./components/Header";
import EditModal from "./components/EditModal";
import {webTypes, serveVersionTypes} from './constants'
import {getUuid} from "./uitls";

function formatTime(time) {
	return time ? moment(time).format('YYYY-MM-DD HH:mm:ss') : '-'
}

const dataSource = [{
	id: getUuid(),
	name: 'test1',
	webType: '1',
	createTime: 1608189872000,
	serveVersions: [{
		version: '1',
		duration: 6
	}, {
		version: '3',
		duration: 24
	}],
}, {
	id: getUuid(),
	name: 'test2',
	webType: '1',
	serveVersions: [{
		version: '1',
		duration: 12
	}],
	createTime: 1608273120000
}, {
	id: getUuid(),
	name: 'test3',
	webType: '2',
	serveVersions: [{
		version: '1',
		duration: 6
	}],
	createTime: 1608362640000
}]

const commodityReducer = (state, action) => {
	const { type, data } = action;
	let dataIndex = 0, _data = null
	if (data) {
		_data = state.find((item, index) => {
			const isFind = item.id === data.id;
			if (isFind) {
				dataIndex = index;
			}
			return isFind;
		})
	}
	switch (type) {
		case 'add':
			data.id = getUuid();
			data.createTime = (new Date()).getTime();
			state.push(data);
			break
		case 'delete':
			if (_data) {
				state.splice(dataIndex, 1)
			}
			break
		case 'edit':
			state[dataIndex] = data
			break;
	}
	return [...state]
}

const CommodityManage = (props) => {

	const [commodities, commodityDispatch] = useReducer(commodityReducer, dataSource)

	const [editModalType, setEditModalType] = useState('hide')

	const handleAdd = useCallback(() => {
		setEditModalType('add')
	}, [])

	const editCommodity = useRef(null);


	const tableColumns = useMemo(() => {
		return [{
			title: '商品名称',
			dataIndex: 'name'
		}, {
			title: '网站类型',
			dataIndex: 'webType',
			render: (webType) => {
				const _webType = webTypes.find(item => item.value === webType);
				return _webType ? _webType.label : '_'
			}
		}, {
			title: '服务版本',
			dataIndex: 'serveVersions',
			render: (serveVersions, record) => {
				let _serviceVersionLabels = [];
				serveVersions.forEach(item => {
					const serviceVersion = serveVersionTypes.find(versionType => versionType.value === item.version);
					if (serviceVersion) {
						_serviceVersionLabels.push(serviceVersion.label)
					}
				})
				return _serviceVersionLabels.join(',')
			}
		}, {
			title: '创建时间',
			dataIndex: 'createTime',
			render: formatTime
		}, {
			title: '操作',
			key: 'actions',
			render: (text, record) => {
				return (
					<Space>
						<a
							role="button"
							onClick={() => {
								setEditModalType('edit');
								editCommodity.current = record;
							}}
						>编辑</a>
						<a
							role="button"
							onClick={() => {
								commodityDispatch({
									type: 'delete',
									data: record
								})
							}}
						>删除</a>
					</Space>
				)
			}
		}]
	}, [])

	const [search, setSearch] = useState({
		name: '',
		createTimeSpace: null,
		versions: []
	})

	const handleSearch = useCallback((searchData) => {
		setSearch(searchData)
	}, [])

	const _dataSource = useMemo(() => {
		const { name, createTimeSpace, versions  } = search;
		if (name || createTimeSpace || versions.length > 0) {
			return commodities.filter(item => {

				let isName = !name || item.name === name;
				let isInTimeSpace = true;
				if (createTimeSpace) {
					const [start, end] = createTimeSpace;
					isInTimeSpace = item.createTime >= start.valueOf() && item.createTime <= end.valueOf()
				}
				let isInVersions = true;
				if (versions.length > 0) {
					isInVersions = !!item.serveVersions.find(item => {
						return versions.includes(item.version)
					})
				}
				return isName && isInTimeSpace && isInVersions
			})
		}else {
			return commodities
		}

	}, [commodities, search])

	return (
		<div>
			<Header onSearch={handleSearch}/>

			<div style={{padding: '16px 24px'}}>
				<div style={{marginBottom: '10px'}}>
					<Button type="dashed" onClick={handleAdd}>
						+ 新增商品
					</Button>
				</div>

				<Table
					rowKey="id"
					columns={tableColumns}
					dataSource={_dataSource}
				/>
			</div>

			<EditModal
				type={editModalType}
				data={editCommodity.current}
				onCancel={() => {
					setEditModalType('hide');
					editCommodity.current = null
				}}
				onOk={(data) => {
					commodityDispatch({
						type: editModalType,
						data
					})
				}}
			/>

		</div>
	)
}


export default CommodityManage
