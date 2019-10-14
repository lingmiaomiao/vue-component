module.exports={
  productionSourceMap: false,
  lintOnSave: process.env.NODE_ENV !== 'production', //禁用 eslint
  devServer: {
    port: '8080', // 端口号  '0.0.0.0'=>有线上网址，自动获取本地IP
    host: 'localhost',
    https:false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
    // proxy:'http://122.112.243.38:8891/',   //生产环境
    proxy:'http://192.168.31.13:8082/',   //本地环境
  },
}