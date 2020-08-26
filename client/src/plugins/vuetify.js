import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '../assets/icons/style.css'
import colorSchemes from '../styles/colors.js'

Vue.use(Vuetify);


export default new Vuetify({
  theme: {
    themes: {
      ...colorSchemes
    },
  }
});
