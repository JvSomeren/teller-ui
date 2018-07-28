import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import counter from './modules/counter'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
    counter
  }
});

store.dispatch('auth/init');

export default store;
