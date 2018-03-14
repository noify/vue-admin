import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/views/login')), 'login') // 登录

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/login', name: 'login', component: login },
    { path: '/', redirect: '/login' }
  ]
})