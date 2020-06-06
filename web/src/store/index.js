import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lang: 'PL',
    PL: null,
  },
  mutations: {
    setLang(state, lang) {
      state.lang = lang;
    },
    setPL(state, PL) {
      state.PL = PL;
    },
  }
})
