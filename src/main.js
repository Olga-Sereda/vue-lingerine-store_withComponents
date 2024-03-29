import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store' //подключаем юиюилиотеку к нашему прилодению vue

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
