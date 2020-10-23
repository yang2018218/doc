import Vue from 'vue'
import App from '@/App'
import router from '@/router' // api: https://github.com/vuejs/vue-router
import store from '@/store' // api: https://github.com/vuejs/vuex
import VueCookie from 'vue-cookie' // api: https://github.com/alfhen/vue-cookie
//import '@/element-ui' // api: https://github.com/ElemeFE/element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
import './assets/fontIcon/fontALiIcon/iconfont.css'
import JsonExcel from 'vue-json-excel'  //前端导表
import '@/icons' // api: http://www.iconfont.cn/
import '@/element-ui-theme'
import '@/assets/scss/index.scss'
import httpRequest from '@/utils/httpRequest' // api: https://github.com/axios/axios
import {isAuth} from '@/utils'
import cloneDeep from 'lodash/cloneDeep'
import './assets/scss/style.css'

console.log('main.js')
Vue.use(VueCookie)
Vue.config.productionTip = false
Vue.prototype.uploadurl = 'http://manage.xumutang999.com/ycyl-manage/sys/oss/uploadAll'
Vue.component('downloadExcel', JsonExcel)
// 非生产环境, 适配mockjs模拟数据                 // api: https://github.com/nuysoft/Mock
if (process.env.NODE_ENV !== 'production') {
  require('@/mock')
  Vue.prototype.uploadurl = 'http://manage.xumutang999.com/ycyl-manage/sys/oss/uploadAll'
}
// 挂载全局
Vue.prototype.$http = httpRequest // ajax请求方法
Vue.prototype.isAuth = isAuth // 权限方法
// 视频url过滤器
Vue.filter('videoHash', (val) => {
  var a = /,/g
  var img_url = ''
  if (a.test(val)) {

    img_url = val.split(',')[0]
  } else {
    img_url = val
  }
  return img_url
})

window.SITE_CONFIG['storeState'] = cloneDeep(store.state)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
