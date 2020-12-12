import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//自定义
import cache from '@/utils/cache'
import i18n from '@/language' // 国际化
// 第三方
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' //element-ui的css
import 'normalize.css/normalize.css'//css样式初始化
import VueProgressBar from 'vue-progressbar' // 进度条

//项目资源
import '@/icons' // icon
//权限管理
import '@/permission' // permission control
//全局css
import '@/styles/index.less'
//注册全局过滤器
import * as filters from '@/filters'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.use(Element, {
  size: cache.getCookie('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(VueProgressBar)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
