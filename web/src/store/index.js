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
    HU: [],
    data: {
      PL: [],
      CS: [],
      SK: [],
      HU: [],
    },
    notification: null,
    categoryChangeHighlight: [],
  },
  actions: {
    locationUpdate ({ state, commit, dispatch }, location) {
      if (state.location && state.location.timestamp > location.timestamp) {
        return;
      }

      if (!state.location || (
        state.location.country !== location.country
        && location.country !== state.country
      )) {
        if (state.location) {
          dispatch('processNotification', {
            id: Date.now(),
            type: 'location-country-change',
            country: location.country
          });
        }

        commit('setCountry', location.country);
      }

      commit('setLocation', location);
    },
    processNotification ({ commit }, notification) {
      if (notification.type === 'change-cat') {
        const id = notification.categoryId;
        commit('addCategoryChangeHighlight', Number(id));

        notification.title = i18n.t('notifications.changeCat.title');
        notification.body = i18n.t('notifications.changeCat.text.' + notification.country);
      } else if (notification.type === 'location-country-change') {
        notification.title = i18n.t('notifications.locationCountryChange.title');
        notification.body = i18n.t('notifications.locationCountryChange.text.' + notification.country);
      }

      if (notification.title && notification.body) {
        commit('addNotification', notification);
      }
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
    setHU(state, HU) {
      state.HU = HU;
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
    setHUData(state, HUData) {
      state.data.HU = HUData;
    },
    clearNotifications(state) {
      state.notification = null;
    },
    addNotification(state, notification) {
      state.notification = notification;
    },
    addCategoryChangeHighlight(state, categoryId) {
      Vue.set(state.categoryChangeHighlight, categoryId,  true);
    },
    clearCategoryChangeHighlight(state, categoryId) {
      Vue.set(state.categoryChangeHighlight, categoryId,  false);
    }
  }
})
