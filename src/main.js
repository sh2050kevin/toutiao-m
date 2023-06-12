import Vue from 'vue'
import Vant from 'vant'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.css'
import 'vant/lib/index.css'
import 'amfe-flexible'

Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
