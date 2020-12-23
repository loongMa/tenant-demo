import React from 'react';
import {render} from 'react-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import CommodityManage from "./commodity/manage";

import 'antd/dist/antd.css'

moment.locale('zh-cn')

const App = () => {
 return (
 	  <ConfigProvider locale={zhCN}>
     <CommodityManage/>
    </ConfigProvider>
 )
}

render(<App/>, document.getElementById('app'))
