import Vue from 'vue'
import Vuex from 'vuex'
import services from './services'

Vue.use(Vuex)

const state = {
  services,
  base_url: process.env.VUE_APP_SERVICE_URL,
}

export default new Vuex.Store({
  state,
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
