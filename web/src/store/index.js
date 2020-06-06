import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lang: 'PL',
    toolbarTitle: '',
    PL: null,
  },
  mutations: {
    setLang(state, lang) {
      state.lang = lang;
    },
    setToolbarTitle(state, title) {
      state.toolbarTitle = title;
    },
    setPL(state, PL) {
      state.PL = PL;
    },
  }
})
