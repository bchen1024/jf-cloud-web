import Vue from 'vue'
import Vuex from 'vuex'

import currentStore from './modules/currentStore'
import menuStore from './modules/menuStore'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    
  },
  mutations: {
    
  },
  actions: {
    
  },
  modules: {
    menuStore,
    currentStore
  }
});