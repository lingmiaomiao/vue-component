import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home'
Vue.use(Router)
// echarts
import MapCom from './components/echarts/map'
import LineCom from './components/echarts/line'
import mapEchart from './components/echarts/map_echart'  //echart插件
// websocket
import SocketCom from './components/websocket/socket'
// function point(功能点)
import confirmsCom from './components/functionPoint/confirms'
import versionCom from './components/functionPoint/version'


export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'echarts组件',
      component:Home,
      hidden: false,
      redirect:'/echarts/map',
      children:[{
          path:'/echarts/map',
          name:'map组件',
          component:MapCom,
          hidden: false,
       },{
          path:'/echarts/line',
          name:'line折线图',
          component:LineCom,
          hidden: false,
       },{
         path:'/echarts/map_echart',
         name:'echart插件',
         component:mapEchart,
         hidden: false,
      }] 
    },
    {
      path: '/',
      name: 'websocket',
      component:Home,
      hidden: false,
      redirect:'/websocket/socket',
      children:[{
          path:'/websocket/socket',
          name:'socket监听数据变化',
          component:SocketCom,
          hidden: false,
       }] 
    },
    {
      path: '/',
      name: 'function point',
      component:Home,
      hidden: false,
      redirect:'/functionPoint/confirms',
      children:[{
          path:'/functionPoint/confirms',
          name:'comfirm',
          component:confirmsCom,
          hidden: false,
       },{
          path:'/functionPoint/version',
          name:'浏览器版本校验',
          component:versionCom,
          hidden: false,
       }] 
    }
  ]
})
