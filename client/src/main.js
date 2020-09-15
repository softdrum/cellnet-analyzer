import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import messagePlugin from './plugins/message.plugin'
import dateFilter from './utils/filters/date.filter'


import vuetify from './plugins/vuetify';
import VueApexCharts from 'vue-apexcharts'
import VueMapbox from "vue-mapbox";
import Mapbox from "mapbox-gl";

import VueSocketIOExt from 'vue-socket.io-extended';

import Vuelidate from 'vuelidate'

import io from 'socket.io-client';

const socketIOURL = `http://${process.env.SOCKET_IO_HOST}:${process.env.SOCKET_IO_PORT}`;
const socket = io(socketIOURL);

Vue.use(VueSocketIOExt, socket, { store });
Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(messagePlugin)
Vue.filter('date', dateFilter)
Vue.component('apexchart', VueApexCharts)
Vue.use(VueMapbox, { mapboxgl: Mapbox });


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
