import Vue from 'vue';
import VueI18n from 'vue-i18n';

import zh from './zh.yaml';
import en from './en.yaml';

Vue.use(VueI18n);
const messages = { en, zh };

export default new VueI18n({
  locale: 'zh',
  messages
})