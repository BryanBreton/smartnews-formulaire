import Vue from 'vue'
import Vuex from 'vuex'
import formulairesStore from './Formulaires/formulaires.modules'
Vue.use(Vuex)

const Store = new Vuex.Store({
  modules: {formulairesStore}
})

export default Store
