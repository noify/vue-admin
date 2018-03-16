import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/views/login')), 'login') // 登录
const layout = r => require.ensure([], () => r(require('@/views/layout')), 'layout') // 布局
const dashboard = r => require.ensure([], () => r(require('@/views/dashboard')), 'dashboard') // 首页
const vTable = r => require.ensure([], () => r(require('@/views/vTable')), 'vTable') // 表格
const vForm = r => require.ensure([], () => r(require('@/views/vForm')), 'vForm') // 表单

const elelayout = r => require.ensure([], () => r(require('@/views/element/layout')), 'elelayout') // 布局
const elecontainer = r => require.ensure([], () => r(require('@/views/element/container')), 'elecontainer') // 布局容器
const elebutton = r => require.ensure([], () => r(require('@/views/element/button')), 'elebutton') // 按钮

const layoutChildren = [
  { path: '/dashboard', name: 'dashboard', component: dashboard },
  { path: '/vForm', name: 'vForm', component: vForm },
  { path: '/vTable', name: 'vTable', component: vTable },
  { path: '/elelayout', name: 'elelayout', component: elelayout },
  { path: '/elecontainer', name: 'elecontainer', component: elecontainer },
  { path: '/elebutton', name: 'elebutton', component: elebutton },
]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/layout', name: 'layout', component: layout, children: layoutChildren },
    { path: '/login', name: 'login', component: login },
    { path: '/', redirect: '/login' }
  ]
})