import React from 'react'
import {Card,Rate,Spin,Pagination} from 'antd'
const {Meta} = Card



export default class MovieList extends React.Component{
  constructor(props){
    super(props)
    console.log(props)
    
    this.movieType =  props.match.params.movieType || 'in_theaters'
    this.page = props.match.params.page

    //初始状态
    this.state = {
      isLoading:false,
      subjects:[],
      total:''
    }
    
  }

  // 页面插入DOM前执行
  componentWillMount(){
    this.fetchMovieData()
  }

  // 页码改变的回调
  pageChange(page){
    this.page = page
    this.fetchMovieData()
    this.props.history.push(`/movie/${this.movieType}/${page}`)
  }

  // 请求数据
  fetchMovieData(){
    // 请求前出现加载状态
    this.setState({
      isLoading:true
    })

    //每页个数
    const count = 12
    // 开始位置
    const start = (this.page-1)*count

    var _this = this
    //发送请求
    fetch(`/api/movie/${this.movieType}?start=${start}&count=${count}`)
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
      _this.setState({
        subjects:data.subjects,
        isLoading:false,
        total:Math.ceil(data.total/count)*10
      })
    })
  }

  //props发生改变时调用
  componentWillReceiveProps(nextProps){
    this.movieType =  nextProps.match.params.movieType
    this.page = nextProps.match.params.page
    this.fetchMovieData()
  }

  //点击进入详情页
  goMovieDetail(id){
    this.props.history.push(`/movie/detail/${id}`)
  }

  //渲染
  render(){
    return (
      this.state.isLoading==true?(<div style={styles.centerStyle}><Spin size="large" /></div>):(
        <div>
          <div>
            { this.state.subjects.map((item,index)=>{
                return (
                  <Card style={styles.cardStyle} key={index} onClick={()=>{this.goMovieDetail(item.id)}}> 
                  <div>
                    <img src={item.images.small}  style={styles.imgStyle}/>
                  </div>
                  <div>
                    <h3>{item.title}</h3>
                    <p>电影类型：{item.genres.join("、")}</p>
                    <Rate disabled defaultValue={1*item.rating.stars/10} />
                  </div>
                </Card>
                )
              })
            }
          </div>
          <div style={styles.clearStyle}></div>
          <Pagination defaultCurrent={1} current={1*this.page} total={this.state.total} onChange={(page)=>{this.pageChange(page)}}/>
        </div>
      )
    )
  }
}

const styles = {
  centerStyle:{
    textAlign:'center'
  },

  imgStyle:{
    height:300,
    width:200
  },
  cardStyle:{
    float:'left',
    marginRight:10,
    marginBottom:10,
    cursor:'pointer'
  },
  clearStyle:{
    clear:'both'
  }
}