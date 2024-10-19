import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import commonEn from './resources/commonEn.json';
import commonDe from './resources/commonDe.json';
import navigationEn from './resources/navigationEn.json';
import navigationDe from './resources/navigationDe.json';

const resources = {
  en: {
    common: commonEn,
    nav: navigationEn,
  },
  de: {
    common: commonDe,
    nav: navigationDe,
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: resources,
  fallbackLng: 'en',
});
