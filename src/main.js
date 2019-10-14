import Vue from 'vue'
import './plugins/vuetify'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import '../static/css/base.less';

//引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts;
Vue.use(echarts);

//引入element 用其message
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//引入vuetify
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
Vue.use(Vuetify)

//confirm
import confirm from './public/confirm/confirm'
Vue.prototype.$confirm = confirm;
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
