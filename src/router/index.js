import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/views/login')), 'login') // 登录
const layout = r => require.ensure([], () => r(require('@/views/layout')), 'layout') // 布局
const dashboard = r => require.ensure([], () => r(require('@/views/dashboard')), 'dashboard') // 首页
const vTable = r => require.ensure([], () => r(require('@/views/vTable')), 'vTable') // 表格
const vForm = r => require.ensure([], () => r(require('@/views/vForm')), 'vForm') // 表单

const layoutChildren = [
  { path: '/vForm', name: 'vForm', title: '表单', component: vForm },
  { path: '/vTable', name: 'vTable', title: '表格', component: vTable },
  { path: '/dashboard', name: 'dashboard', title: '首页', component: dashboard }
]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/layout', name: 'layout', component: layout, children: layoutChildren },
    { path: '/login', name: 'login', component: login },
    { path: '/', redirect: '/login' }
  ]
})