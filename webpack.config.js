var path = require("path")

var htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // 1.entry 入口 打包什么文件
  entry:path.join(__dirname,'./src/js/main.js'),
  // 2.output 出口 打包到哪里
  output:{
    path:path.join(__dirname,'./dist'),
    filename:'bundle.js'
  },
  // 3.loader 加载器 主要处理非.js文件
  module:{
    rules:[
      // .js
      {test:/\.js$/,use:['babel-loader'],exclude:/node_modules/},
      // css
      {test:/\.css$/,use:['style-loader','css-loader']},
      // jpg/png
      {test:/\.(jpg|png)$/,use:['url-loader']}
    ]
  },
  // 4. plugins插件 处理内存 压缩 抽离
  plugins:[
    new htmlWebpackPlugin({
      template:path.join(__dirname,'./src/index.html'),
      filename:'index.html'
    })
  ],

  // webpack 的代理
  devServer:{
    proxy:{
      '/api':{
        target:'https://api.douban.com/v2',
        // https请求次设置
        secure:false,
        // 必须设置该项
        changeOrigin:true,
        // '/api/movie/in_theaters'路径重写为：'/movie/in_theaters'
        pathRewrite:{"^/api":""}
      }
    }
  }
}