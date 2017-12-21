import React from 'react'
import {Spin,Button} from 'antd'


export default class MovieDetail extends React.Component{
  constructor(props){
    super(props)
    console.log(props)
    this.id = this.props.match.params.id
    this.state = {
      details:{},
      imgUrl:'',
      casts:[],
      isLoading:false
    }
  }
  componentWillMount(){
    this.fetchDetailData(this.id)
  }

  // 查询数据
  fetchDetailData(id){
    this.setState({
      isLoading:true
    })
    var _this = this
    fetch(`/api/movie/subject/${id}`)
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
      _this.setState({
        details:data,
        imgUrl:data.images.small,
        casts:data.casts,
        isLoading:false
      })
      console.log(data.images.small)
    })
  }

  //点击按钮返回上一页
  goBack(){
    this.props.history.goBack()
  }

  render(){
    return (
      this.state.isLoading==true?(<div style={styles.centerStyle}><Spin size="large" /></div>):
      <div>
        <Button type="primary" onClick={()=>{this.goBack()}}>返回</Button>
        <h1 style={styles.centerStyle}>{this.state.details.title}</h1>
        <img src={this.state.imgUrl} style={styles.imgStyle} />
        <p style={styles.pStyle}>主要演员</p>
          <div style={styles.divStyle}>
            {this.state.casts.map(item=>{
              return <span key={item.id}>{item.name}&nbsp;&nbsp;&nbsp;</span>
            })}
          </div>
        <p style={styles.pStyle}>剧情介绍</p>
        <div style={styles.divStyle}>{this.state.details.summary}</div>
      </div>
    )
  }
}

const styles = {
  divStyle:{
    position:'relative'
  },
  centerStyle:{
    textAlign:'center'
  },

  imgStyle:{
    margin:'0 auto',
    display:'block',
    marginBottom:40
  },
  divStyle:{
    marginBottom:40,
    textIndent:'2em'
  },
  pStyle:{
    fontWeight:700
  }
}