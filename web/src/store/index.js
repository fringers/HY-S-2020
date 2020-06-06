import Vue from 'vue'
import Vuex from 'vuex'
import { i18n } from '@/locales/index';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lang: 'EN',
    country: 'PL',
    location: null,
    toolbarTitle: '',
    categories: [],
    PL: [],
    CS: [],
    PLData: [],
  },
  mutations: {
    setLang(state, lang) {
      i18n.locale = lang;
      state.lang = lang;
    },
    setCountry(state, country) {
      state.country = country;
    },
    setLocation(state, location) {
      state.location = location;
    },
    setToolbarTitle(state, title) {
      state.toolbarTitle = title;
    },
    setCategories(state, categories) {
      state.categories = categories;
    },
    setPL(state, PL) {
      state.PL = PL;
    },
    setCS(state, CS) {
      state.CS = CS;
    },
    setPLData(state, PLData) {
      state.PLData = PLData;
    },
  }
})
