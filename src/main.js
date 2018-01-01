// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import Icon from 'vue-svg-icon/Icon.vue'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import VueSimplemde from 'vue-simplemde'
/* eslint-disable */
import $ from 'jquery'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.component('icon', Icon)
Vue.use(VueSimplemde)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
