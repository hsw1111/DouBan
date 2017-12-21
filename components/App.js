import React from 'react'
import '../src/css/app.css'
// 导入组件
import HomeContainer from './Home/HomeContainer'
import MovieContainer from './Movie/MovieContainer'
import AboutContainer from './About/AboutContainer'
import {
        HashRouter as Router,
        Route,
        Link
      } from 'react-router-dom'

import { Layout, Menu} from 'antd'
const { Header, Content, Footer } = Layout


// 创建并导出组件
export default class App extends React.Component {
  constructor(props){
    super(props)
    const arr = ['/','/movie','/about']
    var hash = '/' + location.hash.split("/")[1]
    var num = arr.indexOf(hash)+1
    num = num > 0 ? num : 1
    this.key = num + ''
  }

  render(){
    return (
      <Router>
        <Layout className="layout">
          <Header>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1"><Link to="/">首页</Link></Menu.Item>
              <Menu.Item key="2"><Link to="/movie/in_theaters/1">电影列表</Link></Menu.Item>
              <Menu.Item key="3"><Link to="/about">关于</Link></Menu.Item>
            </Menu>
          </Header>
          <Content>
            <div style={{ background: '#fff', padding: 25, minHeight: 580 }}>
              <Route exact path='/' component={HomeContainer}></Route>
              <Route path='/movie' component={MovieContainer}></Route>
              <Route path='/about' component={AboutContainer}></Route>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>
      </Router>
    )
  }
}
