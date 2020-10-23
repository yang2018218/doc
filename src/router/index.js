/**
 * 全站路由配置
 *
 * 建议:
 * 1. 代码中路由统一使用name属性跳转(不使用path属性)
 */
import Vue from 'vue'
import Router from 'vue-router'
import http from '@/utils/httpRequest'
import {isURL} from '@/utils/validate'
import {clearLoginInfo} from '@/utils'
import ycylmainproducttian from '../views/modules/ycyl/ycylmainproducttian'
import DoctorPerformance from '../views/modules/ycyl/DoctorPerformance' //医生的个人业绩详情
import userBuyPerformance from '@/views/modules/ycyl/userBuyPerformance'  //医生/专家自购单业绩
import ExpertDeta from '../views/modules/ycyl/ExpertDeta' //专家的个人业绩详情
import useragentnewage from '../views/modules/sys/useragent-new-age' //代理商业绩
import ycyldictdata from '../views/modules/ycyl/ycyldictdata'
import marketdynamicUedito from '../views/modules/marketdynamic/marketdynamicUedito'
import ycylmarketdynamicUeditor from '../views/modules/richText/ycylmarketdynamicUeditor'
import auditdoctorList from '../views/modules/auditdoctor/newadd-auditdoctor'
import everydoctorhelp from '../views/modules/doctorhelp/everydoctorhelp'
import agencypages from '../views/modules/agency/agencypages-add'
import servehelp from '../views/modules/servehelp/servehelp'
import servepath from '../views/modules/servemanage/servemanage-main-particulars-add'
import ycylServeHelp from '../views/modules/servehelp/servehelp-add'
import miandan from './../views/modules/ycyl/MianDan'
import doctorVideo from '../views/modules/ycylDoctor/doctorVideo'
import doctorVideoOrer from '../views/modules/ycylDoctor/doctorVideoOrer'
import expertVideo from '../views/modules/ycylExpert/expertVideo'
import expertVideoOrder from '../views/modules/ycylExpert/expertVideoOrder'
import getTicketLog from '../views/modules/ticket/getTicketLog/getTicketLog'
Vue.use(Router)

const _import = require('./import-' + process.env.NODE_ENV)

// 全局路由(无需嵌套上左右整体布局)
const globalRoutes = [
  {path: '/404', component: _import('common/404'), name: '404', meta: {title: '404未找到'}},
  {path: '/login', component: _import('common/login'), name: 'login', meta: {title: '登录'}}
]
// 主入口路由(需嵌套上左右整体布局)
const mainRoutes = {
  path: '/',
  component: _import('main'),
  name: 'main',
  redirect: {name: 'home'},
  meta: {title: '主入口整体布局'},
  children: [
    // 通过meta对象设置路由展示方式
    // 1. isTab: 是否通过tab展示内容, true: 是, false: 否
    // 2. iframeUrl: 是否通过iframe嵌套展示内容, '以http[s]://开头': 是, '': 否
    // 提示: 如需要通过iframe嵌套展示内容, 但不通过tab打开, 请自行创建组件使用iframe处理!
    {path: '/home', component: _import('common/home'), name: 'home', meta: {title: '首页'}},
    {path: '/theme', component: _import('common/theme'), name: 'theme', meta: {title: '主题'}},
    {
      path: '/demo-echarts',
      component: _import('demo/echarts'),
      name: 'demo-echarts',
      meta: {title: 'demo-echarts', isTab: true}
    },
    {
      path: '/demo-ueditor',
      component: _import('demo/ueditor'),
      name: 'demo-ueditor',
      meta: {title: 'demo-ueditor', isTab: true}
    },
    {path: '/producttian', component: ycylmainproducttian}, //代理商仓储详情
    {path: '/miandan', component: miandan}, //面单,
    {path: '/doctorPerformance', component: DoctorPerformance}, //医生个人业绩
    {path: '/userBuyPerformance', component: userBuyPerformance}, //医生/专家自购单业绩
    {path: '/expertDeta', component: ExpertDeta},
    {path: '/useragentnewage', component: useragentnewage}, //代理商业绩详情页
    {path: '/ycyl/ycyldictdata', component: ycyldictdata},
    {path: '/marketdynamicUedito', component: marketdynamicUedito},
    {path: '/ycylmarketdynamicUeditor', component: ycylmarketdynamicUeditor},
    {path: '/auditdoctorList', component: auditdoctorList}, //审核医生业绩
    {path: '/everydoctorhelp', component: everydoctorhelp}, //医助的详情页
    {path: '/agencypages', component: agencypages}, //服务者帮助

    {path: '/servepath', component: servepath}, //个人详情
    {path: '/ycylServeHelp', component: ycylServeHelp},//服务者帮助的富文本
    {path: '/doctorVideo', component: doctorVideo}, //医生视频业绩
    {path: '/doctorVideoOrer', component: doctorVideoOrer}, //医生视频单业绩
    {path: '/expertVideo', component: expertVideo}, //专家视频业绩
    {path: '/expertVideoOrder', component: expertVideoOrder}, //专家视频单业绩
    {path: '/getTicketLog', component: getTicketLog}, //代金券历史记录
  ],
  beforeEnter (to, from, next) {
    let token = sessionStorage.getItem('token')
    if (!token || !/\S/.test(token)) {
      clearLoginInfo()
      next({name: 'login'})
    }
    next()
  }
}

const router = new Router({
  mode: 'hash',
  scrollBehavior: () => ({y: 0}),
  isAddDynamicMenuRoutes: false, // 是否已经添加动态(菜单)路由
  routes: globalRoutes.concat(mainRoutes)
})

router.beforeEach((to, from, next) => {
  // 添加动态(菜单)路由
  // 1. 已经添加 or 全局路由, 直接访问
  // 2. 获取菜单列表, 添加并保存本地存储
  if (router.options.isAddDynamicMenuRoutes || fnCurrentRouteType(to, globalRoutes) === 'global') {
    next()
  } else {
    http({
      url: http.adornUrl('/sys/menu/nav'),
      method: 'get',

      params: http.adornParams()
    }).then(({data}) => {
      if (data && data.code === 0) {
        fnAddDynamicMenuRoutes(data.menuList)
        // console.log(data.menuList, '数据')
        router.options.isAddDynamicMenuRoutes = true
        sessionStorage.setItem('menuList', JSON.stringify(data.menuList || '[]'))
        sessionStorage.setItem('permissions', JSON.stringify(data.permissions || '[]'))
        next({...to, replace: true})
      } else {
        sessionStorage.setItem('menuList', '[]')
        sessionStorage.setItem('permissions', '[]')
        next()
      }
    }).catch((e) => {
      // console.log(`%c${e} 请求菜单列表和权限失败，跳转至登录页！！`, 'color:blue')
      router.push({name: 'login'})
    })
  }
})

/**
 * 判断当前路由类型, global: 全局路由, main: 主入口路由
 * @param {*} route 当前路由
 */
function fnCurrentRouteType (route, globalRoutes = []) {
  var temp = []
  for (var i = 0; i < globalRoutes.length; i++) {
    if (route.path === globalRoutes[i].path) {
      return 'global'
    } else if (globalRoutes[i].children && globalRoutes[i].children.length >= 1) {
      temp = temp.concat(globalRoutes[i].children)
    }
  }
  return temp.length >= 1 ? fnCurrentRouteType(route, temp) : 'main'
}

/**
 * 添加动态(菜单)路由
 * @param {*} menuList 菜单列表
 * @param {*} routes 递归创建的动态(菜单)路由
 */
function fnAddDynamicMenuRoutes (menuList = [], routes = []) {
  var temp = []
  for (var i = 0; i < menuList.length; i++) {
    if (menuList[i].list && menuList[i].list.length >= 1) {
      temp = temp.concat(menuList[i].list)
    } else if (menuList[i].url && /\S/.test(menuList[i].url)) {
      menuList[i].url = menuList[i].url.replace(/^\//, '')
      var route = {
        path: menuList[i].url.replace('/', '-'),
        component: null,
        name: menuList[i].url.replace('/', '-'),
        meta: {
          menuId: menuList[i].menuId,
          title: menuList[i].name,
          isDynamic: true,
          isTab: true,
          iframeUrl: ''
        }
      }
      // url以http[s]://开头, 通过iframe展示
      if (isURL(menuList[i].url)) {
        route['path'] = `i-${menuList[i].menuId}`
        route['name'] = `i-${menuList[i].menuId}`
        route['meta']['iframeUrl'] = menuList[i].url
      } else {
        try {
          route['component'] = _import(`modules/${menuList[i].url}`) || null
        } catch (e) {
        }
      }
      routes.push(route)
    }
  }
  if (temp.length >= 1) {
    fnAddDynamicMenuRoutes(temp, routes)
  } else {
    mainRoutes.name = 'main-dynamic'
    mainRoutes.children = routes
    router.addRoutes([
      mainRoutes,
      {path: '*', redirect: {name: '404'}}
    ])
    sessionStorage.setItem('dynamicMenuRoutes', JSON.stringify(mainRoutes.children || '[]'))
    // console.log('\n')
    // console.log('%c!<-------------------- 动态(菜单)路由 s -------------------->', 'color:blue')
    // console.log(mainRoutes.children)
    // console.log('%c!<-------------------- 动态(菜单)路由 e -------------------->', 'color:blue')
  }
}

export default router
