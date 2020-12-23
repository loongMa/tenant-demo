import React from 'react'
import { PageHeader } from 'antd'
import Search from "../Search";

const Header = ({onSearch}) => {
	return (
		<PageHeader
			backIcon={false}
			title="商品管理"
		>
			<Search
				onSearch={onSearch}
			/>
		</PageHeader>
	)
}

export default Header
