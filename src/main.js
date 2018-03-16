import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { get, post } from './util/http'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.config.productionTip = true

Vue.prototype.$get = get
Vue.prototype.$post = post

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
