import Vue from 'vue'
import Vuex from 'vuex'
import { i18n } from '@/locales/index';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lang: 'EN',
    country: 'PL',
    toolbarTitle: '',
    PL: null,
    CS: null,
  },
  mutations: {
    setLang(state, lang) {
      i18n.locale = lang;
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
