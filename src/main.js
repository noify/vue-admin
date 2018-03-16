import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

let adminConfig = {
  title: '后台管理系统',
  version: 'v0.0.1'
}

Vue.use(ElementUI);

Vue.config.productionTip = true

Vue.prototype.$adminConfig = adminConfig

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
