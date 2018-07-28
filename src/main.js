import Vue from 'vue'
import VueSocketio from 'vue-socket.io-extended'
import $socket from './socket-instance'

import router from './route'
import store from './store'
import App from './App.vue'

import PageContent from './components/PageContent.vue'

import './assets/css/base.scss'

Vue.component('page-content', PageContent);

Vue.use(VueSocketio, $socket, { store });

let Teller = Vue.component('app', App);

Teller = new Teller({
  el: '#app',
  router,
  store
});
