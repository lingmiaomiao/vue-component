module.exports={
  productionSourceMap: false,
  lintOnSave: process.env.NODE_ENV !== 'production', //禁用 eslint
  devServer: {
    port: 8080, // 端口号
    host: 'localhost',
    https:false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
    proxy:'http://locakhost:8082',
  },
}