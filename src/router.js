import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home'
Vue.use(Router)
import MapCom from './components/echarts/map'

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
       }] 
    }
  ]
})
