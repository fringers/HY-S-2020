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
    data: {
      PL: [],
      CS: [],
      SK: [],
    }
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
      if (state.location && state.location.timestamp > location.timestamp) {
        return;
      }

      if (!state.location || (
        state.location.country !== location.country
        && location.country !== state.country
      )) {
        state.country = location.country;
      }
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
      state.data.PL = PLData;
    },
    setCSData(state, CSData) {
      state.data.CS = CSData;
    },
    setSKData(state, SKData) {
      state.data.SK = SKData;
    },
  }
})
