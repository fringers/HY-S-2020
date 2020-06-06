import Vue from 'vue'
import VueI18n from 'vue-i18n'

import en from './en';
import pl from './pl';
import cs from './cs';
import hu from './hu';
import sk from './sk';

const messages = {
  EN: en,
  PL: pl,
  CS: cs,
  HU: hu,
  SK: sk,
};


Vue.use(VueI18n);

export const i18n = new VueI18n({
  fallbackLocale: 'EN',
  locale: 'EN',
  messages,
});
