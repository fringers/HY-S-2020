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
    SK: [],
    data: {
      PL: [],
      CS: [],
      SK: [],
    },
    notification: null,
    categoryChangeHighlight: [],
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
    setSK(state, SK) {
      state.SK = SK;
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
    clearNotifications(state) {
      state.notification = null;
    },
    addNotification(state, notification) {
      console.log("Message received. ", notification);
      state.notification = notification;

      if (notification.name && notification.name.startsWith('PL-change-cat-')) {
        const id = notification.name[notification.name.length - 1];
        Vue.set(state.categoryChangeHighlight, Number(id),  true);
      }
    },
    clearCategoryChangeHighlight(state, categoryId) {
      Vue.set(state.categoryChangeHighlight, categoryId,  false);
    }
  }
})
