import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    adminConfig: {
      title: '后台管理系统', // 标题名称
      version: 'v0.0.1', // 版本号
      adminName: '管理员', // 管理员名
      menu:[ // 菜单
        { path:'/dashboard', title: '首页'},
        { path:'/vTable', title: '表格'},
        { path:'/vForm', title: '表单'},
        {
          title: '基础组件', children: [
            {path: '/elelayout', title: '布局'},
            {path: '/elecontainer', title: '布局容器'},
            {path: '/elebutton', title: '按钮'},
          ]
        }
      ]
    }
  },

  actions: {},

  mutations: {
    setAdminConfig: (state, { type, value }) => {
      console.log(type, value)
      state.adminConfig[type] = value
    },
  },

  getters: {}
})

export default store