import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import messagePlugin from './plugins/message.plugin'
import dateFilter from './utils/filters/date.filter'
import VueApexCharts from 'vue-apexcharts'
import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';
 
const socket = io('http://192.168.0.243:8081');
 
Vue.use(VueSocketIOExt, socket, { store });
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
