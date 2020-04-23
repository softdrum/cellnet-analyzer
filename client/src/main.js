import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import messagePlugin from './plugins/message.plugin'
import dateFilter from './utils/filters/date.filter'

import VueApexCharts from 'vue-apexcharts'
Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(messagePlugin)
Vue.filter('date', dateFilter)
Vue.component('apexchart', VueApexCharts)
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
