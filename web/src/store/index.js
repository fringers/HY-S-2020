import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lang: 'PL',
    country: 'PL',
    toolbarTitle: '',
    PL: null,
    CS: null,
  },
  mutations: {
    setLang(state, lang) {
      state.lang = lang;
    },
    setCountry(state, country) {
      state.country = country;
    },
    setToolbarTitle(state, title) {
      state.toolbarTitle = title;
    },
    setPL(state, PL) {
      state.PL = PL;
    },
    setCS(state, CS) {
      state.CS = CS;
    },
  }
})
