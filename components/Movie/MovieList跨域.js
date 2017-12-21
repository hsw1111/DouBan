import React from 'react'
import fetchJsonp from 'fetch-jsonp'

// 导出组件
export default class MovieList extends React.Component{
  constructor(props){
    super(props)
    console.warn(props.match.params.movieType)

    this.state = {
      subjects:[]
    }
    // 1.拼接url路径,发送请求
    // 2.解析数据，保存
    // 3.setState()重新渲染页面

    // 问题
    //1.发送请求：fetch().then().then().catch()
    //2.跨域问题
        //1.webpack-dev-server的代理 proxy dev-server
        // 使用场景：get/post
        // fetch().then().then()

        //2.JSONP  -->安装fetch-jsonp
        // fetchJsonp('url).then().then()
        //使用场景：get

        //3.CORS
        // 需要服务器配合
        // res.header("Access-Control-Allow-Origin", "*")

    // https://api.douban.com/v2/movie/in_theaters
    var _this = this
    // 方法一：代理
    fetch('/api/movie/in_theaters')
    .then(res=>res.json())
    .then(function(data){
      console.log(data)
      _this.setState({
        subjects:data.subjects
      })
    })

  }

  

  render(){
    return (
      <div>
        <h1>电影列表</h1>
        {this.state.subjects.map((item,index)=>{
          return <h2 key={index}>{index + "." + item.title}</h2>
        })}
      </div>
    )
  }

}

